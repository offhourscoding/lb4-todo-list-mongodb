import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class Todo extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  title?: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'boolean',
  })
  isComplete?: boolean;

  @property()
  todoListId: string;

  constructor(data?: Partial<Todo>) {
    super(data);
  }
}
