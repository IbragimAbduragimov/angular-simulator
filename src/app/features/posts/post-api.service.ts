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

  private postUrl: string = 'https://dummyjson.com/posts';

  getPosts(page?: number, size?: number): Observable<IPost[]> { 
    return this.http.get<IPostResponce>(`${ this.postUrl }?limit=${ page || 0 }&skip=${ size || 0 }`).pipe(
      map((response: IPostResponce) => response.posts)
    );
  }

  getPost(id: number | string): Observable<IPost> {
    return this.http.get<IPost>(`${ this.postUrl }/${ id }`);
  }

  deletePost(id: number): Observable<IPost> {
    return this.http.delete<IPost>(`${ this.postUrl }/${ id }`);
  }

  updatePost(id: number, data: Partial<IPost>): Observable<IPost> {
    return this.http.put<IPost>(`${ this.postUrl }/${ id }`, data);
  }

  createPost(data: IPost): Observable<IPost> {
    return this.http.post<IPost>(`${ this.postUrl }/add`, data);
  }

}
