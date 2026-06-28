import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { IPostResponce } from './IPost-responce';
import { IPost } from './IPost';


@Injectable({
  providedIn: 'root',
})
export class PostApiService {
  
  private http: HttpClient = inject(HttpClient);

  private postUrl = 'https://dummyjson.com/posts'

  getPosts(page?: number, size?: number): Observable<IPostResponce[]> { 
    return this.http.get<IPost>(`${ this.postUrl }?limit=${ page || 5 }&skip=${ size || 0 }`).pipe(
      map((response: IPost) => response.posts)
    );
  }

  getPost(id: number | string): Observable<IPostResponce> {
    return this.http.get<IPostResponce>(`${ this.postUrl }/${ id }`);
  }

  deletePost(id: number): Observable<IPostResponce> {
    return this.http.delete<IPostResponce>(`${ this.postUrl }/${ id }`);
  }

  updatePost(id: number, data: Partial<IPostResponce>): Observable<IPostResponce> {
    return this.http.put<IPostResponce>(`${ this.postUrl }/${ id }`, data);
  }

  createPost(data: IPostResponce): Observable<IPostResponce> {
    return this.http.post<IPostResponce>(`${ this.postUrl }/add`, data);
  }

}
