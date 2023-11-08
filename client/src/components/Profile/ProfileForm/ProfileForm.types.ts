import { Session } from 'next-auth';

export interface IUserInfoProps {
    session: Session;
    update: (data: any) => void;
}
