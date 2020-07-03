import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TvSeries } from "./tv-series.entity";
import * as Validator from 'class-validator';

@Index("fk_photo_tv_series_tv_series", ["tvSeriesId"], {})
@Index("uq_photo_tv_series_image_path", ["imagePath"], { unique: true })
@Entity("photo_tv_series")
export class PhotoTvSeries {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "photo_tv_series_id",
    unsigned: true,
  })
  photoTvSeriesId: number;

  @Column({ type: "int", name: "tv_series_id", unsigned: true })
  tvSeriesId: number;

  @Column({
    type: "varchar",
    name: "image_path",
    nullable: true,
    unique: true,
    length: 128,
  })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(3, 128)
  imagePath: string | null;

  @ManyToOne(() => TvSeries, (tvSeries) => tvSeries.photoTvSeries, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "tv_series_id", referencedColumnName: "tvSeriesId" }])
  tvSeries: TvSeries;
}
