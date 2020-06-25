import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Movie } from "./movie.entity";

@Index("fk_photo_movie_movie", ["movieId"], {})
@Index("uq_photo_movie_image_path", ["imagePath"], { unique: true })
@Entity("photo_movie")
export class PhotoMovie {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "photo_movie_id",
    unsigned: true,
  })
  photoMovieId: number;

  @Column({ type: "int", name: "movie_id", unsigned: true })
  movieId: number;

  @Column({
    type: "varchar",
    name: "image_path",
    nullable: true,
    unique: true,
    length: 128,
  })
  imagePath: string | null;

  @ManyToOne(() => Movie, (movie) => movie.photoMovies, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "movie_id", referencedColumnName: "movieId" }])
  movie: Movie;
}
