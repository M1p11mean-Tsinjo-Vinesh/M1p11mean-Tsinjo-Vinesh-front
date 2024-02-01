import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {SelectProps} from "../../interfaces";
import {InputCommon} from "../input-common.class";
import {ObserverList} from "@common-components/services/util";

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: forwardRef(() => AutoCompleteComponent)
    }
  ]
})
export class AutoCompleteComponent extends InputCommon implements ControlValueAccessor, OnInit {

  private _props!: SelectProps;
  options!: any[];
  optionsCopy !: any[];
  control = new FormControl('');
  lastValue!: string;

  @Output() selectionChange: EventEmitter<any> = new EventEmitter<any> ();

  val: any = "";
  disabled: boolean = false;
  private _touched: boolean = false;

  onChange: any = () => {}
  onTouched: any = () => {}

  ngOnInit() {
    this.control.markAsTouched();
  }

  @Input() set props (val: SelectProps) {
    this._props = val;
    this.control.addValidators(this.props.validators ?? []);
    this.setOptions();
  }

  set touched (val: boolean) {
    this.control.markAsTouched();
    this._touched = val;
  }

  get touched () {
    return this._touched;
  }

  get props () {
    return this._props;
  }


  constructor() {
    super();
  }

  markAsTouched () {
    if (!this.touched) {
      this.onTouched();
      this.touched  = true;
      this.control.markAsTouched();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = (newValue: any, object: any) => {
      this.selectionChange.emit({newValue, object});
      fn(newValue);
    };
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = true
  }

  writeValue(obj: any): void {
    this.val = obj;
    const list = (this.optionsCopy || (Array.isArray(this.options) && this.options) || []);
    let selected = list.find((option) => {
      const isObj = obj && typeof obj === "object";
      const newValue = isObj ? this.props.getValue(obj) : obj;
      if (isObj) {
        return this.props.getValue(option) == newValue;
      }
      return this.props.getValue(option) == obj
    });
    const value = (selected && this.props.getValue(selected)) || "";
    this.control.setValue(value);
    if (typeof obj === "object" && typeof value !== "object") this.onChange(value, this.val);
    this.setSelected(selected);
  }

  setOptions () {
    let filterValue = this.control.value?.trim().toLowerCase() || '';
    if (this.lastValue && this.lastValue === filterValue) {
      return;
    }
    this.lastValue =  filterValue;
    if (Array.isArray(this.props.options)) {
      this.options = this._filterArray(this.props.options, filterValue);
    }
    else if (this.options && this.props.autoComplete === false) {
      this.options = this._filterArray(this.optionsCopy, filterValue);
    }
    else {
      let params: any = {};
      params[this.props.searchKey] = filterValue;
      this.props.options.findAllWithParams({params}).subscribe(ObserverList((res: any[]) => {
        this.optionsCopy = (this.options = res)
        this.writeValue(this.val);
      }));
    }
  }

  private _filterArray (array: any[], filterValue: string) {
    return array.filter(option => option[this.props.searchKey].toLowerCase().includes(filterValue));
  }

  onSelect(val: any) {
    let value = val.option.value;
    let selected = this.options.find((option) => this.props.getValue(option) === value) ?? {};
    this.onChange(value, selected);
    this.setSelected(selected);
  }

  setSelected (selected: any) {
    if (selected === undefined) {
      //this.control.setValue("");
      return;
    }
    this.control.setValue(this.props.getText(selected));
  }

  doSearch(event: KeyboardEvent) {
    if (event.key === ".") {
      this.control.setValue(this.control.value?.substring(0, this.control.value?.length -1) || "");
      this.setOptions();
    }
  }
}
