import { IPostResponce } from "./ipost-responce";

export interface IPost {
  posts: IPostResponce[];
  title: string;
  tags: string;
  views: number;
}
