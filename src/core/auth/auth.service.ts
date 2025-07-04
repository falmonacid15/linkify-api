import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../modules/users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from '../../utils/password';
import { createPayload } from '../../utils/payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: SignInDto) {
    const user = await this.usersService.findOne({ email: data.email });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await comparePassword(data.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = createPayload(user);

    const token = this.jwtService.sign(payload);
    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        biography: user.biography,
        avatarUrl: user.avatarUrl,
        coverUrl: user.coverUrl,
        interest: user.interests,
      },
    };
  }
}
