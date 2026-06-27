import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, tap, throwError } from 'rxjs';
import { IPost } from './ipost';
import { PostApiService } from './post-api.service';
import { IPostResponce } from './ipost-responce';
import { MessageService } from '../../../message.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoaderService } from '../../loader.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {

  postApiService: PostApiService = inject(PostApiService);
  messageSevice: MessageService = inject(MessageService)
  loaderService: LoaderService = inject(LoaderService);
  
  private postsSubject: BehaviorSubject<IPostResponce[]> = new BehaviorSubject<IPostResponce[]>([]);
  posts$: Observable<IPostResponce[]> = this.postsSubject.asObservable();

  setPost(post: IPostResponce[]): void {
    this.postsSubject.next(post);
  }

  getPosts(): IPostResponce[] {
    return this.postsSubject.getValue();
  }

  loadPosts(page: number, size: number): Observable<IPostResponce[]> {
    this.loaderService.showLoader();
    return this.postApiService.getPosts(page, size).pipe(
      finalize(() => this.loaderService.hideLoader())
    );
  }

  filterPost(posts: IPostResponce[], id: number): IPostResponce[] {
    const filteredPosts: IPostResponce[] = posts.filter((post: IPostResponce) => post.id !== id );
    return filteredPosts;
  }

  addpost(post: IPostResponce): void {
    const newPost: IPostResponce[] = [...this.getPosts(), post];
    this.postsSubject.next(newPost);
  }

  getPostsApi(page: number, size: number): Observable<IPostResponce[]> {
    this.loaderService.showLoader();
    return this.postApiService.getPosts(page, size).pipe(
      catchError((error: HttpErrorResponse) => {
        this.messageSevice.showError('произошла ошибка')
        return throwError(() => error);
      }),
      finalize(() => this.loaderService.hideLoader()),
    );
  }

  getPost(id: number | string): Observable<IPostResponce> {
        this.loaderService.showLoader();
    return this.postApiService.getPost(id).pipe(
      catchError((error: HttpErrorResponse) => {
        this.messageSevice.showError('произошла ошибка')
        return throwError(() => error);
      }),
      finalize(() => this.loaderService.hideLoader()),
    );
  }

  deletePost(id: number): Observable<IPostResponce> {
    this.loaderService.showLoader();
    return this.postApiService.deletePost(id).pipe(
      catchError((error: HttpErrorResponse) => {
        this.messageSevice.showError('произошла ошибка')
        return throwError(() => error);
      }),
      finalize(() => this.loaderService.hideLoader()),
    );
  }

  updatePost(id: number, data: Partial<IPostResponce>): Observable<IPostResponce> {
    this.loaderService.showLoader();
    return this.postApiService.updatePost(id, data).pipe(
      catchError((error: HttpErrorResponse) => {
        this.messageSevice.showError('произошла ошибка')
        return throwError(() => error);
      }),
      finalize(() => this.loaderService.hideLoader()),
    );
  }

  createPost(data: IPostResponce): Observable<IPostResponce[]> {
    this.loaderService.showLoader();
    return this.postApiService.createPost(data).pipe(
      catchError((error: HttpErrorResponse) => {
        this.messageSevice.showError('произошла ошибка')
        return throwError(() => error);
      }),
      finalize(() => this.loaderService.hideLoader()),
    );
  }

}
