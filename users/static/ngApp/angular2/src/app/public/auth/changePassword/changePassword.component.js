"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var password_validator_1 = require("./password.validator");
var ChangePasswordComponent = /** @class */ (function () {
    function ChangePasswordComponent(route, router, formBuilder, authenticationService, snackBar) {
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
        this.authenticationService = authenticationService;
        this.snackBar = snackBar;
        this.title = 'Change Password';
        this.openSnackBar = function (message) {
            this.snackBar.open(message, " ", {
                duration: 5000
            });
        };
    }
    ChangePasswordComponent.prototype.ngOnInit = function () {
        console.log("Welcome to change password");
        this.changePasswordForm = this.formBuilder.group({
            password1: ['', forms_1.Validators.required],
            password2: ['', forms_1.Validators.required]
        }, {
            validator: password_validator_1.PasswordValidation.MatchPassword
        });
        var that = this;
    };
    ChangePasswordComponent.prototype.changePassword = function () {
        var userInputs = {
            new_password1: this.changePasswordForm.controls['password1'].value,
            new_password2: this.changePasswordForm.controls['password2'].value
        };
        var that = this;
        // console.log(details);
        this.authenticationService.changePassword(userInputs)
            .subscribe(function (response) {
            that.openSnackBar("Password successfully changed");
            console.log("Success response", response);
        }, function (response) {
            if (response.status === 401) {
                return that.openSnackBar("Session Expired! Kindly login again.");
            }
            else if (response.status === 400) {
                return that.openSnackBar("Password and Confirm Password , both are required");
            }
            console.log("Error happened", response);
        });
    };
    ChangePasswordComponent = __decorate([
        core_1.Component({
            selector: 'app-change',
            templateUrl: './changePassword.component.html',
            styleUrls: ['./changePassword.component.css']
        })
    ], ChangePasswordComponent);
    return ChangePasswordComponent;
}());
exports.ChangePasswordComponent = ChangePasswordComponent;
