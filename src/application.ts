import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import * as path from 'path';
import {MySequence} from './sequence';
import {DbDataSource} from './datasources';

export class TodoListApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set datasource based off environment
    const db_host = process.env.MONGO_HOST || 'localhost';
    const db_port = process.env.MONGO_PORT || 27017;
    const db_user = process.env.MONGO_USERNAME || '';
    const db_pass = process.env.MONGO_PASSWORD || '';
    const database = process.env.MONGO_DB || 'todo-list';

    this.bind('datasources.config.db').to({
      name: 'db',
      connector: 'mongodb',
      url: '',
      host: db_host,
      port: db_port,
      user: db_user,
      password: db_pass,
      database: database,
      useNewUrlParser: true,
    });
    this.bind('datasources.db').toClass(DbDataSource);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.bind(RestExplorerBindings.CONFIG).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
