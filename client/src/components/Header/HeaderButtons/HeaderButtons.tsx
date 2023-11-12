import Link from 'next/link';
import LocalMall from '@mui/icons-material/LocalMallOutlined';
import AccountCircle from '@mui/icons-material/AccountCircleOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

async function HeaderButtons() {
    const session = await getServerSession(authOptions);

    return (
        <>
            {session !== null ? (
                <div className="ml-auto flex items-center gap-4">
                    <Link href={'/cart'}>
                        <LocalMall sx={{ color: 'white' }} fontSize="large" />
                    </Link>

                    <Link href={'/profile'}>
                        <AccountCircle
                            sx={{ color: 'white' }}
                            fontSize="large"
                        />
                    </Link>
                </div>
            ) : (
                <div className="ml-auto flex items-center gap-4">
                    <Link href={'/cart'}>
                        <LocalMall sx={{ color: 'white' }} fontSize="large" />
                    </Link>

                    <Link href={'/login'}>
                        <LoginOutlinedIcon
                            sx={{ color: 'white' }}
                            fontSize="large"
                        />
                    </Link>
                </div>
            )}
        </>
    );
}

export default HeaderButtons;
