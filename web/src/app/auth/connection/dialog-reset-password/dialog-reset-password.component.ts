import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ConnectionComponent} from "../connection.component";
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {RegexUser} from "../../../shared/enum/regex-user";
import {ErrorStateMatcher} from "@angular/material/core";

/** Error when invalid control is dirty, touched, or submitted. */
class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-dialog-reset-password',
  templateUrl: './dialog-reset-password.component.html',
  styleUrls: ['./dialog-reset-password.component.scss']
})
export class DialogResetPasswordComponent {

  constructor(
    public dialogRef: MatDialogRef<ConnectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {email: ""},
  ) {

  }

  emailFormControl = new FormControl(
    this.data.email, [
      Validators.required,
      Validators.pattern(RegexUser.email),
    ]);

  matcher = new MyErrorStateMatcher();

  onNoClick(): void {
    this.dialogRef.close();
  }


}
