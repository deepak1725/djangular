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
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(route, router, formBuilder, authenticationService, snackBar) {
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
        this.authenticationService = authenticationService;
        this.snackBar = snackBar;
        this.title = 'Register';
        this.loading = false;
        this.openSnackBar = function (message) {
            this.snackBar.open(message, " ", {
                duration: 5000
            });
        };
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.signupForm = this.formBuilder.group({
            username: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required],
            first_name: ['', forms_1.Validators.required],
            last_name: ['', forms_1.Validators.required],
            email: ['', forms_1.Validators.required]
        });
    };
    RegisterComponent.prototype.registerUser = function () {
        var userInputs = {
            username: this.signupForm.controls['username'].value,
            password1: this.signupForm.controls['password'].value,
            password2: this.signupForm.controls['password'].value,
            first_name: this.signupForm.controls['first_name'].value,
            last_name: this.signupForm.controls['last_name'].value,
            email: this.signupForm.controls['email'].value
        };
        console.log(userInputs);
        var that = this;
        this.authenticationService.register(userInputs)
            .subscribe(function (response) {
            that.openSnackBar("Successfully Signed up.");
            console.log("Success response", response);
        }, function (response) {
            response = response.json();
            that.openSnackBar(response[Object.keys(response)[0]]);
            console.log("Error happened", response);
        });
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'app-register',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.css']
        })
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
