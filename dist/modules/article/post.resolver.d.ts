import { PostEntity } from '../../entities/post.entity'
import { Post } from '../../graphql.schema'
export declare class PostResolver {
    getPosts(context: any): Promise<Post[]>
    addPost(Context: any, post: any): Promise<PostEntity>
}
