import { Component, OnInit } from '@angular/core';
import { DateService } from '../infrastructure/date.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  constructor(private dateService: DateService) { }

  public currentDate = this.dateService.date;

  ngOnInit(): void {
  }

  public toggleMonth(value: number): void {
    this.dateService.changeMonth(value);
  }

}
