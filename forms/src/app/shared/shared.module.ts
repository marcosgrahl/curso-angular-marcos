import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { FormDebugComponent } from './form-debug/form-debug.component';
import { CampoControlErroComponent } from './campo-control-erro/campo-control-erro.component';
import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { FormsModule } from '@angular/forms';
import { CampoInputComponent } from './campo-input/campo-input.component';
import { BaseFormComponent } from './base-form/base-form.component';

@NgModule({
  declarations: [
    FormDebugComponent,
    CampoControlErroComponent,
    ErrorMsgComponent,
    CampoInputComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [ // incluído no exports, para que se possa usar em outro module
    FormDebugComponent,
    CampoControlErroComponent,
    ErrorMsgComponent,           
    CampoInputComponent,
  ],
  providers: [
    
  ]
})
export class SharedModule { }