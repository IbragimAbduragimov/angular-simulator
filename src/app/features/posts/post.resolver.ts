import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { PostService } from './post.service';
import { IPostResponce } from './IPost-responce';

export const postResolver: ResolveFn<IPostResponce> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

  const postService: PostService = inject(PostService);
  const post: string = route.paramMap.get('id')!;
  const parse: number = +post;

  return postService.getPost(parse);
  
};
