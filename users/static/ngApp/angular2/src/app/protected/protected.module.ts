import { NgModule } from '@angular/core';
import {MyOwnCustomMaterialModule} from '../material.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    ],
  imports: [    
    MyOwnCustomMaterialModule,
    
  ],
  providers: [],
})
export class AuthModule { 

}
export const PROTECTEDMETHODS = [
    DashboardComponent
];