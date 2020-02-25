import { Entity, Column, ObjectIdColumn, PrimaryColumn } from 'typeorm'

@Entity({
  name: 'user'
})
export class UserEntity {
  @ObjectIdColumn()
  _id: string

  @PrimaryColumn()
  email: string
  @Column()
  password: string
  @Column()
  firstName: string
  @Column()
  lastName: string
  @Column()
  avatar: string
  @Column()
  dob: number
  @Column()
  gender: string

  constructor(args: Partial<UserEntity>) {
    Object.assign(this, args)
  }
}
