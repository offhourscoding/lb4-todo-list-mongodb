import {TodoListRepository} from './../repositories/todo-list.repository';
import {
  repository,
  Filter,
  CountSchema,
  Where,
  Count,
} from '@loopback/repository';
import {
  post,
  requestBody,
  param,
  get,
  patch,
  getWhereSchemaFor,
  del,
} from '@loopback/rest';
import {Todo} from '../models';

// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';

export class TodoListTodoController {
  constructor(
    @repository(TodoListRepository)
    protected todoListRepo: TodoListRepository,
  ) {}

  @post('/todo-lists/{id}/todos', {
    responses: {
      '200': {
        description: 'TodoList.Todo model instance',
        content: {
          'application/json': {schema: {'x-ts-type': Todo}},
        },
      },
    },
  })
  async create(
    @param.path.string('id') id: string,
    @requestBody() todo: Todo,
  ): Promise<Todo> {
    return await this.todoListRepo.todos(id).create(todo);
  }

  @get('/todo-lists/{id}/todos', {
    responses: {
      '200': {
        description: "Array of Todo's belonging to TodoList",
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Todo}},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter,
  ): Promise<Todo[]> {
    return await this.todoListRepo.findTodos(id);
    return await this.todoListRepo.todos(id).find(filter);
  }

  @patch('/todo-lists/{id}/todos', {
    responses: {
      '200': {
        description: 'TodoList.Todo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody() todo: Partial<Todo>,
    @param.query.object('where', getWhereSchemaFor(Todo))
    where?: Where,
  ): Promise<Count> {
    return await this.todoListRepo.todos(id).patch(todo, where);
  }

  @del('/todo-lists/{id}/todos', {
    responses: {
      '200': {
        description: 'TodoList.Todo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Todo))
    where?: Where,
  ): Promise<Count> {
    return await this.todoListRepo.todos(id).delete(where);
  }
}
