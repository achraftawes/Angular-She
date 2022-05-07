import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";

export interface StorageChange {
    key: string;
    value: string;
}

export interface StorageGetItem {
    key: string;
}

@Injectable({ providedIn: "root" })
export class StorageService {
    public storageChange$: ReplaySubject<StorageChange> = new ReplaySubject();

    constructor() {}

    public setStorageItem(change: StorageChange): void {
        sessionStorage.setItem(change.key, change.value);
        this.storageChange$.next(change);
    }

    public getStorageItem(getItem: StorageGetItem): void {
        sessionStorage.getItem(getItem.key);
    }

    public removeStorageItem(key: string) {
        sessionStorage.removeItem(key);
        this.storageChange$.next({ key, value: null });
    }
}
