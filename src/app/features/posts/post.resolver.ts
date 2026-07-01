import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { PostService } from './post.service';
import { IPost } from './IPost';

export const postResolver: ResolveFn<IPost> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

  const postService: PostService = inject(PostService);
  const post: string = route.paramMap.get('id')!;
  const parse: number = +post;

  return postService.getPost(parse);
  
};
