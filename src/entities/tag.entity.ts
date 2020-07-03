import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TagEpisode } from "./tag-episode.entity";
import { TagMovie } from "./tag-movie.entity";
import * as Validator from 'class-validator';

@Index("uq_tag_tag_name", ["tagName"], { unique: true })
@Entity("tag")
export class Tag {
  @PrimaryGeneratedColumn({ type: "int", name: "tag_id", unsigned: true })
  tagId: number;

  @Column({
    type: "varchar",
    name: "tag_name",
    unique: true,
    length: 64
  })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(3, 64)
  tagName: string;

  @OneToMany(() => TagEpisode, (tagEpisode) => tagEpisode.tag)
  tagEpisodes: TagEpisode[];

  @OneToMany(() => TagMovie, (tagMovie) => tagMovie.tag)
  tagMovies: TagMovie[];
}
