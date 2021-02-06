import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksController } from './tasks/tasks.controller';
import { TasksService } from './tasks/tasks.service';
import { TasksModule } from './tasks/tasks.module';
import { PfeModule } from './pfes/pfe.module';



@Module({
  imports: [AuthModule,
    UsersModule,
    MongooseModule.forRoot('mongodb+srv://admin:vyNTZ6aMhtqK7Pkg@cluster0.aupcn.mongodb.net/sitepfe?retryWrites=true&w=majority'),
    TasksModule,
    PfeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
