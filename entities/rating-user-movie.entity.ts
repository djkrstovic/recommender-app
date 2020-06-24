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

@Index("fk_rating_user_movie_movie_id", ["movieId"], {})
@Index("fk_rating_user_movie_user_id", ["userId"], {})
@Entity("rating_user_movie")
export class RatingUserMovie {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "rating_user_movie_id",
    unsigned: true,
  })
  ratingUserMovieId: number;

  @Column({ type: "int", name: "user_id", unsigned: true})
  userId: number;

  @Column({ type: "int", name: "movie_id", unsigned: true})
  movieId: number;

  @Column({
    type: "enum",
    name: "rating",
    nullable: true,
    enum: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  })
  rating: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | null;

  @ManyToOne(() => Movie, (movie) => movie.ratingUserMovies, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "movie_id", referencedColumnName: "movieId" }])
  movie: Movie;

  @ManyToOne(() => User, (user) => user.ratingUserMovies, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: User;
}
