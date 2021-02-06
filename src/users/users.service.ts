import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { userDTO } from './user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username: username });
  }

  async findStudents() :  Promise<User[] | undefined> {
    return this.userModel.find({ role:'student'});
  }

  async findProfessors() : Promise<User[] | undefined>{
    return this.userModel.find({role : 'professor'});
  } 
  async findAdmins() : Promise <User[] | undefined>{
    return this.userModel.find({role : 'admin'})
  }

  async deleteUser(identity : number){
    const result =  this.userModel.remove({_id : identity});
    if (result == null){
      return 'User not Found';
    }
  }

  async findUser(identity : number){
    return this.userModel.findOne({_id : identity});
  }

  async addUser(user : User){
    this.userModel.create(user);
  }

  async addStudent(student : userDTO){
    student.passwd = await bcrypt.hash(student.passwd, await bcrypt.genSalt());
    student.role = 'student';
    this.userModel.create(student); 
  }

  async addProfessor(professor : userDTO){
    professor.passwd = await bcrypt.hash(professor.passwd, await bcrypt.genSalt());
    professor.role = 'professor';
    this.userModel.create(professor); 
  }

}