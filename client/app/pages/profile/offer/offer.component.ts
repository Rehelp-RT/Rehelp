import { Component, OnInit, Input } from '@angular/core';
import { HelpCategory, User } from '@app/models';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService, UserService } from '@app/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesEditComponent } from './categories-edit/categories-edit.component';
import { FormArray, FormControl, FormGroup, ValidatorFn, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-offer',
    templateUrl: './offer.component.html',
    styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {

    categories: HelpCategory[] = [];
    isLoading = true;
    @Input() isOwner = false;
    @Input() idUser: number;
    
    categoriesData = [];
    form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        private modalService: NgbModal) { }

    ngOnInit() {
        this.loadCategories();
    }

    loadCategories() {
        this.userService.getCategories(this.idUser).subscribe(x => {
            this.isLoading = false;
            if (x.categories && x.categories.length > 0) {
                this.categories = x.categories;
            }
        });
    }

    // open() {
    //     const modalRef = this.modalService.open(CategoriesEditComponent, { size: 'lg', backdrop: 'static' });
    //     console.log('modalRef', modalRef)
    //     modalRef.componentInstance.idUser = this.idProfile;
    //     modalRef.componentInstance.loadCategories = this.loadCategories();
    // }

    initModal() {
        this.form = this.formBuilder.group({
            categories: new FormArray([], minSelectedCheckboxes(1))
          });
  
          // async categories
          this.userService.getCategories2(this.idUser).subscribe(x => {
              this.categoriesData = x;
              this.addCheckboxes();
          });
    }

    openModal(content) {
        console.log('-- load module')
        this.initModal();
        console.log('-- open module')
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
      }

    private addCheckboxes() {
        const formArray = this.form.controls.categories as FormArray;
        this.categoriesData.forEach((cat, i) => {
            const control = new FormControl(i === 0);
            control.patchValue(cat.checked);
            formArray.push(control);
        });
    }

    getFormCategories() {
        return (this.form.get('categories') as FormArray).controls;
    }

    submit() {
        const selectedCategoryIds = this.form.value.categories
            .map((v, i) => v ? this.categoriesData[i].id : null)
            .filter(v => v !== null);
        console.log(selectedCategoryIds);
        this.userService.putCategories(this.idUser, selectedCategoryIds).subscribe(x => {
            console.log('success');
            this.loadCategories();
            this.modalService.dismissAll();
        });
    }
}

function minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
        const totalSelected = formArray.controls
            .map(control => control.value)
            .reduce((prev, next) => next ? prev + next : prev, 0);

        return totalSelected >= min ? null : { required: true };
    };
    return validator;
}