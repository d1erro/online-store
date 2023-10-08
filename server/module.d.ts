declare namespace NodeJS {
    export interface ProcessEnv {
        SECRET_MEMBER_KEY: string;
        PRIVATE_KEY: string;
        BACKEND_PORT: string;

        DATABASE_URL: string;
        JWT_SECRET_KEY: string;
        JWT_REFRESH_TOKEN_KEY: string;
    }
}
