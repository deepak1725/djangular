"use strict";
exports.__esModule = true;
var PasswordValidation = /** @class */ (function () {
    function PasswordValidation() {
    }
    PasswordValidation.MatchPassword = function (AC) {
        var password = AC.get('password1').value; // to get value in input tag
        var confirmPassword = AC.get('password2').value; // to get value in input tag
        if (password != confirmPassword) {
            AC.get('password2').setErrors({ MatchPassword: true });
        }
        else {
            return null;
        }
    };
    return PasswordValidation;
}());
exports.PasswordValidation = PasswordValidation;
