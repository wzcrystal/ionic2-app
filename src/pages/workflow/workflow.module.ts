import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { WorkflowService } from './workflow.service';

import { WorkflowPage } from './workflow';
import { FilterPage } from './filter/filter';

@NgModule({
  declarations: [
    WorkflowPage,
    FilterPage
  ],
  imports: [
    IonicModule
  ],
  entryComponents: [
    WorkflowPage,
    FilterPage
  ],
  providers: [WorkflowService]
})
export class WorkflowModule {}
