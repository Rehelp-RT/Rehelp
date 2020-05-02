import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HelpCategory } from '@app/models';
import { CategoryService } from '@app/services';

@Component({
  selector: 'app-categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.css']
})
export class CategoriesEditComponent implements OnInit {

    @Input() userChoices: any;
    cats: HelpCategory[] = [];

    constructor(
        private catService: CategoryService,
        public activeModal: NgbActiveModal) { }

    ngOnInit(): void {
        this.catService.getAll().subscribe(x => {
            this.cats = x;
            console.log(this.userChoices);
            console.log(this.cats);
        });
    }

    isSelected(category: HelpCategory): boolean {
        return this.userChoices.some(x => x === category.id);
    }

    closeModal() {
        console.log('save');
        this.activeModal.close('Close click');
    }

}
