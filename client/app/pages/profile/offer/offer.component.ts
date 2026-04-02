import { Component, OnInit, Input } from '@angular/core';
import { HelpCategory } from '@app/models';
import { UserService } from '@app/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, ValidatorFn, UntypedFormBuilder } from '@angular/forms';

@Component({
    selector: 'app-offer',
    templateUrl: './offer.component.html',
    styleUrls: ['./offer.component.scss'],
    standalone: false
})
export class OfferComponent implements OnInit {

    categories: HelpCategory[] = [];
    isLoading = true;
    @Input() isOwner = false;
    @Input() idUser: number;
    
    categoriesData: HelpCategory[] = [];
    form: UntypedFormGroup;

    constructor(
        private formBuilder: UntypedFormBuilder,
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
            categories: new UntypedFormArray([], minSelectedCheckboxes(1))
        });
        
        // async categories
        this.userService.getCategories2(this.idUser).subscribe(x => {
            this.categoriesData = x;
            // console.log('categoriesData', this.categoriesData)
            this.addCheckboxes();
        });
    }

    openModal(content) {
        // console.log('-- load module')
        this.initModal();
        // console.log('-- open module')
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    }

    private addCheckboxes() {
        const formArray = this.form.controls.categories as UntypedFormArray;
        this.categoriesData.forEach((cat, i) => {
            const control = new UntypedFormControl(i === 0);
            control.patchValue(cat.checked);
            formArray.push(control);
        });
    }

    getFormCategories() {
        return (this.form.get('categories') as UntypedFormArray).controls;
    }

    submit() {
        const selectedCategoryIds = this.form.value.categories
            .map((v, i) => v ? this.categoriesData[i].id : null)
            .filter(v => v !== null);
        // console.log(selectedCategoryIds);
        this.userService.putCategories(this.idUser, selectedCategoryIds).subscribe(x => {
            // console.log('success');
            this.loadCategories();
            this.modalService.dismissAll();
        });
    }
}

function minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: UntypedFormArray) => {
        const totalSelected = formArray.controls
            .map(control => control.value)
            .reduce((prev, next) => next ? prev + next : prev, 0);

        return totalSelected >= min ? null : { required: true };
    };
    return validator;
}