import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PostService} from '../../../services/post.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-blog-page',
  templateUrl: './add-blog-page.component.html',
  styleUrls: ['./add-blog-page.component.scss']
})
export class AddBlogPageComponent implements OnInit {
    constructor(private formBuilder: FormBuilder, private postService: PostService, private location: Location) { }
    get f() {
        return this.registerForm.controls;
    }
    registerForm: FormGroup;
    submitted = false;
    categories: any;
    selectedFile ;
    progress;
    currentFileUpload;
    public formData = new FormData();
  ngOnInit(): void {
      this.registerForm = this.formBuilder.group({
          title: ['', Validators.required],
          categoriePost: ['', Validators.required],
          descriptionPost: ['', Validators.required],
      //    image: ['', Validators.required],
      });
      this.getCategoriePosts();
  }

    onSubmit(value) {
    value.photo = this.currentFileUpload;
    this.submitted = true;
        // stop here if form is invalid
    if (this.registerForm.invalid) {
            return;
        } else {
            this.onSavePost(value);
        }
    }

     getCategoriePosts() {
      this.postService.getCategoriePosts().subscribe(data => {
          this.categories = data;
      });
    }
    onSavePost(value) {
        this.postService.savePost(value).subscribe(data => {
           alert('Success');
           this.submitted = false;
           this.registerForm.reset();
        },
            error => {
            alert('Error');
            });

    }
    onSelectedFile(event) {
    this.getBase64(event);
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

    goBack() {
        this.location.back();
    }
}
