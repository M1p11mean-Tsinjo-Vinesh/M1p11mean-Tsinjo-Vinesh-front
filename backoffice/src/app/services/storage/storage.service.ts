import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService implements Storage{

  storageBase = localStorage;

  constructor() { }

  clear(): void {
    this.storageBase.clear();
  }

  get length () {
    return this.storageBase.length;
  }

  getItem(key: string): string | null {
    return this.storageBase.getItem(key);
  }

  key(index: number): string | null {
    return this.storageBase.key(index);
  }

  removeItem(key: string): void {
    this.storageBase.removeItem(key);
  }

  setItem(key: string, value: string): void {
    this.storageBase.setItem(key, value);
  }

}
