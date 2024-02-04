import {UserDTO} from "../../dto/user.dto";

export interface TokenDecoder {
  decode (token: string) : TokenData;
}

export interface TokenData extends UserDTO{
  iat: number;
  exp: number;
}