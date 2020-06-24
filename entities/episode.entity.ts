import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TvSeries } from "./tv-series.entity";
import { RatingUserEpisode } from "./rating-user-episode.entity";
import { StatusUserEpisode } from "./status-user-episode.entity";
import { TagEpisode } from "./tag-episode.entity";

@Index("fk_episode_tv_series_id", ["tvSeriesId"], {})
@Entity("episode")
export class Episode {
  @PrimaryGeneratedColumn({ type: "int", name: "episode_id", unsigned: true })
  episodeId: number;

  @Column({ type: "varchar", name: "image_path", nullable: true, length: 128 })
  imagePath: string | null;

  @Column({ type: "varchar", name: "title_srb", nullable: true, length: 64 })
  titleSrb: string | null;

  @Column({ type: "varchar", name: "title_eng", nullable: true, length: 64 })
  titleEng: string | null;

  @Column({ type: "text", name: "synopsis", nullable: true })
  synopsis: string | null;

  @Column({ type: "int", name: "season", unsigned: true })
  season: number;

  @Column({ type: "int", name: "season_episode", unsigned: true })
  seasonEpisode: number;

  @Column({ type: "int", name: "tv_series_id", unsigned: true })
  tvSeriesId: number;

  @ManyToOne(() => TvSeries, (tvSeries) => tvSeries.episodes, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "tv_series_id", referencedColumnName: "tvSeriesId" }])
  tvSeries: TvSeries;

  @OneToMany(
    () => RatingUserEpisode,
    (ratingUserEpisode) => ratingUserEpisode.episode
  )
  ratingUserEpisodes: RatingUserEpisode[];

  @OneToMany(
    () => StatusUserEpisode,
    (statusUserEpisode) => statusUserEpisode.episode
  )
  statusUserEpisodes: StatusUserEpisode[];

  @OneToMany(() => TagEpisode, (tagEpisode) => tagEpisode.episode)
  tagEpisodes: TagEpisode[];
}
