import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TagMovie } from "./tag-movie.entity";
import { TagTvSeries } from "./tag-tv-series.entity";

@Index("uq_tag_tag_name", ["tagName"], { unique: true })
@Entity("tag")
export class Tag {
  @PrimaryGeneratedColumn({ type: "int", name: "tag_id", unsigned: true})
  tagId: number;

  @Column({
    type: "varchar",
    name: "tag_name",
    unique: true,
    length: 64
  })
  tagName: string;

  @OneToMany(() => TagMovie, (tagMovie) => tagMovie.tag)
  tagMovies: TagMovie[];

  @OneToMany(() => TagTvSeries, (tagTvSeries) => tagTvSeries.tag)
  tagTvSeries: TagTvSeries[];
}
