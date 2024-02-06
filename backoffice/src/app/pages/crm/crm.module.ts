import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrmRoutingModule } from './crm-routing.module';
import { UserComponent } from './user.component';
import {CommonComponentsModule} from "@common-components/common-components.module";
import { EditProfileComponent } from './edit-profile/edit-profile.component';


@NgModule({
  declarations: [
    UserComponent,
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    CrmRoutingModule,
    // custom
    CommonComponentsModule,
  ]
})
export class CrmModule { }
