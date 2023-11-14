import UserInfo from '@/components/Profile/ProfileData/UserInfo/UserInfo';
import AddressInfo from '@/components/Profile/ProfileData/AddressInfo/AddressInfo';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Loader from '@/ui/Loader/Loader';

async function ProfileData() {
    const session = await getServerSession(authOptions);

    if (session) {
        return (
            <div className="flex w-full flex-col gap-5 rounded-3xl bg-gray-100 p-5">
                <UserInfo session={session} />
                <AddressInfo session={session} />
            </div>
        );
    }
    return <Loader />;
}

export default ProfileData;
