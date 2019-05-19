import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {TodoList} from '../models';
import {TodoListRepository} from '../repositories';

export class TodoListController {
  constructor(
    @repository(TodoListRepository)
    public todoListRepository : TodoListRepository,
  ) {}

  @post('/todo-lists', {
    responses: {
      '200': {
        description: 'TodoList model instance',
        content: {'application/json': {schema: {'x-ts-type': TodoList}}},
      },
    },
  })
  async create(@requestBody() todoList: TodoList): Promise<TodoList> {
    return await this.todoListRepository.create(todoList);
  }

  @get('/todo-lists/count', {
    responses: {
      '200': {
        description: 'TodoList model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(TodoList)) where?: Where,
  ): Promise<Count> {
    return await this.todoListRepository.count(where);
  }

  @get('/todo-lists', {
    responses: {
      '200': {
        description: 'Array of TodoList model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': TodoList}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(TodoList)) filter?: Filter,
  ): Promise<TodoList[]> {
    return await this.todoListRepository.find(filter);
  }

  @patch('/todo-lists', {
    responses: {
      '200': {
        description: 'TodoList PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() todoList: TodoList,
    @param.query.object('where', getWhereSchemaFor(TodoList)) where?: Where,
  ): Promise<Count> {
    return await this.todoListRepository.updateAll(todoList, where);
  }

  @get('/todo-lists/{id}', {
    responses: {
      '200': {
        description: 'TodoList model instance',
        content: {'application/json': {schema: {'x-ts-type': TodoList}}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<TodoList> {
    return await this.todoListRepository.findById(id);
  }

  @patch('/todo-lists/{id}', {
    responses: {
      '204': {
        description: 'TodoList PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() todoList: TodoList,
  ): Promise<void> {
    await this.todoListRepository.updateById(id, todoList);
  }

  @put('/todo-lists/{id}', {
    responses: {
      '204': {
        description: 'TodoList PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() todoList: TodoList,
  ): Promise<void> {
    await this.todoListRepository.replaceById(id, todoList);
  }

  @del('/todo-lists/{id}', {
    responses: {
      '204': {
        description: 'TodoList DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.todoListRepository.deleteById(id);
  }
}
