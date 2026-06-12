import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService, AuthenticationService } from '@app/services';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@app/models';
import { LoadingService } from '@app/shared/services/loading.service';

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
    public errorMsg: string = null;

    constructor(
        private http: HttpClient,
        private as: AuthenticationService,
        private us: UserService,
        private router: Router,
        private activeRouter: ActivatedRoute,
        private loadingService: LoadingService
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
        formData.append('upload_preset', environment.cloudinaryAvatarPreset);
        formData.append('folder', 'angular_sample');
        formData.append('file', file);
        this.uploading = true;
        this.errorMsg = null;
        this.loadingService.show();
        this.http.post(`https://api.cloudinary.com/v1_1/${environment.cloudinaryCloudName}/upload`, formData).subscribe(
            (response: any) => {
                this.uploading = false;
                this.loadingService.hide();
                const avatarPath = (response as any).public_id;
                this.us.uploadAvatar(this.user.id, avatarPath).subscribe(() => {
                    const updatedUser = { ...this.as.currentUserValue, avatar: avatarPath };
                    this.as.refresh(updatedUser);
                    this.router.navigate(['/profile/' + this.user.id]);
                }, err => {
                    this.errorMsg = 'Errore salvataggio avatar: ' + (err?.error?.message || err?.message || err);
                    console.error(err);
                });
            },
            err => {
                this.uploading = false;
                this.loadingService.hide();
                this.errorMsg = 'Errore caricamento immagine: ' + (err?.error?.error?.message || err?.message || err?.statusText);
                console.error(err);
            }
        );
    }
}
