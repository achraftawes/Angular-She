import { Component, OnInit } from '@angular/core';
import {PostService} from '../../../services/post.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';

@Component({
  selector: 'app-blog-details-page',
  templateUrl: './blog-details-page.component.html',
  styleUrls: ['./blog-details-page.component.scss']
})
export class BlogDetailsPageComponent implements OnInit {
    selectedBlog;
    id;
    registerForm: FormGroup;
    submitted = false;
    nbComment = 0;
  constructor(private location: Location, private formBuilder: FormBuilder, private postService: PostService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
      this.activatedRoute.params.subscribe(paramsId => {
          this.id = paramsId.id;
      });
      this.registerForm = this.formBuilder.group({
          
          descriptionCommentPost: ['', Validators.required],
         
          //    image: ['', Validators.required],
      });
      this.getPost(this.id);
  }
    get f() {
        return this.registerForm.controls;
    }
    getPost(id) {
      this.postService.retrievePosts(id).subscribe(data=>{
         this.selectedBlog = data;
         this.nbComment = this.selectedBlog.comments.length;
      });
    }
    onSubmit(value){
        this.submitted = true;
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        } else {
            this.onSaveComment(value);
        }
    }

    onSaveComment(value) {
      this.postService.saveComment(1, this.selectedBlog.idPost, value).subscribe(data => {
          this.getPost(this.selectedBlog.idPost);
          this.submitted = false;
          this.registerForm.reset();
      });
    }

    goBack() {
        this.location.back();
    }
}
