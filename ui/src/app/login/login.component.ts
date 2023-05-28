import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TilesImagesService } from '../services/tiles-images.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  firstFormGroup = this.fb.group({
    // email: ['', [Validators.required, Validators.email]], // commented out for development purposes
    email: [''],
    // password: ['', [Validators.required]], // commented out for development purposes
    password: [''],
  });
  secondFormGroup = this.fb.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear: boolean = false;
  showInfo: boolean = false;

  constructor(
    private fb: FormBuilder,
    private tilesImagesService: TilesImagesService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  verify() {
    this.subscription.add(
      this.tilesImagesService.checkSelected().subscribe((result: string) => {
        result === 'OK'
          ? this._snackBar.open('Selected images are correct.', 'Got it')
          : this._snackBar.open('Selected images are incorrect.', 'Got it');
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
