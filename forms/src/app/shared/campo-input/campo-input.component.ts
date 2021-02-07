import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const CAMPO_INPUT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CampoInputComponent),
  multi: true
};

@Component({
  selector: 'app-campo-input',
  templateUrl: './campo-input.component.html',
  styleUrls: ['./campo-input.component.css'],
  providers: [CAMPO_INPUT_VALUE_ACCESSOR]
})
export class CampoInputComponent implements ControlValueAccessor {

  @Input() classeCss;
  @Input() id: string;
  @Input() label: string;
  @Input() type = 'text';
  @Input() control;
  @Input() isReadOnly = false;
  @Input() place: '';

  private innerValue: any;

  get value() {
    return this.innerValue;
  }

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCb(v);
    }
  }

  constructor() { }

  onChangeCb: (_: any) => void = () => {};
  onTouchedCb: (_: any) => void = () => {};

  writeValue(v: any): void {
    console.log('writeValue');
    //if (v !== this.innerValue) {
    //  this.innerValue = v;
    //  this.onChangeCb(v);
    //}
    // ou 
    this.value = v; // que chama o set value
  }

  registerOnChange(fn: any): void {
    console.log('registerOnChange');
    this.onChangeCb = fn;
    console.log('fn onChange',fn);
  }

  registerOnTouched(fn: any): void {
    console.log('registerOnTouched');
    this.onTouchedCb = fn;
    console.log('fn onTouched',fn);
  }

  setDisabledState(isDisabled: boolean): void {
    console.log('setDisabledState');    
    this.isReadOnly = isDisabled;
  }

}
