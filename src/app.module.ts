import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DashboardModule } from './dashboard/dashboard.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';


@Module({
  imports: [AuthModule,
    UsersModule,
    MongooseModule.forRoot('mongodb+srv://admin:vyNTZ6aMhtqK7Pkg@cluster0.aupcn.mongodb.net/sitepfe?retryWrites=true&w=majority'),
    DashboardModule,
    MailerModule.forRoot({
      transport: 'smtps://user@domain.com:pass@smtp.domain.com',
      defaults: {
        from:'"No Reply"  <modules@nestjs.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
