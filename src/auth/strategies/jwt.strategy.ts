import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { request } from 'http';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(configService: ConfigService) {
        super({
            //jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // ใช้ bearer 
            jwtFromRequest: ExtractJwt.fromExtractors([ // ใช้ cookie
            
                (request) => {
                    return request?.cookies?.accessToken;
                }
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET'),
        });
    }

    async validate(payload: any) {
        return { userId: payload.sub, email: payload.email };
    }

}