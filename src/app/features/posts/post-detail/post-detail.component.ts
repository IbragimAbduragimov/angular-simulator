import { Component, inject, OnInit } from '@angular/core';
import { PostApiService } from '../post-api.service';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { Observable, pipe, tap } from 'rxjs';
import { IPostResponce } from '../ipost-responce';
import { TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  imports: [ContextMenuModule, TableModule, ToastModule, SkeletonModule],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss',
})
export class PostDetailComponent implements OnInit{

  route: ActivatedRoute = inject(ActivatedRoute);
  postService: PostService = inject(PostService);
  router: Router = inject(Router);

  post$!: IPostResponce;

  ngOnInit(): void {
    const id: string = this.route.snapshot.paramMap.get('id')!;
    this.postService.getPost(id).pipe(
      tap((post: IPostResponce) => {
        this.post$ = post; 
      }),
    ).subscribe();

  }

}
