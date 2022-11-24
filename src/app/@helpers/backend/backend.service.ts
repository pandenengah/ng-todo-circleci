import { Injectable } from '@angular/core';
import { Todo } from './todo.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUmVpbiBXaWxsaWJhbGQiLCJ1c2VybmFtZSI6InVzZXIiLCJpYXQiOjE5MjA0MTg2ODN9.739kBWs0d8vSjGhV8-mDmzirXwNC97EwzTk8lQWHsiU'
  private todos: Array<Todo> = [{
    id: 9999999999,
    deadline: '2019-09-19T07:45:51.377Z',
    description: 'Do something',
    done: false,
    snapshotImage: 'https://media.istockphoto.com/id/1358132613/photo/refreshing-hot-cup-of-coffee-at-a-cafe.jpg?b=1&s=170667a&w=0&k=20&c=yWCgrKacdKBjpwTStBv8IBnMjuIECKUTfuCtkAfyMlc='
  }]

  constructor(
  ) { }

  private sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getTodos() {
    await this.sleep(500)
    return this.todos
  }

  async storeTodo(todo: Todo) {
    await this.sleep(500)
    this.todos.push({
      ...todo,
      id: uuidv4(),
      snapshotImage: 'https://media.istockphoto.com/id/1277074078/photo/mug-of-coffee-on-table.jpg?b=1&s=170667a&w=0&k=20&c=_j9Pqob61Nx-e92EmYm8dVsd8XHW81ZbcQztNqcL350=',
      done: false
    })
  }

  async putTodo(todo: Todo) {
    await this.sleep(500)
    this.todos = this.todos.map((item: Todo) => {
      let image = 'https://media.istockphoto.com/id/1277074078/photo/mug-of-coffee-on-table.jpg?b=1&s=170667a&w=0&k=20&c=_j9Pqob61Nx-e92EmYm8dVsd8XHW81ZbcQztNqcL350='
      if (todo.snapshotImage?.includes('http')) {
        image = todo.snapshotImage
      }

      if (item.id === todo.id) {
        return {
          ...item,
          deadline: todo.deadline,
          description: todo.description,
          done: todo.done,
          snapshotImage: image,
        }
      }
      return item
    })    
  }

  async removeTodo(id: number | string) {
    await this.sleep(500)
    this.todos = this.todos.filter((item: Todo) => {
      if (item.id === id) {
        return false
      }
      return true
    })
  }


  async login(username: string, password: string) {
    await this.sleep(500)

    if (username !== 'rein') {
      return {
        message: 'Username is incorrect'
      }
    }

    if (password !== 'willibald123') {
      return {
        message: 'Password is incorrect'
      }
    }

    return {
      name: 'Rein Willibald',
      username,
      token: this.token
    }
  }
}
