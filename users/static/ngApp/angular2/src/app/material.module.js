"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var animations_1 = require("@angular/platform-browser/animations");
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
var MyOwnCustomMaterialModule = /** @class */ (function () {
    function MyOwnCustomMaterialModule() {
    }
    MyOwnCustomMaterialModule = __decorate([
        core_1.NgModule({
            // imports: [BrowserAnimationsModule, MdButtonModule, MdCheckboxModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule],
            // exports: [BrowserAnimationsModule, MdButtonModule, MdCheckboxModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule],
            exports: [
                animations_1.BrowserAnimationsModule,
                // CdkTableModule,
                // MdAutocompleteModule,
                material_1.MdButtonModule,
                material_1.MdMenuModule,
                // MdButtonToggleModule,
                material_1.MdCardModule,
                // MdCheckboxModule,
                // MdChipsModule,
                // MdCoreModule,
                // MdDatepickerModule,
                // MdDialogModule,
                // MdExpansionModule,
                // MdGridListModule,
                material_1.MdIconModule,
                material_1.MdInputModule,
                // MdListModule,
                material_1.MdListModule,
                // MdNativeDateModule,
                // MdPaginatorModule,
                // MdProgressBarModule,
                material_1.MdProgressSpinnerModule,
                // MdRadioModule,
                // MdRippleModule,
                // MdSelectModule,
                // MdSidenavModule,
                // MdSliderModule,
                // MdSlideToggleModule,
                material_1.MdSnackBarModule,
                // MdSortModule,
                // MdTableModule,
                material_1.MdTabsModule,
                material_1.MdToolbarModule,
            ]
        })
    ], MyOwnCustomMaterialModule);
    return MyOwnCustomMaterialModule;
}());
exports.MyOwnCustomMaterialModule = MyOwnCustomMaterialModule;
