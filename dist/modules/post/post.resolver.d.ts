import { Post } from '../../graphql.schema';
import { LikesService } from '../likes/likes.service';
import { CommentService } from '../comment/comment.service';
export declare class PostResolver {
    private readonly likesService;
    private readonly commentService;
    constructor(likesService: LikesService, commentService: CommentService);
    posts(context: any): Promise<Post[]>;
    getOnePost(Context: any, _id: any): Promise<Post>;
    addPost(Context: any, post: any): Promise<Boolean>;
    deletePost(Context: any, id: any): Promise<Boolean>;
    updatePost(Context: any, post: any): Promise<Boolean>;
}
