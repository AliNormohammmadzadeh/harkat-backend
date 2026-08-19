import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'elahe', description: 'نام کاربری (حروف کوچک)' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'elahe1234', description: 'رمز عبور' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
