import { Component, Input, OnInit } from '@angular/core';
import { GymUnit } from 'src/app/models/gym-unit.model';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {
  @Input() location!: GymUnit;

  constructor() {}

  ngOnInit(): void {}

  innerHTML(id: number, text: string) {
    document.getElementById(id.toString())!.innerHTML = text;
  }
}
