import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, ClassSerializerInterceptor, ParseIntPipe, BadRequestException, Request, UseGuards } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieTitleValidationPipe } from './pipe/movie-title-vaildation';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Public } from 'src/auth/decorator/public.decorator';
import { RBAC } from 'src/auth/decorator/rbac.decorator';
import { Role } from 'src/user/entities/user.entity';

@Controller('movie')
@UseInterceptors(ClassSerializerInterceptor)
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Public()
  @Get()
  getMovies(
    @Query('title', MovieTitleValidationPipe) title?: string, //
  ) {
    return this.movieService.findAll(title);
  }

  @Public()
  @Get(':id')
  getMovie(
    @Param('id', ParseIntPipe)
    id: number, //
  ) {
    return this.movieService.findOne(id);
  }

  @RBAC(Role.admin)
  @Post()
  @UseGuards(AuthGuard)
  postMovie(@Body() body: CreateMovieDto) {
    return this.movieService.create(body);
  }

  @RBAC(Role.admin)
  @Patch(':id')
  patchMovie(
    @Param('id', ParseIntPipe) id: number, //
    @Body() body: UpdateMovieDto,
  ) {
    return this.movieService.update(id, body);
  }

  @RBAC(Role.admin)
  @Delete(':id')
  deleteMovie(
    @Param('id', ParseIntPipe) id: number, //
  ) {
    return this.movieService.delete(id);
  }
}
