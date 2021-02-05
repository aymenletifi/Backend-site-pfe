import { Controller, Get } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Controller('users-contoller')
export class UsersContollerController {

    constructor(private usersService : UsersService){};

    @Get('students')
    getStudents(){
        return this.usersService.findStudents();
    }

    @Get('professors')
    getProfessors(){
        return this.usersService.findProfessors();
    }

    @Get('admins')
    getAdmins(){
        return this.usersService.findAdmins();
    }

    
}
