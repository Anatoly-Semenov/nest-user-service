import { CreateUserDto } from './';
import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class ResponseUserDto extends CreateUserDto {
  @IsOptional()
  @Type(() => Number)
  id: number;
}
