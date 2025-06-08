import {
  Component,
  Input,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  imports: [FormsModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CheckboxComponent,
    },
  ]
})
export class CheckboxComponent implements ControlValueAccessor {
  onChange: any = () => {};
  onTouched: any = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  @Input() checked: boolean = false;
  @Input() required: boolean = false;

  writeValue(checked: boolean): void {
    this.checked = checked;
  }

  clickCheckbox(): void {
    this.checked = !this.checked;
    this.onChange(this.checked);
  }

  get checkboxSymbolName(): 'select_check_box' | 'check_box_outline_blank' {
    return this.checked ? 'select_check_box' : 'check_box_outline_blank';
  }
}
