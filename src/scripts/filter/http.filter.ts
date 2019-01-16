import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { LocalStorage } from '../service/local-storage.service';
import { LocalStorageKeys } from '../constant/constant';
import { ENV } from '@app/env';

@Injectable()
export class HttpFilter implements HttpInterceptor {
  constructor(private local: LocalStorage) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let cloneReq = null;
    if(this.local.get(LocalStorageKeys.TOKEN)){
      cloneReq = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.local.get(LocalStorageKeys.TOKEN),
          appVersion: ENV.version.currentVersion + '.' + ENV.version.currentSubVersion,
          'Content-Type': 'application/json;charset=UTF-8',
          'X-Requested-With': 'XMLHttpRequest',
          'X-hmapfront-client': 'APP',
          'X-hmapfront-version': ENV.version.currentVersion + '.' + ENV.version.currentSubVersion
        }
      });
    }else{
      cloneReq = req.clone({
        setHeaders: {
          'Content-Type': "application/x-www-form-urlencoded"
        }
      });
    }
    //简写： const authReq = req.clone({setHeaders: {Authorization: authHeader}});
    return next.handle(cloneReq).map((event) => {
      console.log(event)
      if (event instanceof HttpResponse) {
        switch (event.status) {
          case 200:
            if (event.body['success'] && !event.body['success']) {
              if(event.body['success']){
                if(event.body['rows'] && event.body['rows'].length>0){
                  let newEvent = event.clone({body: event.body['rows']});
                  return newEvent;
                }else{
                  event.body['message']='没有查询到更多数据！';
                  return Observable.throw(event);
                }
              }else{
                return Observable.throw(event);
              }
            } else {
              return event;
            }
        }
      }
    }).catch((res: HttpResponse<any>) => {
      switch (res.status) {
        case 400:
          if(res['error']['error'] == 'invalid_grant'){
            res['error']['message']='用户名不存在或密码错误！';
          }else{
            res['error']['message']=`【${res.status}】【${res.statusText}】`;
          }
          break;
        case 401:
          this.local.remove(LocalStorageKeys.TOKEN);
          res['error']['message']='请重新登录！';
          break;
        default:
          res['error']['message']=`【${res.status}】【${res.statusText}】`;
      }
      // 以错误的形式结束本次请求
      return Observable.throw(res['error']);
    });





   /* mergeMap((event: any) => {
      console.log(event)
      if (event instanceof HttpResponse && event.body.code !== 0) {
        return Observable.create(observer => observer.error(event));
      }
      return Observable.create(observer => observer.next(event));
    })
      .catch((res: HttpResponse<any>) => {
        switch (res.status) {
          case 401:
            // 权限处理
            location.href = ''; // 重新登录
            break;
          case 200:
            // 业务层级错误处理
            console.log('业务错误', `错误代码为：${res.body.code}`);
            break;
          case 404:
            console.log('404', `API不存在`);
            break;
        }
        // 以错误的形式结束本次请求
        return Observable.throw(res);
      });*/
  }
}
