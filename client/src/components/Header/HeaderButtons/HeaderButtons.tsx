import Link from 'next/link';
import AccountCircle from '@mui/icons-material/AccountCircleOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import CartButton from '@/components/Header/HeaderButtons/CartButton/CartButton';

async function HeaderButtons() {
    const session = await getServerSession(authOptions);

    return (
        <>
            {session !== null ? (
                <div className="ml-auto flex items-center gap-4">
                    <CartButton />

                    <Link href={'/profile'}>
                        <AccountCircle
                            sx={{ color: 'white' }}
                            fontSize="large"
                        />
                    </Link>
                </div>
            ) : (
                <div className="ml-auto flex items-center gap-4">
                    <CartButton />

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
