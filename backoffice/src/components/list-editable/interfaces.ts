import {InputProps} from "../interfaces";

export interface EditableData {
  inputs: {[key: string]: InputProps};
  title: string;
  default: any
}
