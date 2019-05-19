import { DefaultCrudRepository } from '@loopback/repository';
import { Todo } from '../models';
import { DbDataSource } from '../datasources';
export declare class TodoRepository extends DefaultCrudRepository<Todo, typeof Todo.prototype.id> {
    constructor(dataSource: DbDataSource);
}
