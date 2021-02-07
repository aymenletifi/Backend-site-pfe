import { Controller, Get, Param, Delete, Post, Body, Put } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { userDTO } from '../user.dto';


@Controller('users')
export class UsersContollerController {

    constructor(private usersService : UsersService){};

    @Get('students')
    getStudents(){
        return this.usersService.findStudents();
    }

    @Get('students/:id')
    getStudentById(@Param('id') id: string) {
        return this.usersService.findStudentById(id);
    }

    @Get('professors')
    getProfessors(){
        return this.usersService.findProfessors();
    }

    @Get('professors/:id')
    getProfessorById(@Param('id') id: string) {
        return this.usersService.findProfessorById(id);
    }

    @Get('admins')
    getAdmins(){
        return this.usersService.findAdmins();
    }

    @Delete(':id')
    removeUser(@Param('id') id){
        this.usersService.deleteUser(id);
    }

    @Post('addStudent')
    addStudent(@Body() userDto : userDTO){
        this.usersService.addStudent(userDto);
    }

    @Post('addProfessor')
    addProfessor(@Body() userDto : userDTO){
        this.usersService.addProfessor(userDto);
    }

    @Put(':id')
    updateUser(@Param('id') id, @Body() user : Partial<userDTO>
    ){
       // this.usersService. create update method in db
    }

}
