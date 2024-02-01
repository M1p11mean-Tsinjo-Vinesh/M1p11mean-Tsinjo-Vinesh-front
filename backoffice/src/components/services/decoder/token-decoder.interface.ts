export interface TokenDecoder {
  decode (token: string) : TokenData;
}

export interface TokenData {
  // TODO add your field here.
}