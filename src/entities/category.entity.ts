import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Movie } from "./movie.entity";
import { TvSeries } from "./tv-series.entity";
import * as Validator from 'class-validator';

@Entity("category")
export class Category {
  @PrimaryGeneratedColumn({ type: "int", name: "category_id", unsigned: true })
  categoryId: number;

  @Column({ type: "varchar", name: "name", length: 64 })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(3, 64)
  name: string;

  @OneToMany(() => Movie, (movie) => movie.category)
  movies: Movie[];

  @OneToMany(() => TvSeries, (tvSeries) => tvSeries.category)
  tvSeries: TvSeries[];
}
