import { Injectable, NotFoundException, ConflictException } from "@nestjs/common";
import { UserEntity } from "./user.entity";
import db, { Prisma } from "../../prisma/db";

@Injectable()
export class UserRepository {
    private async searchUserById(id: string) {
        try {
            const user = await db.user.findUnique({
                where: {
                    id: id,
                }
            });
            return user !== null;
        } catch (error) {
            throw new NotFoundException('User not found');
        }
    }

    async getUsers() {
        try {

            const users = await db.user.findMany();
            return users;
        } catch (error) {
            throw new Error('Failed to get users');
        }
    }

    async createUser(userdata: UserEntity) {
        try {
            const user = await db.user.create({
                data: {
                    name: userdata.name,
                    email: userdata.email,
                    password: userdata.password,
                }
            });
            return user;
        } catch (error) {   
            throw new ConflictException('User with this email already exists');
        }
    }

    async userExists(email: string) {
        try {
            const user = await db.user.findUnique({
                where: {
                    email: email,
                }});
            return user !== null;
        } catch (error) {
            throw new ConflictException('User with this email already exists');
        }
    }

    async updateUser(id: string, updateDataUser: Partial<UserEntity>) {
        const updateUser = await this.searchUserById(id);
        
        if(!updateUser) {
            throw new NotFoundException('User not found');
        }

        try {
            const user = await db.user.update({
                where: {
                    id: id,
                },
                data: {
                    name: updateDataUser.name,
                    email: updateDataUser.email,
                    password: updateDataUser.password,
                }
            });
            return user !== null;
        } catch (error) {
            throw new NotFoundException('Unable to update user');
        }
    }


        /*Object.entries(updateDataUser).forEach(([key, value]) => {
            if(key === 'id') return;
            
            if(value !== undefined && value !== null && value !== '') {
                userIndex[key] = value;
            }
        })

        return userIndex;
    }*/
    

    async deleteUser(id: string) {
        const userIndex = this.searchUserById(id);
        
        if(!userIndex) {
            throw new NotFoundException('User not found');
        }
        try {
            await db.user.delete({
                where: {
                    id: id,
                }
            });
        } catch (error) {
            throw new NotFoundException('Unable to delete user');
        }
    }
}