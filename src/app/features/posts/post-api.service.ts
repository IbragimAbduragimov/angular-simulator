import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { IPost } from './ipost';
import { IPostResponce } from './ipost-responce';
import { IPosts } from './IPosts';


@Injectable({
  providedIn: 'root',
})
export class PostApiService {
  
  private http: HttpClient = inject(HttpClient);

  getPosts(page: number, size: number): Observable<IPostResponce[]> { 
    return this.http.get<IPosts>(`https://dummyjson.com/posts?limit=${ page }&skip=${ size }`).pipe(
      map((response: IPosts) => response.posts)
    );
  }

  getPost(id: number | string): Observable<IPostResponce> {
    return this.http.get<IPostResponce>(`https://dummyjson.com/posts/${ id }`);
  }

  deletePost(id: number): Observable<IPostResponce> {
    return this.http.delete<IPostResponce>(`https://dummyjson.com/posts/${ id }`);
  }

  updatePost(id: number, data: Partial<IPostResponce>): Observable<IPostResponce> {
    return this.http.put<IPostResponce>(`https://dummyjson.com/posts/${ id }`, { 
      title: data.title,
      tags: data.tags,
      views: data.views
    })
  }

  createPost(data: IPostResponce): Observable<IPostResponce[]> {
    return this.http.post<IPostResponce[]>('https://dummyjson.com/posts/add', data);
  }

}
