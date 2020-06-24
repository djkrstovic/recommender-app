import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./category.entity";
import { Genre } from "./genre.entity";
import { RatingUserMovie } from "./rating-user-movie.entity";
import { StatusUserMovie } from "./status-user-movie.entity";
import { TagMovie } from "./tag-movie.entity";

@Index("fk_movie_category_id", ["categoryId"], {})
@Index("fk_movie_genre_id", ["genreId"], {})
@Entity("movie")
export class Movie {
  @PrimaryGeneratedColumn({ type: "int", name: "movie_id", unsigned: true })
  movieId: number;

  @Column({ type: "varchar", name: "image_path", nullable: true, length: 128 })
  imagePath: string | null;

  @Column({ type: "varchar", name: "title_srb", nullable: true, length: 64 })
  titleSrb: string | null;

  @Column({ type: "varchar", name: "title_eng", nullable: true, length: 64 })
  titleEng: string | null;

  @Column({ type: "varchar", name: "director", nullable: true, length: 64 })
  director: string | null;

  @Column({ type: "text", name: "synopsis", nullable: true })
  synopsis: string | null;

  @Column({ type: "int", name: "category_id", unsigned: true })
  categoryId: number;

  @Column({ type: "int", name: "genre_id", unsigned: true })
  genreId: number;

  @ManyToOne(() => Category, (category) => category.movies, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "category_id", referencedColumnName: "categoryId" }])
  category: Category;

  @ManyToOne(() => Genre, (genre) => genre.movies, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "genre_id", referencedColumnName: "genreId" }])
  genre: Genre;

  @OneToMany(() => RatingUserMovie, (ratingUserMovie) => ratingUserMovie.movie)
  ratingUserMovies: RatingUserMovie[];

  @OneToMany(() => StatusUserMovie, (statusUserMovie) => statusUserMovie.movie)
  statusUserMovies: StatusUserMovie[];

  @OneToMany(() => TagMovie, (tagMovie) => tagMovie.movie)
  tagMovies: TagMovie[];
}
