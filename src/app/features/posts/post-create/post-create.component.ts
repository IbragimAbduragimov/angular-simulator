import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostApiService } from '../post-api.service';
import { IPostResponce } from '../IPost-responce';
import { tap } from 'rxjs';
import { PostService } from '../post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-create',
  imports: [ReactiveFormsModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss',
})
export class PostCreateComponent {
  
  private fb: FormBuilder = inject(FormBuilder);
  postService: PostService = inject(PostService);
  router: Router = inject(Router);

  formValue!: IPostResponce;

  postForm: FormGroup = this.fb.nonNullable.group({
    id: ['', [Validators.required]],
    title: ['', [Validators.required]],
    body: ['', [Validators.required]],
    tags: ['', [Validators.required]],
    reactions: this.fb.nonNullable.group({
      likes: ['', [Validators.required]],
      dislikes: ['', [Validators.required]]
    }),
    views: ['', [Validators.required]],
    userId: ['', [Validators.required]],
  });

  onSubmit(): void {
    this.formValue = this.postForm.value;
      this.postService.createPost(this.formValue).pipe(
        tap((post: IPostResponce) => {
          this.postService.addpost(post);
        })
      ).subscribe();
    this.router.navigate(['posts']);
  }

}
