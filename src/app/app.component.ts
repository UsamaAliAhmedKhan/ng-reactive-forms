import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  forms: FormGroup;
  forbiddenUserNames = ['Usama', 'Khan']

  ngOnInit() {
    this.forms = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenName.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenUserEmail)
      }),
      'gender': new FormControl('male', Validators.required),
      'hobbies': new FormArray([])
    })

     // this.signupForm.valueChanges.subscribe(
    //   (value) => console.log(value)
    // );
    this.forms.statusChanges.subscribe((status) => console.log(status));
    
    this.forms.setValue({
      userData: {
        username: 'Max',
        email: 'max@test.com',
      },
      gender: 'male',
      hobbies: [],
    });
    this.forms.patchValue({
      userData: {
        username: 'Anna',
      },
    });
  }

  onSubmit(){
    console.log(this.forms)
  }

  getControls() {
    return (<FormArray>this.forms.get('hobbies')).controls;
  }

  onAddHobbies(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.forms.get('hobbies')).push(control);
  }

  forbiddenName(control: FormControl): {[s: string]: boolean} {

    if(this.forbiddenUserNames.indexOf(control.value) !== -1){
      return {'nameIsForbidden': true};
    }
    else{
      return null;
    }
  }

  forbiddenUserEmail(control: FormControl): Promise<any> | Observable<any>{
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if(control.value === 'test@test.com'){
          resolve({'emailIsForbidden': true})
        }
        else{
          resolve(null)
        }
      }, 1500);
    });
    return promise;
  }

}
