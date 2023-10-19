import { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: '/login',
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: {
                    label: 'email',
                    type: 'email',
                    required: true,
                },
                password: {
                    label: 'password',
                    type: 'password',
                    required: true,
                },
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) return null;
                const res = await fetch(
                    process.env.NEXT_PUBLIC_BACKEND_URL + '/auth/login',
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(credentials),
                    },
                );
                const user = await res.json();

                if (res.ok) {
                    return user;
                } else {
                    return null;
                }
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (trigger === 'update' && session.user._id) {
                console.log(token);
                return { ...token, ...session };
            }

            if (user) return { ...token, ...user };

            if (new Date().getTime() < token.backendTokens.expiresIn)
                return token;
            return await refreshToken(token);
        },

        async session({ token, session }) {
            session.user = token.user;
            session.backendTokens = token.backendTokens;

            return session;
        },
    },
};

async function refreshToken(token: JWT): Promise<JWT> {
    const res = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL + '/auth/refresh',
        {
            method: 'POST',
            headers: {
                authorization: `Refresh ${token.backendTokens.refreshToken}`,
            },
        },
    );

    const response = await res.json();

    return {
        ...token,
        backendTokens: response,
    };
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
