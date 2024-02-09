import { Component, OnInit } from '@angular/core';
import { SmartfitGymsService } from '../../services/smartfit-gyms.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  formWorkouts!: FormGroup;
  countUnits: number = 0;

  constructor(
    private fb: FormBuilder,
    private smartfitGymsService: SmartfitGymsService
  ) {}

  ngOnInit(): void {
    this.formWorkouts = this.fb.group({
      period: [null, Validators.required],
      closedUnits: [false],
    });
  }

  searchGyms() {
    if (this.formWorkouts.valid) {
      this.smartfitGymsService
        .getGyms(
          this.formWorkouts.value['period'],
          this.formWorkouts.value['closedUnits']
        )
        .subscribe({
          next: (result) => {
            this.countUnits = result.locations.length;
          },
          error: (err) => {
            console.error(err);
            this.countUnits = 0;
          },
        });
    }
  }

  clearForm() {
    this.formWorkouts.patchValue({
      period: null,
      closedUnits: false,
    });
    this.countUnits = 0;
    this.smartfitGymsService.clearResults();
  }
}
