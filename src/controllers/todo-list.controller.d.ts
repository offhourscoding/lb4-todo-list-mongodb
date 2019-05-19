import { Count, Filter, Where } from '@loopback/repository';
import { TodoList } from '../models';
import { TodoListRepository } from '../repositories';
export declare class TodoListController {
    todoListRepository: TodoListRepository;
    constructor(todoListRepository: TodoListRepository);
    create(todoList: TodoList): Promise<TodoList>;
    count(where?: Where): Promise<Count>;
    find(filter?: Filter): Promise<TodoList[]>;
    updateAll(todoList: TodoList, where?: Where): Promise<Count>;
    findById(id: string): Promise<TodoList>;
    updateById(id: string, todoList: TodoList): Promise<void>;
    replaceById(id: string, todoList: TodoList): Promise<void>;
    deleteById(id: string): Promise<void>;
}
