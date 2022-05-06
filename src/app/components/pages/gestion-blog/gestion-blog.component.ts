import { Component, OnInit } from '@angular/core';
import {PostService} from '../../../services/post.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-gestion-blog',
  templateUrl: './gestion-blog.component.html',
  styleUrls: ['./gestion-blog.component.scss']
})
export class GestionBlogComponent implements OnInit {
    blogs: any;
    currentKeyword = '';

  constructor(private postService: PostService,private router:Router) { }

  ngOnInit(): void {
      this.chercherBlogs();
  }

    onChercher(value) {

    }

    onDeleteBlog(e) {
            console.log(e);
            this.postService.onDeleteBlog(e.idPost).subscribe(data => {
                this.chercherBlogs();
            }, error => {
                console.log(error);
            });
        }

    onEditBlog(e) {
        this.router.navigateByUrl('/edit-blog/' + e.idPost);
    }

    private chercherBlogs() {
        this.postService.retrievePostsparCategorie(this.currentKeyword)
            .subscribe(data => {
                this.blogs = data;
            }, error => {
                console.log(error);
            });
    }
}
