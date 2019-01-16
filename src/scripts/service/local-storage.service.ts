import {Injectable} from "@angular/core";
import {CommonService} from "./common.service";

@Injectable()
export class LocalStorage {
  constructor(private common: CommonService) {
  }

  set(key: string, value: string): void {
    if (this.common.isUndefined(value)) {
      value = null;
    } else {
      value = this.common.jsonToString(value);
    }
    window.localStorage.setItem(key, value);
  }

  get(key:string):string{
    let item = window.localStorage.getItem(key);
    try {
      return JSON.parse(item);
    } catch (e) {
      return item;
    }
  }

  remove(key:string): void{
    window.localStorage.removeItem(key);
  }
}
