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
  private postApiService: PostApiService = inject(PostApiService);
  private messageSevice: MessageService = inject(MessageService);
  private loaderService: LoaderService = inject(LoaderService);

  private postsSubject: BehaviorSubject<IPost[]> = new BehaviorSubject<IPost[]>([]);
  posts$: Observable<IPost[]> = this.postsSubject.asObservable();

  setPosts(posts: IPost[]): void {
    this.postsSubject.next(posts);
  }

  getPosts(): IPost[] {
    return this.postsSubject.getValue();
  }

  loadPosts(page?: number, size?: number): Observable<IPost[]> {
    this.loaderService.showLoader();
    return this.postApiService.getPosts(page, size).pipe(
      tap((posts: IPost[]) => this.setPosts(posts)),
      catchError((error: HttpErrorResponse) => {
        this.messageSevice.showError('произошла ошибка');
        return throwError(() => error);
      }),
      finalize(() => this.loaderService.hideLoader()),
    );
  }

  filterPost(posts: IPost[], id: number): IPost[] {
    const filteredPosts: IPost[] = posts.filter((post: IPost) => post.id !== id);
    return filteredPosts;
  }

  addPost(post: IPost): void {
    const newPost: IPost[] = [...this.getPosts(), post];
    this.postsSubject.next(newPost);
  }

  getPost(id: number | string): Observable<IPost> {
    this.loaderService.showLoader();
    return this.postApiService.getPost(id).pipe(
      tap((posts: IPost) => this.addPost(posts)),
      catchError((error: HttpErrorResponse) => {
        this.messageSevice.showError('произошла ошибка');
        return throwError(() => error);
      }),
      finalize(() => this.loaderService.hideLoader()),
    );
  }

  deletePost(id: number): Observable<IPost> {
    this.loaderService.showLoader();
    return this.postApiService.deletePost(id).pipe(
      tap(() => {
        const deletePost: IPost[] = this.filterPost(this.getPosts(), id);
        this.setPosts(deletePost);
      }),
      catchError((error: HttpErrorResponse) => {
        this.messageSevice.showError('произошла ошибка');
        return throwError(() => error);
      }),
      finalize(() => this.loaderService.hideLoader()),
    );
  }

  updatePost(id: number, data: Partial<IPost>): Observable<IPost> {
    this.loaderService.showLoader();
    return this.postApiService.updatePost(id, data).pipe(
      tap((post: IPost) => {
        const posts: IPost[] = this.getPosts();
        const updatedPosts: IPost[] = posts.map((posts) => (posts.id === id ? post : posts));
        this.setPosts(updatedPosts);
      }),
      catchError((error: HttpErrorResponse) => {
        this.messageSevice.showError('произошла ошибка');
        return throwError(() => error);
      }),
      finalize(() => this.loaderService.hideLoader()),
    );
  }

  createPost(data: IPost): Observable<IPost> {
    this.loaderService.showLoader();
    return this.postApiService.createPost(data).pipe(
      tap((post: IPost) => this.addPost(post)),
      catchError((error: HttpErrorResponse) => {
        this.messageSevice.showError('произошла ошибка');
        return throwError(() => error);
      }),
      finalize(() => this.loaderService.hideLoader()),
    );
  }
}
