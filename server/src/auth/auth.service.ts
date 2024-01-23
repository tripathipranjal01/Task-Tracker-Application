import { SignUpDto } from './dto/signUp.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signIn.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService
    ) { }
    
    async signUp(signUpDto: SignUpDto): Promise<{token: string}> {
        const { name, email, password } = signUpDto

        const existedUser = await this.userModel.findOne({email})

        if (existedUser  ) {
            throw new UnauthorizedException("Email Already Existed !")
        }
        
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await this.userModel.create({
            name,
            email,
            password: hashedPassword
        })

        const token = this.jwtService.sign({ id: user._id })
        return {token}
    }

    async signIn(signInDto: SignInDto): Promise<{ token: string }> {
        const { email, password } = signInDto;

        const user = await this.userModel.findOne({ email });

        if (!user) {
            throw new UnauthorizedException(" User Not Found! \n Please SignUp First !")
        }

        const comparePassword = await bcrypt.compare(password, user.password);

        if (!comparePassword) {
            throw new UnauthorizedException('Invalid Email or Password')
        }

        const token = this.jwtService.sign({ id: user._id });

        return {token}
    }
}
