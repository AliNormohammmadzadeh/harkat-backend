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

export class LoginResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  accessToken: string;

  @ApiProperty({
    example: {
      id: 'uuid',
      username: 'elahe',
      name: 'الهه محمدی‌فرد',
      initials: 'ا.م',
      role: 'facilitator',
      roleLabel: 'تسهیلگر رشد',
    },
  })
  user: {
    id: string;
    username: string;
    name: string;
    initials: string | null;
    role: string;
    roleLabel: string;
  };
}

export class MeResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ example: 'elahe' })
  username: string;

  @ApiProperty({ example: 'الهه محمدی‌فرد' })
  name: string;

  @ApiProperty({ example: 'ا.م', nullable: true })
  initials: string | null;

  @ApiProperty({ enum: ['super_admin', 'manager', 'facilitator', 'supporter'] })
  role: string;

  @ApiProperty({ example: 'تسهیلگر رشد' })
  roleLabel: string;
}

export class OkResponseDto {
  @ApiProperty({ example: true })
  ok: boolean;
}
