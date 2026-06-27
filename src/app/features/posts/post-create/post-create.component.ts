import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostApiService } from '../post-api.service';
import { IPostResponce } from '../ipost-responce';
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
    id: ['', []],
    title: ['',],
    body: ['',],
    tags: ['',],
    reactions: this.fb.nonNullable.group({
      likes: [''],
      dislikes: ['']
    }),
    views: ['', ],
    userId: ['', ],
  });

  onSubmit(): void {
    this.formValue = this.postForm.value;
      this.postService.createPost(this.formValue).pipe(
        tap((post: any) => {
          this.postService.addpost(post);
        })
      ).subscribe();
    this.router.navigate(['posts']);
  }

}
