import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ɵInternalFormsSharedModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IPostResponce } from '../IPost-responce';
import { PostApiService } from '../post-api.service';
import { PostService } from '../post.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { tap } from 'rxjs';
import { Badge } from "primeng/badge";
import { Button } from "primeng/button";
import { IPost } from '../IPost';
import { IPostEdit } from '../IPostEdit';


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
  ref: DynamicDialogRef = inject(DynamicDialogRef);

  title: string = this.dynamicDialogConfig.data.selectedProduct.title;
  tags: string = this.dynamicDialogConfig.data.selectedProduct.tags;
  views: string = this.dynamicDialogConfig.data.selectedProduct.views;


  postEditForm: FormGroup = this.fb.nonNullable.group({
    title: [this.title, [Validators.required]],
    tags: [this.tags, [Validators.required]],
    views: [this.views, [Validators.required]]
  });

  onSubmits() {
    const formValue = this.postEditForm.value;
    if (this.postEditForm.invalid) {
      return;
    }
    const convertedData: IPostEdit = {
      ...formValue,
    };
    const id: number = this.dynamicDialogConfig.data.id
    return this.postService.updatePost(id, convertedData).pipe(
      tap(() => {
        this.ref.close()
      }),
    ).subscribe();
  }

  close(): void {
    this.ref.close()
  }
}
