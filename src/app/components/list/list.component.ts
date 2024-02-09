import { Component, OnInit } from '@angular/core';
import { SmartfitGymsService } from '../../services/smartfit-gyms.service';
import { Units } from 'src/app/models/units.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  locations!: Units;

  constructor(private smartfitGymsService: SmartfitGymsService) {}

  ngOnInit(): void {
    this.smartfitGymsService.resultGyms$.subscribe({
      next: (result) => {
        this.locations = result!;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  scrolLeft() {
    const slider = document.getElementById('card-slider')!;
    slider.scrollLeft -= 380;
  }

  scrolRight() {
    const slider = document.getElementById('card-slider')!;
    slider.scrollLeft += 380;
  }
}
