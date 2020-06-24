import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RatingUserEpisode } from "./rating-user-episode.entity";
import { RatingUserMovie } from "./rating-user-movie.entity";
import { StatusUserEpisode } from "./status-user-episode.entity";
import { StatusUserMovie } from "./status-user-movie.entity";

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
  email: string;

  @Column({
    type: "varchar",
    name: "password_hash",
    length: 128
  })
  passwordHash: string;

  @Column({ type: "varchar", name: "forename", length: 64})
  forename: string;

  @Column({ type: "varchar", name: "surname", length: 64 })
  surname: string;

  @Column({
    type: "varchar",
    name: "phone_number",
    unique: true,
    length: 24
  })
  phoneNumber: string;

  @Column({ type: "text", name: "postal_address" })
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
