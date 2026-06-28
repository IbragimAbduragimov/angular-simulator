import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, tap, throwError } from 'rxjs';
import { IPost } from './IPost';
import { PostApiService } from './post-api.service';
import { IPostResponce } from './IPost-responce';
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

  loadPosts(page?: number, size?: number): Observable<IPostResponce[]> {
    this.loaderService.showLoader();
    return this.postApiService.getPosts(page, size).pipe(
      tap((posts: IPostResponce[]) => this.setPost(posts)),
      catchError((error: HttpErrorResponse) => {
        this.messageSevice.showError('произошла ошибка')
        return throwError(() => error);
      }),
      finalize(() => this.loaderService.hideLoader()),
    );
  }

  filterPost(posts: IPostResponce[], id: number): IPostResponce[] {
    const filteredPosts: IPostResponce[] = posts.filter((post: IPostResponce) => post.id !== id );
    return filteredPosts;
  }

  addPost(post: IPostResponce): void {
    const newPost: IPostResponce[] = [...this.getPosts(), post];
    this.postsSubject.next(newPost);
  }

  getPost(id: number | string): Observable<IPostResponce> {
    this.loaderService.showLoader();
    return this.postApiService.getPost(id).pipe(
      tap((posts: IPostResponce) => this.addPost(posts)),
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
      tap(() => {
        const deletePost: IPostResponce[] = this.filterPost(this.getPosts(), id);
        this.setPost(deletePost);
      }),
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
      tap((post: IPostResponce) => {
        const posts: IPostResponce[] = this.getPosts();
        const updatedPosts = posts.map((posts) => posts.id === id ? post : posts);
        this.setPost(updatedPosts);
      }),
      catchError((error: HttpErrorResponse) => {
        this.messageSevice.showError('произошла ошибка')
        return throwError(() => error);
      }),
      finalize(() => this.loaderService.hideLoader()),
    );
  }

  createPost(data: IPostResponce): Observable<IPostResponce> {
    this.loaderService.showLoader();
    return this.postApiService.createPost(data).pipe(
      tap((post: IPostResponce) => this.addPost(post)),
      catchError((error: HttpErrorResponse) => {
        this.messageSevice.showError('произошла ошибка')
        return throwError(() => error);
      }),
      finalize(() => this.loaderService.hideLoader()),
    );
  }

}
