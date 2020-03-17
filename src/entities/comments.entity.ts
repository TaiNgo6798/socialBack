import { Entity, Column, ObjectIdColumn } from 'typeorm'
import { UserEntity } from './user.entity'

@Entity({
  name: 'comments'
})
export class CommentEntity {
  @ObjectIdColumn()
  _id: string

  @Column()
  who: UserEntity
  @Column()
  userID: string
  @Column()
  postID: string
  @Column()
  text: string
  @Column()
  time: number
  
  constructor(args: Partial<CommentEntity>) {
    Object.assign(this, args)
  }
}
