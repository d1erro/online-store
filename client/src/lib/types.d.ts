export type User = {
    _id: string;
    email: string;
    first_name: string;
    last_name: string;
    full_name: string;
    phone: string;
    role: string;
    addresses: string[];
};

interface Role {
    _id: string;
    value: string;
    description: string;
}
