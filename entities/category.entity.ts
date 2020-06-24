import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Movie } from "./movie.entity";
import { TvSeries } from "./tv-series.entity";

@Entity("category")
export class Category {
  @PrimaryGeneratedColumn({ type: "int", name: "category_id", unsigned: true })
  categoryId: number;

  @Column({ type: "varchar", length: 64 })
  name: string;

  @OneToMany(() => Movie, (movie) => movie.category)
  movies: Movie[];

  @OneToMany(() => TvSeries, (tvSeries) => tvSeries.category)
  tvSeries: TvSeries[];
}
