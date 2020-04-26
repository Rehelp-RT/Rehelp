import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit, AfterViewInit {

  @Input() rating: number;
  @ViewChild('stars') stars: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
      console.log(this.stars.nativeElement.offsetWidth);
      console.log(this.stars.nativeElement.style);
  }


}
