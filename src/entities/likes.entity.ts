import { Entity, Column, ObjectIdColumn } from 'typeorm'

@Entity({
  name: 'likes'
})
export class LikeEntity {
  @ObjectIdColumn()
  _idPost: string

  @Column()
  likeList: any
  
  constructor(args: Partial<LikeEntity>) {
    Object.assign(this, args)
  }
}
