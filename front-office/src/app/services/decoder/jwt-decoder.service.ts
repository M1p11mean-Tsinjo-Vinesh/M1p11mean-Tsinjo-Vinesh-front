import {Injectable} from '@angular/core';
import {TokenData, TokenDecoder} from "./token-decoder.interface";


@Injectable({
  providedIn: 'root'
})
// TODO replace object by the token type
export class JwtDecoderService implements TokenDecoder {

  constructor() { }

  decode(token: string): TokenData {
    return JSON.parse(atob(token.split('.')[1])) as unknown as TokenData;
  }
}
