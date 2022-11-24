import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Todo } from './@objects/todo';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({
          opacity: 0,
        }),
        animate('300ms ease-in-out', style({
          opacity: 1,
        }))
      ])
    ]),
    trigger('fadeOut', [
      transition(':leave', [
        style({
          opacity: 1,
        }),
        animate('300ms ease-in-out', style({
          opacity: 0,
        }))
      ])
    ]),
  ]
})
export class TodoComponent implements OnInit {
  isDeleting = false

  constructor(
    public todoSrv: TodoService,
    public authSrv: AuthService,
  ) { }

  ngOnInit(): void {
    this.todoSrv.refreshTodos()
  }

  doSort() {
    this.todoSrv.sortState = (this.todoSrv.sortState === 'ASC') ? 'DESC' : 'ASC'
    this.todoSrv.sortTodos()
  }

  async delete(index: number, todo: Todo) {
    this.todoSrv.todos[index].isDeleting = true
    await this.todoSrv.deleteTodo(todo.id || 0)
  }

  async update(todo: Todo) {
    await this.todoSrv.putTodo({
      ...todo,
      done: !todo.done,
    })
  }
}
