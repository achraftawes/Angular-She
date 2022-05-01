import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lightbox } from 'ngx-lightbox';
import { JobOffersService } from 'src/app/services/JobOffers.service';

@Component({
    selector: 'app-gallery-page',
    templateUrl: './gallery-page.component.html',
    styleUrls: ['./gallery-page.component.scss']
})
export class GalleryPageComponent implements OnInit {

    public offers:any;
    constructor(private joboffersService:JobOffersService, private router: Router){}

    ngOnInit(): void {
        this.ListOffers();
       
    }
    ListOffers(){
        this.joboffersService.ListOffers().subscribe(res => this.offers=res);
    }
    delete(id){
        this.joboffersService.Delete(id).subscribe(data=>{
            alert("Delet Offre!!");
            this.ListOffers();
          console.log(data);
          
        })
      }
}