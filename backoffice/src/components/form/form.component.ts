import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormActionProps, InputProps, isForm} from "../interfaces";
import {startApiCall} from "@common-components/services/sweet-alert.util";
import {ObserverObject} from "@common-components/services/util";
import {ICRUDService} from "@common-components/services/crud/interfaces";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  /**
   * list of actions for the form
   */
  @Input() actions!: FormActionProps[];

  /** this should be the url to receive the API call if defined */
  @Input() method?: Function;

  /** output for a success submit of the form*/
  @Input() onsuccess!: (httpResponse: any) => any;

  /** method for the API call */
  @Input() service?: ICRUDService;

  /** css class for each inputs */
  @Input() inputClass : string = "col-md-6 mb-4";

  private _inputs!: any[];
  private _default!: any;
  form !: FormGroup;


  /**
   * the inputs of the form,
   * each key of the object should be an InputProps or a SelectProps.
   * let's suppose we want to have an object like this on the success
   *  {key: {key: value} }
   *  in that case the structure of the inputs object should be
   *  {key: {key: InputProps | SelectProps}}
   */
  @Input() set inputs (val: any) {
    this.form = this.buildForm(val);
    if (this.default) {
      this.form.patchValue(this.default);
    }
    this._inputs = val;
  }


  /** default value for the form */
  @Input() set default (val: any) {
    this._default = val;
    if (this.form) {
      if (val.reset) {
        this.form.reset();
        return;
      }
      this.form.patchValue(val);
    }
  }


  get default () {
    return this._default;
  }


  get inputs ()  {
    return this._inputs;
  }


  constructor(
    private builder: FormBuilder
  ) {}

  private buildForm (inputs: any) {
    let form = this.builder.group({});
    Object.keys(inputs).forEach(key => {
      let value = inputs[key];
      if (isForm(value)) {
        form.addControl(key, this.buildForm(value));
      }
      else {
        form.addControl(key, this.buildControl(value));
      }
    });
    return form;
  }

  private buildControl(input: InputProps) {
    return this.builder.control({value: input.default ?? '', disabled: input.disabled}, input.validators ?? []);
  }

  validate(onClick: ((data: any) => void) | undefined, validDataOnly: boolean | undefined) {
    this.form.markAllAsTouched();
    if (!validDataOnly) {
        onClick?.call(null, this.form.value);
    }
    else if (this.form.valid) {
      if (this.method) {
        startApiCall((close: any) => {
          const data = this.default || {};
          this.method?.call(this.service, {...data, ...this.form.value}).subscribe(ObserverObject(
          data => {
            close();
            this.onsuccess(data);
          }))
        });
        return;
      }
      onClick?.call(null, this.form.value);
    }
  }

  get value () {
    return this.form.value;
  }

  protected readonly Object = Object;
}
