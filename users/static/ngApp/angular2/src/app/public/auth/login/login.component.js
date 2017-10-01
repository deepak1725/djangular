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
var LoginComponent = /** @class */ (function () {
    function LoginComponent(formBuilder, route, router, authenticationService, snackBar) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this.snackBar = snackBar;
        this.title = 'Login';
        this.emailFormControl = new forms_1.FormControl('', [
            forms_1.Validators.required,
        ]);
        this.passwordFormControl = new forms_1.FormControl('', [
            forms_1.Validators.required,
        ]);
        this.openSnackBar = function (message) {
            this.snackBar.open(message, " ", {
                duration: 2000
            });
        };
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.loginForm = this.formBuilder.group({
            username: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required]
        });
    };
    ;
    LoginComponent.prototype.loginUser = function () {
        var adduser = {
            username: this.loginForm.controls['username'].value,
            password: this.loginForm.controls['password'].value
        };
        var that = this;
        this.authenticationService.login(adduser.username, adduser.password)
            .subscribe(function (response) {
            that.openSnackBar("Successfully logged in.");
        }, function (response) {
            response = response.json();
            that.openSnackBar(response[Object.keys(response)[0]]);
            console.log("Error happened", response);
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html'
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
