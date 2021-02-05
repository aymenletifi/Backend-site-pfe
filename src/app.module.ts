import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DashboardModule } from './dashboard/dashboard.module';



@Module({
  imports: [AuthModule,
    UsersModule,
    MongooseModule.forRoot('mongodb+srv://admin:vyNTZ6aMhtqK7Pkg@cluster0.aupcn.mongodb.net/sitepfe?retryWrites=true&w=majority'),
    DashboardModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
