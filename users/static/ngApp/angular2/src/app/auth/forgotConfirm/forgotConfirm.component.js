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
var ForgotConfirmComponent = /** @class */ (function () {
    function ForgotConfirmComponent(authenticationService, route, formBuilder, snackBar) {
        this.authenticationService = authenticationService;
        this.route = route;
        this.formBuilder = formBuilder;
        this.snackBar = snackBar;
        this.title = 'Enter New Password';
        this.uid = this.route.snapshot.paramMap.get('uid');
        this.token = this.route.snapshot.paramMap.get('token');
        this.openSnackBar = function (message) {
            this.snackBar.open(message, " ", {
                duration: 5000
            });
        };
    }
    ForgotConfirmComponent.prototype.ngOnInit = function () {
        this.forgotConfirmForm = this.formBuilder.group({
            password1: ['', forms_1.Validators.required],
            password2: ['', forms_1.Validators.required]
        });
    };
    ForgotConfirmComponent.prototype.forgotConfirm = function () {
        var userInputs = {
            new_password1: this.forgotConfirmForm.controls['password1'].value,
            new_password2: this.forgotConfirmForm.controls['password2'].value,
            uid: this.uid,
            token: this.token
        };
        var that = this;
        this.authenticationService.forgotPasswordConfirm(userInputs)
            .subscribe(function (response) {
            that.openSnackBar("Password Successfully changed");
            console.log("success");
        }, function (response) {
            var res = response.json();
            if (response.status === 400 && res.new_password2) {
                that.openSnackBar("Password is too easy to guess. Min 8 mixed characters");
            }
            if (response.status === 400 && res.token) {
                that.openSnackBar("Token Expired. Try again.");
            }
            console.log("error");
        });
    };
    ForgotConfirmComponent = __decorate([
        core_1.Component({
            selector: 'app-forgotConfirm',
            templateUrl: './forgotConfirm.component.html'
        })
    ], ForgotConfirmComponent);
    return ForgotConfirmComponent;
}());
exports.ForgotConfirmComponent = ForgotConfirmComponent;
