import { Session } from 'next-auth';
import { Control, FieldErrors } from 'react-hook-form';

export interface IAddressInfo {
    region: string;
    city: string;
    street: string;
    index: string;
}

export interface IAddressInfoProps {
    session: Session;
    update: (session: Session) => void;
}

export interface IAddress {
    _id: string;
    userId: string;
    region: string;
    city: string;
    street: string;
    index: string;
    default: boolean;
}

export interface IAddressInfoFormProps {
    handleSubmit: any;
    onSubmit: any;
    control: any;
    disabled: boolean;
    errors: FieldErrors;
}
