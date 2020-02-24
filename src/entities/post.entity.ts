import { Entity, Column, ObjectIdColumn } from 'typeorm'

@Entity({
  name: 'post'
})
export class PostEntity {
  @ObjectIdColumn()
  _id: string

  @Column()
  who: any
  @Column()
  image: string
  @Column()
  content: string
  @Column()
  time: number

  constructor(args: Partial<PostEntity>) {
    Object.assign(this, args)
  }
}
