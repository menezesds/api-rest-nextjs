import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { UniqueEmailValidator } from "./validator/email.validator";

@Module({
    controllers: [UserController],
    providers: [UserRepository, UniqueEmailValidator],
})
export class UserModule {}