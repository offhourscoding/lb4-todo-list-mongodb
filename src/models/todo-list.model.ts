import {hasMany, Entity, model, property} from '@loopback/repository';
import {Todo} from './todo.model';

@model({
  settings: {
    strictObjectIDCoercion: true,
  },
})
export class TodoList extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @hasMany(() => Todo)
  todos?: Todo[];

  constructor(data?: Partial<TodoList>) {
    super(data);
  }
}
