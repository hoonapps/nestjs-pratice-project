import { CreateMovieDto } from './create-movie.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {}

// @IsNotEmpty()
// @IsString()
// @IsOptional()
// title?: string;

// @IsNotEmpty()
// @IsString()
// @IsOptional()
// detail?: string;

// @IsNotEmpty()
// @IsNumber()
// @IsOptional()
// directorId?: number;

// @IsArray()
// @ArrayNotEmpty()
// @IsNumber(
//   {},
//   {
//     each: true,
//   },
// )
// @IsOptional()
// genreIds?: number[];
