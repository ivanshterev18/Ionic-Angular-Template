import { ValidationErrors, AbstractControl } from '@angular/forms';

export class EqualValueValidator {
    public matchValues(
        matchTo: string
      ): (AbstractControl) => ValidationErrors | null {
        return (control: AbstractControl): ValidationErrors | null => {
          return !!control.parent &&
            !!control.parent.value &&
            control.value === control.parent.controls[matchTo].value
            ? null
            : { notSame: true };
        };
    }
    
}
