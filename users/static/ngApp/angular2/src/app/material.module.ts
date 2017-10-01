
import { NgModule } from '@angular/core';
import { 
  MdButtonModule, 
  MdCheckboxModule, 
  MdCardModule, 
  MdMenuModule, 
  MdToolbarModule, 
  MdIconModule,
  MdInputModule,
  MdProgressSpinnerModule,
  MdTabsModule,
  MdSnackBarModule,
  MdListModule,
  MdSidenavModule,
  
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import {CdkTableModule} from '@angular/cdk';
// import {
//   MdAutocompleteModule,
//   MdButtonModule,
//   MdButtonToggleModule,
//   MdCardModule,
//   MdCheckboxModule,
//   MdChipsModule,
//   MdCoreModule,
//   MdDatepickerModule,
//   MdDialogModule,
//   MdExpansionModule,
//   MdIconModule,
//   MdInputModule,
//   MdListModule,
//   MdMenuModule,
//   MdNativeDateModule,
//   MdPaginatorModule,
//   MdProgressBarModule,
//   MdProgressSpinnerModule,
//   MdRadioModule,
//   MdRippleModule,
//   MdSelectModule,
//   MdSidenavModule,
//   MdSliderModule,
//   MdSlideToggleModule,
//   MdSnackBarModule,
//   MdSortModule,
//   MdTableModule,
//   MdTabsModule,
//   MdToolbarModule,
//   MdTooltipModule,
// } from '@angular/material';

@NgModule({
   exports: [
    BrowserAnimationsModule,
    MdButtonModule,
    MdMenuModule,
    MdCardModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdProgressSpinnerModule,
    MdSidenavModule,
    MdSnackBarModule,
    MdTabsModule,
    MdToolbarModule,
  ]
})
export class MyOwnCustomMaterialModule { }