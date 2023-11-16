import { Control, FieldErrors, SubmitHandler } from 'react-hook-form';

export interface IUserInfoFormProps {
    handleSubmit: any;
    onSubmit: SubmitHandler<IUserInfoFormInput>;
    control: Control;
    disabled: boolean;
    errors: FieldErrors;
}

export interface IUserInfoFormInput {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
}
