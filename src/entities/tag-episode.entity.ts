import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Episode } from "./episode.entity";
import { Tag } from "./tag.entity";

@Index("fk_tag_episode_tag_id", ["tagId"], {})
@Index("fk_tag_episode_episode_id", ["episodeId"], {})
@Entity("tag_episode")
export class TagEpisode {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "tag_episode_id",
    unsigned: true,
  })
  tagEpisodeId: number;

  @Column({ type: "int", name: "episode_id", unsigned: true })
  episodeId: number;

  @Column({ type: "int", name: "tag_id", unsigned: true })
  tagId: number;

  @ManyToOne(() => Episode, (episode) => episode.tagEpisodes, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "episode_id", referencedColumnName: "episodeId" }])
  episode: Episode;

  @ManyToOne(() => Tag, (tag) => tag.tagEpisodes, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "tag_id", referencedColumnName: "tagId" }])
  tag: Tag;
}
