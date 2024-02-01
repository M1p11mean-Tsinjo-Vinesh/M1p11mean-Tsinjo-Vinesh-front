import {Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {isForm} from "../../interfaces";

@Component({
  selector: 'app-recursive-input',
  templateUrl: './recursive-input.component.html',
  styleUrls: ['./recursive-input.component.scss']
})
export class RecursiveInputComponent {

  @Input() key!: string;
  @Input() props!: any;
  @Input() form !: FormGroup;

  getNext (){
    let key =  Object.keys(this.props)[0];
    return {key: key, props: (this.props as any)[key]}
  }

  get(key: string) {
    return this.form.get(key) as FormGroup;
  }

  protected readonly isForm = isForm;

  onChange(e: any) {
    if (this.props.onChange !== undefined) {
      this.props.onChange(e.newValue, e.object);
    }
  }

}
