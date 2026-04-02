import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService, AuthenticationService } from '@app/services';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@app/models';

@Component({
    selector: 'app-upload-avatar',
    templateUrl: './upload-avatar.component.html',
    styleUrls: ['./upload-avatar.component.scss'],
    standalone: false
})
export class UploadAvatarComponent implements OnInit {
    @Input()
    responses: Array<any>;

    user: User = null;
    public uploading = false;

    constructor(
        private http: HttpClient,
        private as: AuthenticationService,
        private us: UserService,
        private router: Router,
        private activeRouter: ActivatedRoute
    ) { }


    ngOnInit(): void {
        this.activeRouter.parent.params.subscribe(params => {
            const id = params.id;
            if (id == this.as.currentUserValue.id) {
                this.us.getById(id).subscribe(x => {
                    this.user = x;
                });
                this.responses = [];
            } else {
                this.router.navigate(['/profile/' + id]);
            }
        });
    }

    onFileSelected(event: Event) {
        const file = (event.target as HTMLInputElement).files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('upload_preset', 'preset_avatar');
        formData.append('folder', 'angular_sample');
        formData.append('file', file);
        this.uploading = true;
        this.http.post('https://api.cloudinary.com/v1_1/hwbyvepex/upload', formData).subscribe(
            (response: any) => {
                this.uploading = false;
                const avatarPath = (response as any).public_id;
                this.us.uploadAvatar(this.user.id, avatarPath).subscribe(() => {
                    this.user.avatar = avatarPath;
                    this.as.refresh(this.user);
                    this.router.navigate(['/profile/' + this.user.id]);
                }, err => console.error(err));
            },
            err => { this.uploading = false; console.error(err); }
        );
    }
}
