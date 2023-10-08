import { ApiProperty } from '@nestjs/swagger';

export class RefreshDto {
    @ApiProperty({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ1YimlhdCI6',
        description: 'JWT access token',
    })
    readonly: string;
}
