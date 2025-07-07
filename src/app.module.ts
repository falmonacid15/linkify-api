import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './core/auth/auth.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { PostsModule } from './modules/posts/posts.module';
import { APP_PIPE } from '@nestjs/core';
import { InterestsModule } from './modules/interests/interests.module';
import { FriendshipsModule } from './modules/friendships/friendships.module';
import { CommentsModule } from './modules/comments/comments.module';
import { ReactionsModule } from './modules/reactions/reactions.module';
import { RepostsModule } from './modules/reposts/reposts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    NotificationsModule,
    ProfilesModule,
    PostsModule,
    InterestsModule,
    FriendshipsModule,
    CommentsModule,
    ReactionsModule,
    RepostsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
