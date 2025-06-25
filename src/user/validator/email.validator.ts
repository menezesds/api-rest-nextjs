import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UserRepository } from "../user.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
@ValidatorConstraint({async: true})
export class UniqueEmailValidator implements ValidatorConstraintInterface {

    constructor(private userRepository: UserRepository) {}
    
    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const userExists = await this.userRepository.userExists(value);
        return !userExists;
    }
}

export const UniqueEmail = (validatonOptions: ValidationOptions) => {
    return (object: object, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validatonOptions,
            constraints: [],
            validator: UniqueEmailValidator,
        });
    }
}