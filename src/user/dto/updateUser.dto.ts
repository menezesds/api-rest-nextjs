import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { UniqueEmail } from "../validator/email.validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
    /** 
     * Username or display name of the user
     * @example John Doe
     */
    @IsNotEmpty({message: 'Name is required'})
    @IsOptional()
    name: string;

    /** 
     * Email address of the user is necessary to ensure unique accounts 
     * and recovery.
     * @example john.doe@example.com
     */
    @IsEmail(undefined, {message: 'Invalid email'})
    @IsNotEmpty({message: 'Email is required'})
    @IsOptional()
    @ApiProperty()
    email: string;

    /**
     * Password of the user is necessary for update user
     * @example "securepassword123"
   */
    @IsNotEmpty({message: 'Password is required'})
    @IsOptional()
    @MinLength(6, {message: 'Password must be at least 6 characters long'})
    @ApiProperty()
    password: string;
}