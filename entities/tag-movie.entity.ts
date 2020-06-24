import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Movie } from "./movie.entity";
import { Tag } from "./tag.entity";

@Index("fk_tag_movie_tag_id", ["tagId"], {})
@Index("fk_tag_movie_movie_id", ["movieId"], {})
@Entity("tag_movie")
export class TagMovie {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "tag_movies_id",
    unsigned: true,
  })
  tagMoviesId: number;

  @Column({ type: "int", name: "movie_id", unsigned: true})
  movieId: number;

  @Column({ type: "int", name: "tag_id", unsigned: true })
  tagId: number;

  @ManyToOne(() => Movie, (movie) => movie.tagMovies, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "movie_id", referencedColumnName: "movieId" }])
  movie: Movie;

  @ManyToOne(() => Tag, (tag) => tag.tagMovies, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "tag_id", referencedColumnName: "tagId" }])
  tag: Tag;
}
