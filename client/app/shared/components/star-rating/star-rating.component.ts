import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-star-rating',
    templateUrl: './star-rating.component.html',
    styleUrls: ['./star-rating.component.scss'],
    standalone: false
})
export class StarRatingComponent implements OnInit {
    stars: number[] = [1, 2, 3, 4, 5];
    selectedValue: number;
    constructor() { }

    ngOnInit() {
    }

    countStar(star) {
      this.selectedValue = star;
      console.log('Value of star', star);
    }
}
