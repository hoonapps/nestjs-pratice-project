import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  findAll() {
    return this.genreRepository.find();
  }

  findOne(id: number) {
    return this.genreRepository.findOne({
      where: {
        id,
      },
    });
  }

  create(createGenreDto: CreateGenreDto) {
    return this.genreRepository.save({
      ...createGenreDto,
    });
  }

  async update(id: number, updateGenreDto: UpdateGenreDto) {
    const genre = await this.genreRepository.findOne({
      where: {
        id,
      },
    });

    if (!genre) {
      throw new NotFoundException('존재하지 않는 장르입니다.');
    }

    await this.genreRepository.update(
      {
        id,
      },
      {
        ...updateGenreDto,
      },
    );

    const newGenre = this.genreRepository.findOne({
      where: {
        id,
      },
    });

    return newGenre;
  }

  async remove(id: number) {
    const genre = await this.genreRepository.findOne({
      where: {
        id,
      },
    });

    if (!genre) {
      throw new NotFoundException('존재하지 않는 장르입니다.');
    }

    await this.genreRepository.delete(id);

    return id;
  }
}
