export interface PostEditInput {
    _id: string;
    content: string;
}
export interface PostInput {
    content: string;
}
export interface UserInput {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}
export interface UserLoginInput {
    email?: string;
    password?: string;
}
export interface Comment {
    _id?: string;
    who?: UserInfo;
    postID?: string;
    text?: string;
    time?: number;
}
export interface Likes {
    _postID?: string;
    likeList?: string[];
}
export interface LoginRes {
    status?: string;
    message?: string;
    token?: string;
}
export interface IMutation {
    postOneComment(postID: string): Comment | Promise<Comment>;
    editOneComment(_id: string, text: string): Comment | Promise<Comment>;
    deleteOneComment(_id: string): boolean | Promise<boolean>;
    likeOnePost(_postID: string): boolean | Promise<boolean>;
    unLikeOnePost(_postID: string): boolean | Promise<boolean>;
    addPost(post: PostInput): boolean | Promise<boolean>;
    deletePost(postID: string): boolean | Promise<boolean>;
    updatePost(post: PostEditInput): boolean | Promise<boolean>;
    createUser(user?: UserInput): boolean | Promise<boolean>;
    login(loginInput?: UserLoginInput): LoginRes | Promise<LoginRes>;
}
export interface Post {
    _id?: string;
    who?: string;
    image?: string;
    content?: string;
    time?: number;
}
export interface IQuery {
    getCommentsByPostID(id: string): Comment[] | Promise<Comment[]>;
    getLikesByPostID(_postID: string): UserInfo[] | Promise<UserInfo[]>;
    posts(): Post[] | Promise<Post[]>;
    getOnePost(_id: string): Post | Promise<Post>;
    getPostsByUserID(userID: string): Post[] | Promise<Post[]>;
    users(): User[] | Promise<User[]>;
    getUserByID(_id?: string): UserInfo | Promise<UserInfo>;
}
export interface User {
    _id?: string;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
}
export interface UserInfo {
    _id?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
}
