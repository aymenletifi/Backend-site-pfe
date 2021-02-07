import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Query, Types } from 'mongoose';
import { PfeDto } from 'src/dto/pfe.dto';
import { Pfe, PfeDocument } from './schemas/pfe.schema';

@Injectable()
export class PfeService {
    constructor(@InjectModel(Pfe.name) private pfeModel: Model<PfeDocument>) { }

    async findAll(): Promise<Pfe[] | undefined> {
        return this.pfeModel.find({}, { __v: false });
    }

    async createPfe(pfe: PfeDto): Promise<any> {
        let p: any = pfe;
        delete p["_id"];
        const createdPfe = new this.pfeModel(p);
        return { id: (await createdPfe.save()).id };
    }

    async deletePfe(id: string): Promise<any> {
        return this.pfeModel.deleteOne({_id: id}).exec();
    }

    async updatePfe(id: string, task: PfeDto): Promise<any> {
        let a : any = task;
        //a.tasks = a.tasks.map(v => Types.ObjectId(v));
        return this.pfeModel.updateOne({_id: id}, a).exec();
    }

    async findByStudentId(sid: string): Promise<Pfe | undefined> {
        return this.pfeModel.findOne({ student: Types.ObjectId(sid) }, { __v: false });
    }

    async findBySupervisorId(sid: string): Promise<Pfe | undefined> {
        return this.pfeModel.findOne({ supervisor: Types.ObjectId(sid) }, { __v: false });
    }
}
