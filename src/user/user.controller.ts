import { Body, Controller, Get, Param, Post, Put, Delete, NotFoundException } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { CreateUserDto } from "./dto/createUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { UserEntity } from "./user.entity";
import { v4 as uuid } from 'uuid';
import { UserListDto } from "./dto/userList.dto";

@Controller('/users')
export class UserController {
    constructor(private userRepository: UserRepository) {}

    @Get()
    async getUsers() {
        const users = this.userRepository.getUsers();
        return (await users).map(user => new UserListDto(user.id, user.name, user.email));
    }

    @Post()
    async createUser(@Body() userdata: CreateUserDto) {
        const userEntity = new UserEntity();
        
        userEntity.name = userdata.name;
        userEntity.email = userdata.email;
        userEntity.password = userdata.password;
        userEntity.id = uuid();
        
        this.userRepository.createUser(userEntity);
        return { 
            user: new UserListDto(userEntity.id, userEntity.name, userEntity.email), message: 'User created successfully' };
    }

    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() userdata: UpdateUserDto) {
        

        const updatedUser = await this.userRepository.updateUser(id, userdata);

        return {
            user: updatedUser, 
            message: 'User updated successfully'
        }
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {

        const deletedUser = await this.userRepository.deleteUser(id);

        return {
            user: deletedUser,
            message: 'User deleted successfully'
        }   
    }

}

function uuidv4(): any {
    throw new Error("Function not implemented.");
}
