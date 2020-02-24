import { Entity, Column, ObjectIdColumn } from 'typeorm'

@Entity({
  name: 'comments'
})
export class CommentEntity {
  @ObjectIdColumn()
  _id: string

  @Column()
  who: string
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
