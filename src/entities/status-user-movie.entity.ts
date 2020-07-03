import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Movie } from "./movie.entity";
import { User } from "./user.entity";
import * as Validator from 'class-validator';

@Index("fk_status_user_movie_movie_id", ["movieId"], {})
@Index("fk_status_user_movie_user_id", ["userId"], {})
@Entity("status_user_movie")
export class StatusUserMovie {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "status_user_movie_id",
    unsigned: true,
  })
  statusUserMovieId: number;

  @Column({ type: "int", name: "user_id", unsigned: true })
  userId: number;

  @Column({ type: "int", name: "movie_id", unsigned: true })
  movieId: number;

  @Column({
    type: "enum",
    name: "status",
    enum: ["gledao", "zeli da gleda", "ne zeli da gleda"],
  })
  @Validator.IsNotEmpty()
  @Validator.IsIn(["gledao", "zeli da gleda", "ne zeli da gleda"])
  status: "gledao" | "zeli da gleda" | "ne zeli da gleda";

  @ManyToOne(() => Movie, (movie) => movie.statusUserMovies, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "movie_id", referencedColumnName: "movieId" }])
  movie: Movie;

  @ManyToOne(() => User, (user) => user.statusUserMovies, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: User;
}
