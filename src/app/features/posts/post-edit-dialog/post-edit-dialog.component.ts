import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ɵInternalFormsSharedModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IPostResponce } from '../ipost-responce';
import { PostApiService } from '../post-api.service';
import { PostService } from '../post.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { tap } from 'rxjs';
import { Badge } from "primeng/badge";
import { Button } from "primeng/button";
import { IPost } from '../ipost';


@Component({
  selector: 'app-post-edit-dialog',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, Button],
  templateUrl: './post-edit-dialog.component.html',
  styleUrl: './post-edit-dialog.component.scss',
})
export class PostEditDialogComponent {

  private fb: FormBuilder = inject(FormBuilder);
  postService: PostService = inject(PostService);

  dynamicDialogConfig: DynamicDialogConfig = inject(DynamicDialogConfig);
  formValue!: IPostResponce;
  ref: DynamicDialogRef = inject(DynamicDialogRef);


  postEditForm: FormGroup = this.fb.nonNullable.group({
    title: ['', [Validators.required]],
    tags: ['', [Validators.required]],
    views: ['', [Validators.required]]
  });

  onSubmits() {
    this.formValue = this.postEditForm.value;
    if (this.postEditForm.invalid) {
      return;
    }
    const convertedData: IPost = {
      title: this.formValue.title,
      tags: this.formValue.tags,
      views: this.formValue.views
    };
    const id: number = this.dynamicDialogConfig.data.id
    return this.postService.updatePost(id, convertedData).pipe(
      tap((post: IPostResponce) => {
        const posts: IPostResponce[] = this.postService.getPosts()
        const filteredPosts: IPostResponce[] = this.postService.filterPost(posts, id)
        const newPosts: IPostResponce[] = [...filteredPosts, post]
        this.postService.setPost(newPosts)
        this.ref.close()
      }),
    ).subscribe();
  }

  close(): void {
    this.ref.close()
  }
}
