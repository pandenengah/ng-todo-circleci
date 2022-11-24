import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../@helpers/backend/backend.service';
import { Todo } from './@objects/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: Array<Todo> = []
  sortState: 'ASC' | 'DESC' = 'ASC'
  selectedTodo: Todo = {}

  constructor(
    private router: Router,
    private be: BackendService,
  ) { }


  sortTodos() {
    this.todos = this.todos.sort((a, b) => {
      if ((new Date(a.deadline || '')) > (new Date(b.deadline || ''))) {
        return (this.sortState === 'ASC') ? 1 : -1
      }
      return (this.sortState === 'DESC') ? 1 : -1
    })
  }

  async refreshTodos() {
    const res = await this.be.getTodos()
    this.todos = res
    this.sortTodos()
  }

  async postTodo(todo: Todo) {
    await this.be.storeTodo(todo)
    this.router.navigate(['/'])
  }

  async putTodo(todo: Todo) {
    const res = await this.be.putTodo(todo)
    this.refreshTodos()
    return res
  }

  async deleteTodo(id: number | string) {
    const res = await this.be.removeTodo(id)
    this.refreshTodos()
    return res
  }
}
