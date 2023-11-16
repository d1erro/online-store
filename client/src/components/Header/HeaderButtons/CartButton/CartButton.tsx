'use client';

import Link from 'next/link';
import LocalMall from '@mui/icons-material/LocalMallOutlined';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import Cart from '@/store/CartStore';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

const CartButton = observer(() => {
    useEffect(() => {
        Cart.loadCartFromLocalStorage();
    }, []);

    const cart = Cart.cart;

    return (
        <>
            <Link href={'/cart'}>
                <StyledBadge badgeContent={cart.length} color="primary">
                    <LocalMall sx={{ color: 'white' }} fontSize="large" />
                </StyledBadge>
            </Link>
        </>
    );
});

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
        font: 'Roboto',
        right: -1,
        top: -1,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 5px',
        fontStyle: 'Roboto',
    },
}));

export default CartButton;
