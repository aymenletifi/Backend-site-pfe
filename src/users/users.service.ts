import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { userDTO } from './user.dto';
import * as bcrypt from 'bcrypt';
import {generate} from 'generate-password' ; 
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument> ,private readonly mailerService: MailerService) { }

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
    var password = generate({
      length: 10,
      numbers: true
    });
    student.passwd = await bcrypt.hash(password, await bcrypt.genSalt());
    student.role = 'student';
    this.userModel.create(student); 
    
  }

  async addAdmin(admin : userDTO){
    var password = generate({
      length: 10,
      numbers: true
    });
    admin.passwd = await bcrypt.hash(password, await bcrypt.genSalt());
    admin.role = 'admin';
    this.userModel.create(admin);

  }

  async addProfessor(professor : userDTO){
    var password = generate({
      length: 10,
      numbers: true
    });
    this
      .mailerService
      .sendMail({
        to: 'test@nestjs.com', // list of receivers
        from: 'noreply@nestjs.com', // sender address
        subject: 'Creation de Compte', 
        text: 'welcome', 
        html: `<b>Bonjour , vous trouverez ci-joint votre mot de passe temporaire</b> $(password)`, // HTML body content
      })
    professor.passwd = await bcrypt.hash(password, await bcrypt.genSalt());
    professor.role = 'professor';
    this.userModel.create(professor); 
    
  }

}