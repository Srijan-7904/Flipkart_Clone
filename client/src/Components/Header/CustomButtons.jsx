import React, { useState, useContext } from 'react';

import { Box, Typography, Badge, Button, styled } from '@mui/material';
import { ShoppingCart, AccountCircle, KeyboardArrowDown } from '@mui/icons-material';

import { Link } from 'react-router-dom';
import { LoginContext } from '../../context/ContextProvider';
import { useSelector } from 'react-redux';

import Profile from './Profile';
import LoginDialog from '../Login/LoginDialog';

const Container = styled(Link)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#212121',
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    }
}));

const Wrapper = styled(Box)(({ theme }) => ({
    margin: '0 3% 0 auto',
    display: 'flex',
    alignItems: 'center',
    '& > *': {
        marginRight: '32px !important',
        textDecoration: 'none',
        color: '#212121',
        fontSize: 15,
        fontWeight: 500,
        alignItems: 'center',
        display: 'flex',
        whiteSpace: 'nowrap',
        [theme.breakpoints.down('sm')]: {
            color: '#2874f0',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            marginTop: 10
        }
    },
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    }
}));

const CustomButtons = () => {
    
    const [open, setOpen] = useState(false);
    const { account, setAccount, setUsername } = useContext(LoginContext);

    const cartDetails = useSelector(state => state.cart);
    const { cartItems } = cartDetails;

    const openDialog = () => {
        setOpen(true);
    }

    return (
        <Wrapper>
            {
                account ? <Profile account={account} setAccount={setAccount} /> :
                    <Box onClick={() => openDialog()} style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', color: '#212121' }}>
                        <AccountCircle style={{ color: '#212121', fontSize: 20 }} />
                        <Typography style={{ fontSize: 15, fontWeight: 500 }}>Sign In</Typography>
                        <KeyboardArrowDown style={{ fontSize: 16, color: '#878787' }} />
                    </Box>
            }
            <Typography style={{ fontSize: 15, fontWeight: 500 }}>Become a Seller</Typography>
            
            <Container to='/cart'>
                <Badge badgeContent={cartItems?.length} color="secondary">
                    <ShoppingCart style={{ color: '#212121', fontSize: 20 }} />
                </Badge>
                <Typography style={{ marginLeft: 10, fontSize: 15, fontWeight: 500 }}>Cart</Typography>
            </Container>
            <LoginDialog open={open} setOpen={setOpen} setAccount={setAccount} setUsername={setUsername} />
        </Wrapper>
    )
}

export default CustomButtons;