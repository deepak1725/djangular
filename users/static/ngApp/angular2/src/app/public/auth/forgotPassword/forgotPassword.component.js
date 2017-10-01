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
var ForgotPasswordComponent = /** @class */ (function () {
    function ForgotPasswordComponent(authenticationService, route, router, formBuilder, snackBar) {
        this.authenticationService = authenticationService;
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
        this.snackBar = snackBar;
        this.title = 'Forgot Password';
        this.openSnackBar = function (message) {
            this.snackBar.open(message, " ", {
                duration: 5000
            });
        };
    }
    ForgotPasswordComponent.prototype.ngOnInit = function () {
        console.log("Welcome to forgot password");
        this.forgotPasswordForm = this.formBuilder.group({
            email: ['', forms_1.Validators.required]
        });
    };
    ForgotPasswordComponent.prototype.forgotPassword = function () {
        var userInputs = {
            email: this.forgotPasswordForm.controls['email'].value
        };
        var that = this;
        this.authenticationService.forgotPassword(userInputs)
            .subscribe(function (response) {
            that.openSnackBar("Email sent Success. Kindly check your email address.");
            console.log("Success response", response);
        }, function (response) {
            that.openSnackBar(response[Object.keys(response)[0]]);
            console.log("Error happened", response);
        });
    };
    ForgotPasswordComponent = __decorate([
        core_1.Component({
            selector: 'app-forgot',
            templateUrl: './forgotPassword.component.html',
            styleUrls: ['./forgotPassword.component.css']
        })
    ], ForgotPasswordComponent);
    return ForgotPasswordComponent;
}());
exports.ForgotPasswordComponent = ForgotPasswordComponent;
