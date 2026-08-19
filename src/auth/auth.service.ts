import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { getAllRolePermissions, getPermissions, ROLE_LABELS } from '../common/auth/permissions';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async login(username: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { username: username.toLowerCase().trim() },
    });
    if (!user || !user.isActive) {
      throw new UnauthorizedException('نام‌کاربری یا رمز عبور اشتباه است');
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      throw new UnauthorizedException('نام‌کاربری یا رمز عبور اشتباه است');
    }

    const payload = { sub: user.id, username: user.username, role: user.role };
    const accessToken = await this.jwt.signAsync(payload);

    const permissions = getPermissions(user.role);

    return {
      accessToken,
      user: {
        id: user.id,
        username: user.username,
        name: user.fullName,
        initials: user.initials,
        role: user.role,
        roleLabel: ROLE_LABELS[user.role],
        permissions,
      },
    };
  }

  async me(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user || !user.isActive) {
      throw new UnauthorizedException();
    }
    return {
      id: user.id,
      username: user.username,
      name: user.fullName,
      initials: user.initials,
      role: user.role,
      roleLabel: ROLE_LABELS[user.role],
      permissions: getPermissions(user.role),
    };
  }

  getPermissionsForRole(role: string) {
    return getPermissions(role);
  }

  listAllRolePermissions() {
    return getAllRolePermissions();
  }
}
