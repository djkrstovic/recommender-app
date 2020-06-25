import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { TvSeries } from "./tv-series.entity";
import { RatingUserEpisode } from "./rating-user-episode.entity";
import { StatusUserEpisode } from "./status-user-episode.entity";
import { TagEpisode } from "./tag-episode.entity";
import { Tag } from "./tag.entity";
import { PhotoEpisode } from "./photo-episode.entity";

@Index("fk_episode_tv_series_id", ["tvSeriesId"], {})
@Entity("episode")
export class Episode {
  @PrimaryGeneratedColumn({ type: "int", name: "episode_id", unsigned: true })
  episodeId: number;

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

  @OneToMany(() => PhotoEpisode, (photoEpisode) => photoEpisode.episode)
  photoEpisodes: PhotoEpisode[];

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

  @ManyToMany(type => Tag)
  @JoinTable({
    name: 'tag_episode',
    joinColumn: { name: 'episode_id', referencedColumnName: 'episodeId' },
    inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'tagId' },
  })
  tag: Tag[];

  @OneToMany(() => TagEpisode, (tagEpisode) => tagEpisode.episode)
  tagEpisodes: TagEpisode[];
}
