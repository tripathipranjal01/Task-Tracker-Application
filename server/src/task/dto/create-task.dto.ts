import { IsBoolean, IsEmpty, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { User } from "src/auth/schema/user.schema"

export class CreateTaskDto{
    @IsNotEmpty()
    @IsString()
    readonly title: string

    @IsString()
    readonly description: string

    @IsOptional()
    @IsBoolean()
    readonly completed: boolean;

    @IsEmpty({message: 'You cannot pass user id'})
    readonly user: User
}