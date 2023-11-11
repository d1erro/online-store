import { Control, FieldErrors } from 'react-hook-form';

export interface IUserInfoFormProps {
    handleSubmit: any;
    onSubmit: any;
    control: any;
    disabled: boolean;
    errors: FieldErrors;
}

export interface IUserInfoFormInput {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
}
