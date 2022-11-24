import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';
import { HeaderComponent } from './@components/header/header.component';
import { FooterComponent } from './@components/footer/footer.component';
import { AddComponent } from './add/add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';


@NgModule({
  declarations: [
    TodoComponent,
    HeaderComponent,
    FooterComponent,
    AddComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
  ]
})
export class TodoModule { }
