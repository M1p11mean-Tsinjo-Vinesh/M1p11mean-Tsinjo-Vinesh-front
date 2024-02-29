import {ThemePalette} from "@angular/material/core";
import {ValidatorFn} from "@angular/forms";
import {PipeTransform} from "@angular/core";
import {ICRUDService, IReadService} from "./services/crud/interfaces";

/**
 * Interface representing a list of inputs for a form.
 * Each key is a string representing the input name, and the value is an InputProps object.
 */
export interface InputList {
  [key: string]: InputProps;
}




export interface CRUDModalData {
  title: string;
  inputs: InputList;
  value?: object;
  method?: Function;
  next: (res: any) => any;
  inputClass?: string;
  init?: object
}

/** props for InfoDescription */
export interface InfoDescriptionProps {
  title: string,
  value: string,
  confidential?: boolean
}

export type GetterFn = (item: any) => any;

/** returns a function that gets the value of the key */
export const extract: (key: string, ...args: any[]) => GetterFn = (key: string, ...args: any[]) => ((item: any) => ([item[key], ...args].join(" ")));


/** returns a function that gets the value of the key after transform */
export const extractAndPipe:  (key: string, pipe: PipeTransform, ...args: any[]) => GetterFn = (key: string, pipe: PipeTransform, ...args: any[]) => ((item: any) => pipe.transform(item[key], ...args));

/** each key is a title and the value is ordering key */
export interface SortParam {
  [title: string]: string
}

export function isForm (value: any) {
  let val;
  return Object.keys(value).length > 0 && ((val = value[Object.keys(value)[0]]) && typeof val === "object");
}

/** action for each row int the list component  */
export interface RowAction {
  color: ThemePalette,
  icon: string,
  onclick: (row: any, index: number) => any,
  visible?: (row: any) => boolean,
  type?: "edit" | "delete" | string
}

/** the result after sorting */
export interface SortResult {
  field: string,
  method: -1 | 1
}

/** props for list component */
export interface ListProps {
  data: any[];
  titles: string[];
  getters: ((item: any) => string)[];
  onClick?: (item: any) => void;
}


/** props for input component */
export interface InputProps {
  label: string;
  type?: string;
  default?: any;
  validators?: ValidatorFn | ValidatorFn[];
  onChange?: (value: any, obj: any) => any,
  /** only for images count */
  max?: number,
  disabled?: boolean
}

/** props for auto-complete component*/
export interface SelectProps extends InputProps{
  /**
   * if options is not an array then it must be the url for a get all API call,
   * if it's an array of object then the auto-completion will be on the client side
   */
  options: any[] | IReadService;
  /**
   * get value of the object for the selection
   */
  getValue: (item: any) => any;
  /**
   * get the text to represent the object
   */
  getText: (item: any) => string;
  /**
   * this will be used for auto-completion,
   * if it is used on the client side, then each object should have this key
   * if it is on used on API call then it is sent as a query parameter
   */
  searchKey: string;
  /**
   * if set to false then the auto-completion will be on the client side
   */
  autoComplete?: boolean;
}

/** props for app-multi-value-select */
export interface MultiSelectProps extends SelectProps {
  searchLabel: string,
  objectKey: string
}

/** props for each action of the form component */
export interface FormActionProps {
  label: string;
  onClick?: (data: any) => void;
  color: string;
  validDataOnly?: boolean;
}


/** props for the form component */
export interface FormProps {
  actions: FormActionProps[];
  inputClass?: string;
  actionClass?: string;
}


export const verify = (obj: any) => {
  return obj !== undefined && obj !== null;
}

