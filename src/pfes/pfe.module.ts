import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Pfe, PfeSchema } from './schemas/pfe.schema';
import { PfeController } from './pfe.controller';
import { PfeService } from './pfe.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Pfe.name, schema: PfeSchema }])],
    providers: [PfeService],
    controllers: [PfeController],
    exports: [PfeService],
})
export class PfeModule {}
