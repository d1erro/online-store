import { User } from '@/lib/types';

declare module 'next-auth' {
    interface Session {
        user: User;

        backendTokens: {
            accessToken: string;
            refreshToken: string;
            expiresIn: number;
        };
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        user: User;

        backendTokens: {
            accessToken: string;
            refreshToken: string;
            expiresIn: number;
        };
    }
}
