import { Component, OnInit } from "@angular/core";
import { Router, NavigationCancel, NavigationEnd } from "@angular/router";
import {
    Location,
    LocationStrategy,
    PathLocationStrategy,
} from "@angular/common";
import { filter } from "rxjs/operators";
declare let $: any;

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
    providers: [
        Location,
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy,
        },
    ],
})
export class AppComponent {
    location: any;
    routerSubscription: any;
    isLoggedIn = true;

    constructor(private router: Router) {}

    ngOnInit() {
        this.recallJsFuntions();
        this.isLoggedIn =
            !!sessionStorage.getItem("token") &&
            !!sessionStorage.getItem("username");
    }

    recallJsFuntions() {
        this.routerSubscription = this.router.events
            .pipe(
                filter(
                    (event) =>
                        event instanceof NavigationEnd ||
                        event instanceof NavigationCancel
                )
            )
            .subscribe((event) => {
                let location = "/";
                if (this.router.url.split("/").length > 1) {
                    location = `/${this.router.url.split("/")[1]}`;
                }
                this.location = location;
                if (!(event instanceof NavigationEnd)) {
                    return;
                }
                window.scrollTo(0, 0);
            });
    }
}
