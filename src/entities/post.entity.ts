import { Entity, Column, ObjectIdColumn, OneToOne, JoinColumn } from 'typeorm'
import { UserEntity } from './user.entity'

@Entity({
  name: 'post'
})
export class PostEntity {
  @ObjectIdColumn()
  _id: string

  @Column()
  idWho: string
  @Column()
  who: UserEntity
  @Column()
  image: string
  @Column()
  content: string
  @Column()
  likes: any
  @Column()
  time: number

  constructor(args: Partial<PostEntity>) {
    Object.assign(this, args)
  }
}
