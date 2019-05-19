import { TodoRepository } from './todo.repository';
import { DefaultCrudRepository, HasManyRepositoryFactory } from '@loopback/repository';
import { TodoList, Todo } from '../models';
import { DbDataSource } from '../datasources';
import { Getter } from '@loopback/core';
export declare class TodoListRepository extends DefaultCrudRepository<TodoList, typeof TodoList.prototype.id> {
    protected todoRepositoryGetter: Getter<TodoRepository>;
    protected todoRepo: TodoRepository;
    readonly todos: HasManyRepositoryFactory<Todo, typeof TodoList.prototype.id>;
    constructor(dataSource: DbDataSource, todoRepositoryGetter: Getter<TodoRepository>, todoRepo: TodoRepository);
    findTodos(id: string): Promise<Todo[]>;
}
