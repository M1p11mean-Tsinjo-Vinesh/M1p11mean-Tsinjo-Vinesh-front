import {extract, InputProps, SelectProps} from "../components";

export const monthList = [
  "JANVIER",
  "FÉVRIER",
  "MARS",
  "AVRIL",
  "MAI",
  "JUIN",
  "JUILLET",
  "AOUT",
  "SEPTEMBRE",
  "OCTOBRE",
  "NOVEMBRE",
  "DÉCEMBRE"
]

export const months = monthList.map((value, index) => {
  return {value, index: index+1}
});


export const yearInputCommon: InputProps = {
  label: "Année",
  type: "number",
}

export const monthInputCommon = {
  label: "Mois",
  searchKey: "value",
  options: months,
  getValue: extract("index"),
  getText: extract("value"),
  default: new Date().getMonth()
} as SelectProps;
