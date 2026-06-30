import { Component, inject, OnInit } from '@angular/core';
import { PostApiService } from '../post-api.service';
import { AsyncPipe } from '@angular/common';
import { PostService } from '../post.service';
import { EMPTY, Observable, pipe, switchMap, take, tap } from 'rxjs';
import { IPostResponce } from '../IPost-responce';
import { Table, TableModule, TablePageEvent } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ToastModule } from 'primeng/toast';
import { MenuItem, MessageService } from 'primeng/api';
import { ActivatedRoute, Router, withDebugTracing } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PostEditDialogComponent } from '../post-edit-dialog/post-edit-dialog.component';
import { IPost } from '../IPost';
import { IPostEdit } from '../IPostEdit';

@Component({
  selector: 'app-posts',
  imports: [AsyncPipe, ContextMenuModule, TableModule, ToastModule, SkeletonModule],
  providers: [MessageService, DialogService],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {

  postService: PostService = inject(PostService);
  router: Router = inject(Router);
  dialogService: DialogService = inject(DialogService);
  route: ActivatedRoute = inject(ActivatedRoute);

  posts$: Observable<IPostResponce[]> = this.postService.posts$;
  rows: number = 5;
  totalRecords: number = 30;
  first: number = 0;

  selectedProduct!: IPostResponce | null;
  ref!: DynamicDialogRef | null;
  isLoading: boolean = true;

  ngOnInit(): void {
    this.postService.loadPosts(5, 0)
      .pipe( 
        tap(() => {
          this.isLoading = false;
        }),
      ).subscribe();
  }

  rowsPerPageOptions: number[] = [5, 10, 20];

  actions: MenuItem[] = [
    { label: 'View', command: () => this.viewPost() },
    { label: 'Edit', command: () => this.showEditModal() },
    { label: 'Delete', command: () => this.deletePost() },
  ];

  onPageChange(event: TablePageEvent): void {
    this.rows = event.rows;
    this.first = event.first;
    this.postService.loadPosts(this.rows, this.first)
      .pipe(
        tap(() => {
          this.isLoading = false;
        }),
      ).subscribe();
  }

  viewPost(): void {
    this.router.navigate([`posts/${ this.selectedProduct?.id }`]);
  }

  showPostDetails(id: number): void {
    this.router.navigate([`posts/${ id }`]);
  }

  deletePost(): void {
    const id: number = this.selectedProduct?.id!;
    this.postService.deletePost(id).pipe(
      tap(() => {
        this.isLoading = false;
      })
    ).subscribe();
  }

  redirectToCreate(): void {
    this.router.navigate(['posts/create']);
  }

  showEditModal(): void {
    const id = this.selectedProduct!.id;
    this.postService.getPost(this.selectedProduct!.id)
      .pipe(
        switchMap((fullPost: IPostResponce) => {
          this.ref = this.dialogService.open(PostEditDialogComponent, { 
            header: 'Редактирование поста', 
            data: { selectedProduct: fullPost } 
          });
          return this.ref?.onClose || EMPTY;
        }),
        switchMap((post) => this.postService.updatePost(id, post)),
        tap((updatedPost: IPostResponce) => {
          if (updatedPost) {
            this.postService.updatePost(id, updatedPost);
          }
        }),
        take(1),
      ).subscribe();
  }

}
