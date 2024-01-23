import {  IsBoolean, IsEmpty, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { User } from 'src/auth/schema/user.schema';

export class CompleteTaskDto {
    @IsNotEmpty({message: 'id should not be empty'})
    @IsString({message: 'id must be a string'})
    readonly id: string
    
    @IsBoolean({message: 'completed must be a boolean value'})
    readonly completed: boolean;


}
