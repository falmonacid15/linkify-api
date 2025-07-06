import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseFilters,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { PrismaExceptionFilter } from '../filters/prisma-exception.filter';

@UseFilters(PrismaExceptionFilter)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() data: SignInDto) {
    return this.authService.login(data);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() data: SignUpDto) {
    return this.authService.register(data);
  }
}
