import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TilesImagesService } from '../services/tiles-images.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  firstFormGroup = this.fb.group({
    // email: ['', [Validators.required, Validators.email]], // commented out for development purposes
    email: [''],
    // password: ['', [Validators.required]], // commented out for development purposes
    password: [''],
  });
  secondFormGroup = this.fb.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  constructor(
    private fb: FormBuilder,
    private tilesImagesService: TilesImagesService
  ) {}

  ngOnInit(): void {}

  verify() {
    console.log(this.tilesImagesService.selectedTiles);
    this.tilesImagesService.checkSelected();
  }
}
