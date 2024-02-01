import {FormGroup} from "@angular/forms";
import Swal, {SweetAlertOptions} from 'sweetalert2';
import {HttpError} from "../../config/interfaces";


/**
 * this function calls ObserverObject and pass the data from the api call
 * @param next
 * @constructor
 */
export const ObserverElt = (next: (res: any) => any) => {
  return ObserverObject((res) => {
    next(res.data);
  });
}


/**
 * this function calls ObserverElt and get the list from the data
 * @param next
 * @constructor
 */
export const ObserverList = (next: (res: any[]) => any) : any => {
  return ObserverElt((res) => {
    next(res.elements);
  });
}

/**
 * this function return the appropriate observer after subscribing the http API call
 * and handles all the error from the call with sweetAlert
 * @param next the callback on success call, and the parameter is the Http Response.
 * @constructor
 */
export const ObserverObject = (next: (res: any) => any) => {
  return {
    next: next,
    error: (err: HttpError) => {
      let errorData: SweetAlertOptions = {icon: "error", title: "Erreur",};
      if (err.status === 0) {
        errorData.text = "Êtes-vous connecté a internet ?";
      }
      else if (err.status === 403 || err.status === 401) {
        errorData.text = "Veuillez vous connecter a un compte qui peut ouvrir cette Page !";
      }
      else if (500 - err.status <= 0) {
        errorData.text = "Une erreur est survenue"
      }
      else {
        errorData.text = err.error.error.message;
      }
      Swal.fire(errorData).then();
    }
  }
};


/**
 * error dictionary to match the errors from the formControl
 */
const errors: any = {
  required: () => "Ce champ est requis",
  requiredTrue: () => "Ce champ est requis",
  min: (error: any) => `Le minimum est ${error.min}`,
  max: (error: any) => `Le maximum est ${error.max}`,
  email: () => "Veuillez entrer un mail valide",
  minlength: (error: any) => `Longueur minimum: ${error.requiredLength}`,
  maxlength: (error: any) => `Longueur maximum: ${error.requiredLength}`,
  pattern: () => "Entrer une valeur valide"
};


/**
 * this function evaluates the error from a formControl and gives the appropriate error message
 * @param form
 * @param key
 * @param details
 */
export const evaluateError = (form: FormGroup, key: string, details: { [key: string]: any } = {}) => {
  let err = form.get(key)?.errors;
  if (err) {
    let errorKey: string = (Object.keys(err)[0]);
    let errorObject = details[errorKey];
    if (!errorObject) {
      errorObject = errors[errorKey];
    }
    return errorObject(err[errorKey]);
  }
  return "";
}

