import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
} from "typeorm";
import { RatingUserEpisode } from "./rating-user-episode.entity";
import { RatingUserMovie } from "./rating-user-movie.entity";
import { StatusUserEpisode } from "./status-user-episode.entity";
import { StatusUserMovie } from "./status-user-movie.entity";
import * as Validator from 'class-validator';

@Index("uq_user_email", ["email"], { unique: true })
@Index("uq_user_phone_number", ["phoneNumber"], { unique: true })
@Entity("user")
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "user_id", unsigned: true })
  userId: number;

  @Column({
    type: "varchar",
    name: "email",
    unique: true,
    length: 255
  })
  @Validator.IsNotEmpty()
  @Validator.IsEmail({
    allow_ip_domain: false,
    allow_utf8_local_part: true,
    require_tld: true,
  })
  email: string;

  @Column({
    type: "varchar",
    name: "password_hash",
    length: 128
  })
  @Validator.IsNotEmpty()
  @Validator.IsHash('sha512')
  passwordHash: string;

  @Column({ type: "varchar", name: "forename", length: 64})
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(2,64)
  forename: string;

  @Column({ type: "varchar", name: "surname", length: 64 })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(2,64)
  surname: string;

  @Column({
    type: "varchar",
    name: "phone_number",
    unique: true,
    length: 24
  })
  @Validator.IsNotEmpty()
  @Validator.IsPhoneNumber(null)
  phoneNumber: string;

  @Column({ type: "text", name: "postal_address" })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(10,512)
  postalAddress: string;

  @OneToMany(
    () => RatingUserEpisode,
    (ratingUserEpisode) => ratingUserEpisode.user
  )
  ratingUserEpisodes: RatingUserEpisode[];

  @OneToMany(() => RatingUserMovie, (ratingUserMovie) => ratingUserMovie.user)
  ratingUserMovies: RatingUserMovie[];



  @OneToMany(
    () => StatusUserEpisode,
    (statusUserEpisode) => statusUserEpisode.user
  )
  statusUserEpisodes: StatusUserEpisode[];

  @OneToMany(() => StatusUserMovie, (statusUserMovie) => statusUserMovie.user)
  statusUserMovies: StatusUserMovie[];
}
