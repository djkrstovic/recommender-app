import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Episode } from "./episode.entity";
import * as Validator from 'class-validator';

@Index("fk_photo_episode_episode", ["episodeId"], {})
@Index("uq_photo_episode_image_path", ["imagePath"], { unique: true })
@Entity("photo_episode")
export class PhotoEpisode {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "photo_episode_id",
    unsigned: true,
  })
  photoEpisodeId: number;

  @Column({ type: "int", name: "episode_id", unsigned: true })
  episodeId: number;

  @Column({
    type:"varchar",
    name: "image_path",
    nullable: true,
    unique: true,
    length: 128,
  })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(3, 128)
  imagePath: string | null;

  @ManyToOne(() => Episode, (episode) => episode.photoEpisodes, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "episode_id", referencedColumnName: "episodeId" }])
  episode: Episode;
}
