import { Count, Filter, Where } from '@loopback/repository';
import { Todo } from '../models';
import { TodoRepository } from '../repositories';
export declare class TodoController {
    todoRepository: TodoRepository;
    constructor(todoRepository: TodoRepository);
    create(todo: Todo): Promise<Todo>;
    count(where?: Where): Promise<Count>;
    find(filter?: Filter): Promise<Todo[]>;
    updateAll(todo: Todo, where?: Where): Promise<Count>;
    findById(id: string): Promise<Todo>;
    updateById(id: string, todo: Todo): Promise<void>;
    replaceById(id: string, todo: Todo): Promise<void>;
    deleteById(id: string): Promise<void>;
}
