import {AbstractControl} from '@angular/forms';



export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
       let password = AC.get('password1').value; // to get value in input tag
       let confirmPassword = AC.get('password2').value; // to get value in input tag
        if(password != confirmPassword) {
            AC.get('password2').setErrors( {MatchPassword: true} )
        } else {
            return null
        }
    }
}