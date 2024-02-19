export type UserDTO = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  favoriteEmployees?: string[];
  favoriteServices?: string[];
}

export type UserSignUpDTO = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  confirmPassword: string;
}

export type UserUpdateDTO = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  favoriteEmployees: string[];
  favoriteServices: string[];
  currentPassword?: string;
  password?: string;
  confirmPassword?: string;
}