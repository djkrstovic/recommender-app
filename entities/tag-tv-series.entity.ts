import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Tag } from "./tag.entity";
import { TvSeries } from "./tv-series.entity";

@Index("fk_tag_tv_series_tag_id", ["tagId"], {})
@Index("fk_tag_tv_series_tv_series_id", ["tvSeriesId"], {})
@Entity("tag_tv_series")
export class TagTvSeries {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "tag_tv_series_id",
    unsigned: true
  })
  tagTvSeriesId: number;

  @Column({ type: "int", name: "tv_series_id", unsigned: true})
  tvSeriesId: number;

  @Column({ type: "int", name: "tag_id", unsigned: true})
  tagId: number;

  @ManyToOne(() => Tag, (tag) => tag.tagTvSeries, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "tag_id", referencedColumnName: "tagId" }])
  tag: Tag;

  @ManyToOne(() => TvSeries, (tvSeries) => tvSeries.tagTvSeries, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "tv_series_id", referencedColumnName: "tvSeriesId" }])
  tvSeries: TvSeries;
}
