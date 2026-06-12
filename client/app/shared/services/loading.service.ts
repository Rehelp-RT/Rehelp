import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
    private count = 0;
    private loading$ = new BehaviorSubject<boolean>(false);

    get isLoading$(): Observable<boolean> {
        return this.loading$.asObservable();
    }

    show(): void {
        this.count++;
        this.loading$.next(true);
    }

    hide(): void {
        if (this.count > 0) this.count--;
        if (this.count === 0) this.loading$.next(false);
    }
}
