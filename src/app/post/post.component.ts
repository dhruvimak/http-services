import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostService } from '../services/post.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass']
})
export class PostComponent implements OnInit {

  posts: any;
  private base_url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private post: PostService) {
  }

  ngOnInit() {
    this.post.getAll().subscribe(
      respose => this.posts = respose
    )
  }

  addPost(input: HTMLInputElement) {
    let post = { title: input.value };
    input.value = '';

    this.post.add(post).subscribe(
      (response: any) => {
        post['id'] = response.id;
        this.posts.splice(0, 0, post);
      },
      (error :Response)=> {
        if (error.status == 400) {
          alert('This post has been already deleted !');
        }
        alert('Unexpected Error occurred !');
        console.log(error);
     
    )
  }

  updatePost(post) {
    this.post.update(post.id).subscribe(
      response => console.log(response),
      error => console.log(error)
    )
  }
  deletePost(post) {
    this.post.delete(post.id).subscribe(
      response => {
        let index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      },
      (error: Response) => {
        if (error.status == 404) {
          alert('This post has been already deleted !');
        }
        alert('Unexpected Error occurred !');
        console.log(error);
      }
    )
  }
}
