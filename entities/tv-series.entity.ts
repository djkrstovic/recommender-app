import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Episode } from "./episode.entity";
import { TagTvSeries } from "./tag-tv-series.entity";
import { Category } from "./category.entity";
import { Genre } from "./genre.entity";

@Index("fk_tv_series_category_id", ["categoryId"], {})
@Index("fk_tv_series_genre_id", ["genreId"], {})
@Entity("tv_series")
export class TvSeries {
  @PrimaryGeneratedColumn({ type: "int", name: "tv_series_id", unsigned: true })
  tvSeriesId: number;

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

  @OneToOne(() => Episode, (episode) => episode.tvSeries)
  episode: Episode;

  @OneToMany(() => TagTvSeries, (tagTvSeries) => tagTvSeries.tvSeries)
  tagTvSeries: TagTvSeries[];

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
