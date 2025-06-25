import { UserEntity } from "../user.entity";

export class UserListDto {
    constructor(
        private readonly id: string,
        private readonly name: string,
        private readonly email: string,
    ) {}

}