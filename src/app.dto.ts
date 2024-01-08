import { IsString } from 'class-validator';

export class Mail {
  @IsString()
  title: string;
  @IsString()
  body: string;
}
