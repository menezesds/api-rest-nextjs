import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { UniqueEmail } from "../validator/email.validator";

export class CreateUserDto {
    @IsNotEmpty({message: 'Name is required'})
    name: string;

    @IsEmail(undefined, {message: 'Invalid email'})
    @IsNotEmpty({message: 'Email is required'})
    @UniqueEmail({message: 'Email already exists'})
    email: string;

    @IsNotEmpty({message: 'Password is required'})
    @MinLength(6, {message: 'Password must be at least 6 characters long'})
    password: string;
}