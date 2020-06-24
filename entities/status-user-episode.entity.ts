import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Episode } from "./episode.entity";
import { User } from "./user.entity";

@Index("fk_status_user_episode_episode_id", ["episodeId"], {})
@Index("fk_status_user_episode_user_id", ["userId"], {})
@Entity("status_user_episode")
export class StatusUserEpisode {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "status_user_episode_id",
    unsigned: true,
  })
  statusUserEpisodeId: number;

  @Column({ type: "int", name: "user_id", unsigned: true })
  userId: number;

  @Column({ type: "int", name: "episode_id", unsigned: true })
  episodeId: number;

  @Column({
    type: "enum", 
    name: "status",
    enum: ["gledao", "zeli da gleda", "ne zeli da gleda"],
  })
  status: "gledao" | "zeli da gleda" | "ne zeli da gleda";

  @ManyToOne(() => Episode, (episode) => episode.statusUserEpisodes, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "episode_id", referencedColumnName: "episodeId" }])
  episode: Episode;

  @ManyToOne(() => User, (user) => user.statusUserEpisodes, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: User;
}
