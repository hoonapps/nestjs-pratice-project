import { Exclude, Expose } from 'class-transformer';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm';
import { BaseTable } from '../../common/entity/base.entity';
import { MovieDetail } from './movie-detail.entity';
import { Director } from 'src/director/entity/director.entity';
import { Genre } from 'src/genre/entities/genre.entity';

@Entity()
export class Movie extends BaseTable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  title: string;

  @OneToOne(
    () => MovieDetail, //
    (movieDetail) => movieDetail.id,
    {
      cascade: true,
      nullable: false,
    },
  )
  @JoinColumn()
  detail: MovieDetail;

  @ManyToOne(
    () => Director, //
    (director) => director.id,
    {
      cascade: true,
      nullable: false,
    },
  )
  director: Director;

  @ManyToMany(
    () => Genre, //
    (gerne) => gerne.movies,
    {
      cascade: true,
    },
  )
  @JoinTable()
  genres: Genre[];
}
