import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import * as moment from 'moment';
import { dateValidator } from 'src/app/@helpers/date-validator';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  todoForm!: FormGroup
  isSubmitting = false


  constructor(
    private todoSrv: TodoService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (!this.todoSrv.selectedTodo.id) {
      this.router.navigate(['/'])
    }

    this.todoForm = new FormGroup({
      deadline: new FormControl(moment(this.todoSrv.selectedTodo.deadline).format('YYYY-MM-DDTHH:mm'), [
        Validators.required,
        dateValidator(),
      ]),
      description: new FormControl(this.todoSrv.selectedTodo.description, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      done: new FormControl(this.todoSrv.selectedTodo.done, [
        Validators.required,
      ]),
      snapshotImage: new FormControl('', [
        Validators.required,
        RxwebValidators.fileSize({maxSize: 1000000}) //in bytes
      ])
    })
  }

  async submit() {
    if (this.todoForm.invalid) {
      return
    }

    this.isSubmitting = true
    await this.todoSrv.putTodo({
      ...this.todoForm.value,
      deadline: new Date(this.todoForm.value.deadline).toISOString(),
      id: this.todoSrv.selectedTodo.id,
      done: (this.todoForm.value.done === 'true')
    })

    this.router.navigate(['/'])

    this.isSubmitting = false
  }

}
