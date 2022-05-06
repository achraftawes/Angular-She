import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Posts } from 'src/app/models/posts-model';
import { PostService } from 'src/app/services/post.service';
import {Router} from '@angular/router';

class MyObject {
    name: string;
    nbre: Object;

    constructor(name: string, nbre: Object) {
        this.name = name;
        this.nbre = nbre;
    }
}

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent implements OnInit {
  posts: any;
  post!: Posts;
  categories: Array<MyObject> = [];
  nbreCategories: any;
  closeResult!: string;
    test: any;
    page: number = 1;
    count: number = 0;
    tableSize: number = 8;
    tableSizes: any = [3, 6, 9, 12];
  constructor(private postService: PostService, private router: Router) { }

  ngOnInit(): void{
      this.getCategoriePosts();
      this.retrieveAllPostss();

      this.posts = {
      idPost : null,
      title : null,
      likes : null,
      dislikes : null,
      descriptionPost : null,
	    createDatePost : null,
	    categoriePost : null

    };


  }
  retrieveAllPostss(){
  this.postService.retrieveAllPostss().subscribe(res => this.posts = res);
}

    getCategoriePosts() {
        this.postService.getCategoriePosts().subscribe(data => {
            this.test = data;
            this.test.forEach(c => {
               this.postService.nbreCategorieByPost(c).subscribe(data => {
                   this.categories.push(new MyObject(c, data));
               });
            });
        });
    }

    onClick(post) {
      this.postService.selectedBlog = post;
      console.log(post);
        this.router.navigateByUrl('/single-blog/' + post.idPost);
    }

    onSubmit(value) {
        this.postService.retrievePostsparCategorie(value.keyWord).subscribe(data => {
            this.posts = data;
        },
            error => {
            console.log(error);
            })
    }

    onChangeCategories(cat) {
        this.postService.retrievePostsCat(cat.name).subscribe(data => {
                this.posts = data;
            },
            error => {
                console.log(error);
            })
    }
    onTableDataChange(event: any) {
        this.page = event;
        this.retrieveAllPostss();
    }
    onTableSizeChange(event: any): void {
        this.tableSize = event.target.value;
        this.page = 1;
        this.retrieveAllPostss();
    }
}
