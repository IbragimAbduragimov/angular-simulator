import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ToastModule } from 'primeng/toast';
import { IPost } from '../IPost';

@Component({
  selector: 'app-post-detail',
  imports: [ContextMenuModule, TableModule, ToastModule, SkeletonModule],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss',
})
export class PostDetailComponent implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute);

  post!: IPost;

  ngOnInit(): void {
    this.post = this.route.snapshot.data['post'];
  }
}
