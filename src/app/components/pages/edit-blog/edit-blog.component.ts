import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../../../services/post.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss']
})
export class EditBlogComponent implements OnInit {
    url;
    currentBlog;
    categoriePost;
    selectedCat;
    selectedFiles;
    updatedBlog;
    currentFileUpload;
    constructor(private router: Router, private activatedRoute: ActivatedRoute,
                private postService: PostService, private location: Location) { }

  ngOnInit(): void {
      this.url = this.activatedRoute.snapshot.params.id;
      this.getCategoriePosts();
      this.getSelectedBlog(this.url);
  }

  getSelectedBlog(url) {
      this.postService.retrievePosts(url).subscribe(data => {
          console.log(data);
          this.currentBlog = data;
      },
          error => {
          console.log(error);
          });
    }
    getCategoriePosts() {
        this.postService.getCategoriePosts().subscribe(data => {
            this.categoriePost = data;
        });
    }

    onUpdateBlog(value) {
       if (this.selectedCat === undefined) {
           this.selectedCat = this.currentBlog.categoriePost;
       }
       this.updatedBlog = value;
       if (this.currentFileUpload != undefined) {
        this.updatedBlog.photo = this.currentFileUpload;
    }
       this.updatedBlog.categoriePost = this.selectedCat;
       console.log(this.updatedBlog);
     //  this.uploadPhoto();
       this.postService.updateBlog(this.currentBlog.idPost, this.updatedBlog).subscribe(data => {
            console.log(data);
        }, error => {
            console.log(error);
        });
    }

    goBack() {
        this.location.back();
    }

    onSelectedFile(event) {
        this.getBase64(event);
    }

    changeCategorie(evt) {
        this.selectedCat = evt;
    }

    uploadPhoto() {
        if (this.selectedFiles != undefined) {
            this.currentFileUpload = this.selectedFiles.item(0);
        }
    }
    getBase64(event) {
        const me = this;
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function() {
            me.currentFileUpload = reader.result.toString().split(',')[1];
        };
        reader.onerror = function(error) {
            console.log('Error: ', error);
        };
    }
}
