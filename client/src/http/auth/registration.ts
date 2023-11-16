export const registration = async (email: string, password: string) => {
    const user = {
        email,
        password,
    };
    const res = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL + '/api/auth/registration',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        },
    );
    return res.json();
};
