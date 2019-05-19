import { Entity } from '@loopback/repository';
export declare class Todo extends Entity {
    id?: string;
    title?: string;
    description?: string;
    isComplete?: boolean;
    todoListId: string;
    constructor(data?: Partial<Todo>);
}
