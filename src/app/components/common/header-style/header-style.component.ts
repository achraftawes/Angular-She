import { Component, OnInit } from '@angular/core';
import { RoleName } from 'src/app/models/role-name';

@Component({
    selector: 'app-header-style',
    templateUrl: './header-style.component.html',
    styleUrls: ['./header-style.component.scss']
})
export class HeaderStyleComponent implements OnInit {
    isFormer = false;
    constructor() { }

    ngOnInit(): void {
        const rolesRaw = sessionStorage.getItem("roles");
        if (!!rolesRaw) {
            try {
                const parsedRoles = JSON.parse(rolesRaw) as RoleName[];
                this.isFormer = parsedRoles.includes(RoleName.FORMER);
               
            } catch {}
        }

        
    }

    classApplied = false;
    toggleClass() {
        this.classApplied = !this.classApplied;
    }

    classApplied2 = false;
    toggleClass2() {
        this.classApplied2 = !this.classApplied2;
    }

    classApplied3 = false;
    toggleClass3() {
        this.classApplied3 = !this.classApplied3;
    }

}
