import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { UniqueEmail } from "../validator/email.validator";

export class UpdateUserDto {
    @IsNotEmpty({message: 'Name is required'})
    @IsOptional()
    name: string;

    @IsEmail(undefined, {message: 'Invalid email'})
    @IsNotEmpty({message: 'Email is required'})
    @IsOptional()
    email: string;

    @IsNotEmpty({message: 'Password is required'})
    @IsOptional()
    @MinLength(6, {message: 'Password must be at least 6 characters long'})
    password: string;
}