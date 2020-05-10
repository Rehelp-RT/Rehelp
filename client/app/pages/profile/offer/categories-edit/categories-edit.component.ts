import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '@app/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.scss']
})
export class CategoriesEditComponent implements OnInit {

    @Input() idUser: number;
    categoriesData = [];
    form: FormGroup;

    constructor(
        public activeModal: NgbActiveModal,
        private userService: UserService,
        private formBuilder: FormBuilder,
        private router: Router) { }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
          categories: new FormArray([], minSelectedCheckboxes(1))
        });

        // async categories
        this.userService.getCategories2(this.idUser).subscribe(x => {
            this.categoriesData = x;
            this.addCheckboxes();
        });
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
            this.router.navigate(['/profile/', this.idUser]).then(() => {
                this.activeModal.dismiss();
            });
        });
    }

    closeModal() {
        this.activeModal.close('Close click');
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
