import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Movie } from "./movie.entity";
import { TvSeries } from "./tv-series.entity";

@Entity("genre")
export class Genre {
  @PrimaryGeneratedColumn({ type: "int", name: "genre_id", unsigned: true })
  genreId: number;

  @Column({ type: "varchar", name: "name", nullable: true, length: 64 })
  name: string | null;

  @OneToMany(() => Movie, (movie) => movie.genre)
  movies: Movie[];

  @OneToMany(() => TvSeries, (tvSeries) => tvSeries.genre)
  tvSeries: TvSeries[];
}
