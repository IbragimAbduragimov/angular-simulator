import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostApiService } from '../post-api.service';
import { IPostResponce } from '../IPost-responce';
import { catchError, tap, throwError } from 'rxjs';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { MessageService } from '../../../../message.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IPost } from '../IPost';

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
  messageService: MessageService = inject(MessageService)

  postForm: FormGroup = this.fb.nonNullable.group({
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
    const formValue: IPost = this.postForm.value;
      this.postService.createPost(formValue).pipe(
        tap(() => {
          this.router.navigate(['posts']);
        }),
        catchError((error: HttpErrorResponse) => {
          this.messageService.showError('ошибка при создании пользователя, попробуйте позже')
          return throwError(() => error);
        }),
      ).subscribe();
  }

}
