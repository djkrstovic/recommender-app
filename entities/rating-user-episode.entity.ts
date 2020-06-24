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

@Index("fk_rating_user_episode_episode_id", ["episodeId"], {})
@Index("fk_rating_user_episode_user_id", ["userId"], {})
@Entity("rating_user_episode")
export class RatingUserEpisode {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "rating_user_episode_id",
    unsigned: true,
  })
  ratingUserEpisodeId: number;

  @Column({ name: "user_id", unsigned: true })
  userId: number;

  @Column({ type: "int", name: "episode_id", unsigned: true })
  episodeId: number;

  @Column({
    type: "enum",
    name: "rating",
    nullable: true,
    enum: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  })
  rating: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | null;

  @ManyToOne(() => Episode, (episode) => episode.ratingUserEpisodes, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "episode_id", referencedColumnName: "episodeId" }])
  episode: Episode;

  @ManyToOne(() => User, (user) => user.ratingUserEpisodes, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: User;
}
