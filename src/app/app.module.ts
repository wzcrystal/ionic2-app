import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';

import { LocalStorage } from '../scripts/providers/local-storage/local-storage';
import { HttpFilter } from '../scripts/filter/http.filter';
import { UtilService } from '../scripts/service/util.service';

import { MyApp } from './app.component';
import { WorkflowModule } from '../pages/workflow/workflow.module';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      iconMode: 'ios',//安卓icon强制使用ios的icon以及样式
      mode: 'ios',//样式强制使用ios样式
    }),
    WorkflowModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: HTTP_INTERCEPTORS, useClass: HttpFilter, multi: true},
    LocalStorage,
    UtilService
  ]
})
export class AppModule {}
