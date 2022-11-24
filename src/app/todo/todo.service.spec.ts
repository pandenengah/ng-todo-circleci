import { TestBed } from '@angular/core/testing';
import { Todo } from './@objects/todo';

import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;
  const todo1: Todo = {
    deadline: '2023-01-01T07:45:51.377Z',
    description: 'Do something',
    done: false,
    snapshotImage: 'https://media.istockphoto.com/id/1358132613/photo/refreshing-hot-cup-of-coffee-at-a-cafe.jpg?b=1&s=170667a&w=0&k=20&c=yWCgrKacdKBjpwTStBv8IBnMjuIECKUTfuCtkAfyMlc=',
  }
  const todo2: Todo = {
    deadline: '2023-01-02T07:45:51.377Z',
    description: 'Do something 2',
    done: false,
    snapshotImage: 'https://media.istockphoto.com/id/1358132613/photo/refreshing-hot-cup-of-coffee-at-a-cafe.jpg?b=1&s=170667a&w=0&k=20&c=yWCgrKacdKBjpwTStBv8IBnMjuIECKUTfuCtkAfyMlc=',
  }
  const getLastInsertedTodo = (todo: Todo) => {
    const result = service.todos.filter((item) => {
      if (item.deadline === todo.deadline && item.description === todo.description) {
        return true
      }
      return false
    })

    if (result.length > 0) {
      return result[0]
    }
    return {}
  }
  const getTodoById = (id: number | string) => {
    const result = service.todos.filter((item) => {
      if (item.id === id) {
        return true
      }
      return false
    })
    if (result.length > 0) {
      return result[0]
    }
    return {}
  }

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should have empty todos', () => {
    expect(service.todos.length).toBe(0)
  })
  
  it('should refresh todos', async () => {
    service.todos = []
    await service.refreshTodos()
    expect(service.todos.length).toBeGreaterThan(0)
  })
  
  it('should post todos', async () => {
    service.todos = []
    await service.postTodo(todo1)
    await service.refreshTodos()
    const result = getLastInsertedTodo(todo1)
    expect(result.description).toBe(todo1.description)
  })
  
  it('should put todos', async () => {
    service.todos = []
    await service.postTodo(todo1)
    await service.refreshTodos()
    let lastTodo = getLastInsertedTodo(todo1)
    const todo = {
      ...lastTodo,
      done: true
    }
    await service.putTodo(todo)
    await service.refreshTodos()
    lastTodo = getLastInsertedTodo(todo)
    expect(lastTodo).toEqual(todo)
  })

  it('should delete todos', async () => {
    service.todos = []
    await service.postTodo(todo1)
    await service.refreshTodos()
    const lastTodo = getLastInsertedTodo(todo1)
    await service.deleteTodo(lastTodo.id || 0)
    await service.refreshTodos()
    const check = getTodoById(lastTodo.id || 0)
    expect(check).toEqual({})
  })
  
  it('should sort todos in asc', async () => {
    service.todos = []
    await service.postTodo(todo2)
    await service.postTodo(todo1)
    await service.refreshTodos()
    service.sortState = 'ASC'
    service.sortTodos()
    expect(new Date(service.todos[0].deadline || '').getTime()).toBeLessThan(new Date(service.todos[1].deadline || '').getTime())
  })
  
  it('should sort todos in desc', async () => {
    service.todos = []
    await service.postTodo(todo1)
    await service.postTodo(todo2)
    await service.refreshTodos()
    service.sortState = 'DESC'
    service.sortTodos()
    expect(new Date(service.todos[0].deadline || '').getTime()).toBeGreaterThan(new Date(service.todos[1].deadline || '').getTime())
  })
});
