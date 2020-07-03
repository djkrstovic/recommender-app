import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Episode } from "./episode.entity";
import { Category } from "./category.entity";
import { Genre } from "./genre.entity";
import { PhotoTvSeries } from "./photo-tv-series.entity";
import * as Validator from 'class-validator';

@Index("fk_tv_series_category_id", ["categoryId"], {})
@Index("fk_tv_series_genre_id", ["genreId"], {})
@Entity("tv_series")
export class TvSeries {
  @PrimaryGeneratedColumn({ type: "int", name: "tv_series_id", unsigned: true })
  tvSeriesId: number;

  @Column({ type: "varchar", name: "title_srb", nullable: true, length: 64 })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(3, 64)
  titleSrb: string | null;

  @Column({ type: "varchar", name: "title_eng", nullable: true, length: 64 })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(3, 64)
  titleEng: string | null;

  @Column({ type: "varchar", name: "director", nullable: true, length: 64 })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(3, 64)
  director: string | null;

  @Column({ type: "text", name: "synopsis", nullable: true })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(10, 10000)
  synopsis: string | null;

  @Column({ type: "int", name: "category_id", unsigned: true })
  categoryId: number;

  @Column({ type: "int", name: "genre_id", unsigned: true })
  genreId: number;

  @OneToMany(() => Episode, (episode) => episode.tvSeries)
  episodes: Episode[];

  @OneToMany(() => PhotoTvSeries, (photoTvSeries) => photoTvSeries.tvSeries)
  photoTvSeries: PhotoTvSeries[];

  @ManyToOne(() => Category, (category) => category.tvSeries, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "category_id", referencedColumnName: "categoryId" }])
  category: Category;

  @ManyToOne(() => Genre, (genre) => genre.tvSeries, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "genre_id", referencedColumnName: "genreId" }])
  genre: Genre;
}
