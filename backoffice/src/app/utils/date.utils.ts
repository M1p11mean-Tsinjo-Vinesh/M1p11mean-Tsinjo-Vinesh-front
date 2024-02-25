import {capitalize} from "./string.utils";

export function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

export function getMonthName(month: number) {
  return capitalize(new Date(0, month).toLocaleString('default', { month: 'long' }));
}
