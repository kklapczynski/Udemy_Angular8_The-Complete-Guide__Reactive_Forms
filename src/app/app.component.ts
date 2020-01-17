import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  hobbiesFormArray: FormArray;
  forbiddenNames = ['Chris', 'Anna'];

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userdata': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.isForbiddenName.bind(this)]),  // isForbiddenName function is called as validator somewhere by Angular, that is why here we bind to our component where forbiddenNames are defined
        'email': new FormControl(null, [Validators.required, Validators.email]),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });

    this.hobbiesFormArray = <FormArray>this.signupForm.get('hobbies');
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  onAddHobby() {
    this.hobbiesFormArray.push(new FormControl(null, Validators.required));
  }

  get hobbiesControls() {
    return this.hobbiesFormArray.controls;
  }

  // our own validation function
  isForbiddenName(formControl: FormControl) : { [s: string] : boolean } {
    if( this.forbiddenNames.indexOf(formControl.value) !== -1) {
      return {'isForbiddenName' : true};
    } else {
      return null;
    }
  }
}
