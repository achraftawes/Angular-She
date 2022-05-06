
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })

export class PostService {
    selectedBlog;
  constructor(private http: HttpClient) { }

  retrieveAllPostss() {
    return this.http.get('/retrieve-all-Posts');
  }
    retrievePosts(data) {
        return this.http.get('/retrieve-Posts/' + data);
    }
    getCategoriePosts() {
        return this.http.get('/categories');
    }
    retrievePostsparCategorie(data){
      return this.http.get('/getPostsByTitle?title=' + data);
    }
    retrievePostsCat(data){
        return this.http.get('/Posts-category?CategoriePosts=' + data);
    }
    nbreCategorieByPost(data) {
        return this.http.get('/Posts-nbre?CategoriePosts=' + data);
    }
    savePost(data){
        return this.http.post('/add-Posts', data);
    }
    saveComment(idWomen, idPost, data){
        return this.http.post('/Women/addComment/' + idWomen + '/' + idPost, data);
    }

    getBlogByKeyword(currentKeyword) {
      return this.http.get('/getPostByKeyword?keyword=' + currentKeyword);
    }

    onDeleteBlog(href) {
        return this.http.delete('/remove-Posts/' + href);
    }

    getBlogById(url) {

    }

    updateBlog(idPost , post) {
        return this.http.put('/modify-Posts/' + idPost , post);
    }
}
