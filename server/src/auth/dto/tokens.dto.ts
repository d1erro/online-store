import { ApiProperty } from '@nestjs/swagger';

export class TokensDto {
    @ApiProperty({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ1YimlhdCI6',
        description: 'JWT access token',
    })
    readonly accessToken: string;

    @ApiProperty({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ1YimlhdCI6',
        description: 'JWT refresh token',
    })
    readonly refreshToken: string;
}
