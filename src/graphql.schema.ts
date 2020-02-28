
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export interface CommentInput {
    postID: string;
    text: string;
}

export interface EditInput {
    _id: string;
    text: string;
}

export interface LikeInput {
    postID: string;
}

export interface PostEditInput {
    _id: string;
    content?: string;
    image?: string;
}

export interface PostInput {
    content: string;
    image: string;
}

export interface UserInput {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    gender: string;
}

export interface UserLoginInput {
    email?: string;
    password?: string;
}

export interface Comment {
    _id?: string;
    who?: string;
    postID?: string;
    text?: string;
    time?: number;
}

export interface CommentOutput {
    _id?: string;
    who?: UserInfo;
    postID?: string;
    text?: string;
    time?: number;
}

export interface Like {
    _id?: string;
    who?: User;
    postID?: string;
    idWho?: string;
}

export interface LoginRes {
    status?: string;
    message?: string;
    token?: string;
}

export interface IMutation {
    postOneComment(commentInput: CommentInput): boolean | Promise<boolean>;
    editOneComment(editInput: EditInput): boolean | Promise<boolean>;
    deleteOneComment(_id: string): boolean | Promise<boolean>;
    doLike(likeInput: LikeInput): boolean | Promise<boolean>;
    addPost(post: PostInput): Post | Promise<Post>;
    deletePost(postID: string): boolean | Promise<boolean>;
    updatePost(post: PostEditInput): boolean | Promise<boolean>;
    createUser(user?: UserInput): boolean | Promise<boolean>;
    login(loginInput?: UserLoginInput): LoginRes | Promise<LoginRes>;
}

export interface Post {
    _id?: string;
    idWho?: string;
    who?: User;
    image?: string;
    content?: string;
    likes?: Like[];
    time?: number;
}

export interface IQuery {
    getCommentsByPostID(postID: string): CommentOutput[] | Promise<CommentOutput[]>;
    getLikesByPostID(postID: string): Like[] | Promise<Like[]>;
    posts(skip: number): Post[] | Promise<Post[]>;
    getOnePost(_id: string): Post | Promise<Post>;
    getPostsByUserID(userID: string): Post[] | Promise<Post[]>;
    users(): User[] | Promise<User[]>;
    getUserByID(_id?: string): UserInfo | Promise<UserInfo>;
}

export interface ISubscription {
    commentCreated(postID: string): Comment | Promise<Comment>;
}

export interface User {
    _id?: string;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
    dob?: number;
    gender?: string;
}

export interface UserInfo {
    _id?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
    dob?: number;
    gender?: string;
}
