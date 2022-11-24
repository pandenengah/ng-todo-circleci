import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { dateValidator } from 'src/app/@helpers/date-validator';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  todoForm!: FormGroup
  isSubmitting = false
  image: File | null | undefined

  constructor(
    private todoSrv: TodoService,
  ) { }

  ngOnInit(): void {
    this.todoForm = new FormGroup({
      deadline: new FormControl('', [
        Validators.required,
        dateValidator(),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      snapshotImage: new FormControl('', [
        Validators.required,
        RxwebValidators.fileSize({maxSize: 1000000}) //in bytes
      ])
    })
  }

  setImage(e: Event) {
    const target = e.target as HTMLInputElement
    this.image = target.files?.item(0)
    console.log(target.files);
    
  }

  async submit() {
    if (this.todoForm.invalid) {
      return
    }

    this.isSubmitting = true
    await this.todoSrv.postTodo({
      ...this.todoForm.value,
      deadline: new Date(this.todoForm.value.deadline).toISOString()
    })
    this.isSubmitting = false
  }

}
