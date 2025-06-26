import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { UniqueEmail } from "../validator/email.validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @IsNotEmpty({message: 'Name is required'})
    @ApiProperty({
        description: 'User Name',
        example:'John Doe'
    })
    name: string;

    @IsEmail(undefined, {message: 'Invalid email'})
    @IsNotEmpty({message: 'Email is required'})
    @UniqueEmail({message: 'Email already exists'})
    @ApiProperty({
        description: 'User Email',
        example:'john.doe@example.com'
    })
    email: string;

    @IsNotEmpty({message: 'Password is required'})
    @MinLength(6, {message: 'Password must be at least 6 characters long'})
    @ApiProperty({
        description: 'User Password',
        example:'1B3c5d'
    })
    password: string;
}