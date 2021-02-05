import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:vyNTZ6aMhtqK7Pkg@cluster0.aupcn.mongodb.net/sample_mflix?retryWrites=true&w=majority'),
    DashboardModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
//vyNTZ6aMhtqK7Pkg