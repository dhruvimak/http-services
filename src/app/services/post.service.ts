import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private base_url='https://jsonplaceholder.typicode.com/posts';

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get(this.base_url);
  }

  add(input:any){
   
    return this.http.post(this.base_url,JSON.stringify(input));
  }

  update(post){
    return this.http.put(this.base_url+'/'+post.id,JSON.stringify(post));
  }
  delete(post){
    return this.http.delete(this.base_url+'/'+post.id);
  }
}
