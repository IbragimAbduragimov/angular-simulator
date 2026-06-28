import { Component, inject, OnInit } from '@angular/core';
import { PostApiService } from '../post-api.service';
import { AsyncPipe } from '@angular/common';
import { PostService } from '../post.service';
import { Observable, pipe, tap } from 'rxjs';
import { IPostResponce } from '../IPost-responce';
import { Table, TableModule, TablePageEvent } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ToastModule } from 'primeng/toast';
import { MenuItem, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PostEditDialogComponent } from '../post-edit-dialog/post-edit-dialog.component';

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
  route = inject(ActivatedRoute);

  posts$: Observable<IPostResponce[]> = this.postService.posts$;
  rows: number = 5;
  totalRecords: number = 30;
  first: number = 0;
  items!: MenuItem[];
  selectedProduct!: IPostResponce | null;
  ref!: DynamicDialogRef | null;
  loading: boolean = true;

  ngOnInit(): void {
    this.postService.loadPosts(5, 0)
      .pipe( 
        tap((post: IPostResponce[]) => {
          this.postService.setPost(post);
          this.loading = false;
        }),
      ).subscribe();

    this.items = [
      { label: 'View', command: () => this.viewPost() },
      { label: 'Edit', command: () => this.show() },
      { label: 'Delete', command: () => this.delete() },
    ];
  }

  skeleton: {}[] = [
    {},
    {},
    {},
    {},
    {},
  ];

  rowsPerPageOptions: number[] = [5, 10, 20];

  onPageChange(event: TablePageEvent) {
    this.rows = event.rows;
    this.first = event.first;
    this.postService.loadPosts(this.rows, this.first)
      .pipe(
        tap((post: IPostResponce[]) => {
          this.postService.setPost(post); 
          this.loading = false;
        }),
      ).subscribe();
  }
  viewPost(): void {
    this.router.navigate([`posts/${ this.selectedProduct?.id }`]);
  }

  onDblCkick(id: number): void {
    this.router.navigate([`posts/${ id }`]);
  }

  editPost(): void {
    this.router.navigate(['posts/post-edit']);
  }

  delete(): void {
    const id: number = this.selectedProduct?.id!;
    this.postService.deletePost(id).pipe(
      tap(() => {
        const deletePost: IPostResponce[] = this.postService.filterPost(this.postService.getPosts(), id);
        this.postService.setPost(deletePost);
        this.loading = false;
      })
    ).subscribe();
  }

  redirectToCreate(): void {
    this.router.navigate(['posts/create']);
  }

  show(): void {
    this.ref = this.dialogService.open(PostEditDialogComponent, {
      header: 'Редактируйте пользователя',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: { id: this.selectedProduct?.id }
    });
  }

}
