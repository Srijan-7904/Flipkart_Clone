import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { Typography, Menu, MenuItem, Box, styled } from '@mui/material';
import { 
    AccountCircle, 
    KeyboardArrowDown,
    AccountCircleOutlined,
    Inventory2Outlined,
    ConfirmationNumberOutlined,
    MonetizationOnOutlined,
    StarsOutlined,
    AccountBalanceWalletOutlined,
    LocationOnOutlined,
    FavoriteBorder,
    RedeemOutlined,
    NotificationsNoneOutlined,
    ExitToAppOutlined 
} from '@mui/icons-material';
import { LoginContext } from '../../context/ContextProvider';

const Component = styled(Menu)`
    margin-top: 5px;
`;

const MenuHeader = styled(Typography)({
    padding: '12px 20px 8px 20px',
    fontWeight: 700,
    fontSize: '15px',
    color: '#212121',
    fontFamily: '"Plus Jakarta Sans", sans-serif'
});

const StyledMenuItem = styled(MenuItem)({
    padding: '10px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    '&:hover': {
        background: '#f5f7fa'
    }
});

const MenuItemText = styled(Typography)({
    fontSize: '14px',
    fontWeight: 500,
    color: '#212121',
    fontFamily: '"Plus Jakarta Sans", sans-serif'
});

const Profile = ({ account, setAccount }) => {
    const [open, setOpen] = useState(false);
    const { setUsername } = useContext(LoginContext);
    const navigate = useNavigate();
    
    const handleClick = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error signing out: ', error);
        }
        setAccount('');
        setUsername('');
    }
    
    return (
        <>
            <Box onClick={handleClick} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, color: '#212121' }}>
                <AccountCircle style={{ color: '#212121', fontSize: 20 }} />
                <Typography style={{ fontSize: 15, fontWeight: 500, whiteSpace: 'nowrap' }}>{account}</Typography>
                <KeyboardArrowDown style={{ fontSize: 16, color: '#878787' }} />
            </Box>
            <Component
                anchorEl={open}
                open={Boolean(open)}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        borderRadius: '16px',
                        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
                        padding: '6px 0',
                        width: '250px',
                        border: '1px solid #eef0f2',
                        marginTop: '10px'
                    }
                }}
            >
                <MenuHeader>Your Account</MenuHeader>
                
                <StyledMenuItem onClick={() => { handleClose(); navigate('/'); }}>
                    <AccountCircleOutlined style={{ color: '#666666', fontSize: 20 }} />
                    <MenuItemText>My Profile</MenuItemText>
                </StyledMenuItem>

                <StyledMenuItem onClick={() => { handleClose(); navigate('/orders'); }}>
                    <Inventory2Outlined style={{ color: '#666666', fontSize: 20 }} />
                    <MenuItemText>Orders</MenuItemText>
                </StyledMenuItem>

                <StyledMenuItem onClick={handleClose}>
                    <ConfirmationNumberOutlined style={{ color: '#666666', fontSize: 20 }} />
                    <MenuItemText>Coupons</MenuItemText>
                </StyledMenuItem>

                <StyledMenuItem onClick={handleClose}>
                    <MonetizationOnOutlined style={{ color: '#666666', fontSize: 20 }} />
                    <MenuItemText>Supercoin</MenuItemText>
                </StyledMenuItem>

                <StyledMenuItem onClick={handleClose}>
                    <StarsOutlined style={{ color: '#666666', fontSize: 20 }} />
                    <MenuItemText>Flipkart Plus Zone</MenuItemText>
                </StyledMenuItem>

                <StyledMenuItem onClick={handleClose}>
                    <AccountBalanceWalletOutlined style={{ color: '#666666', fontSize: 20 }} />
                    <MenuItemText>Saved Cards & Wallet</MenuItemText>
                </StyledMenuItem>

                <StyledMenuItem onClick={handleClose}>
                    <LocationOnOutlined style={{ color: '#666666', fontSize: 20 }} />
                    <MenuItemText>Saved Addresses</MenuItemText>
                </StyledMenuItem>

                <StyledMenuItem onClick={() => { handleClose(); navigate('/wishlist'); }}>
                    <FavoriteBorder style={{ color: '#666666', fontSize: 20 }} />
                    <MenuItemText>Wishlist</MenuItemText>
                </StyledMenuItem>

                <StyledMenuItem onClick={handleClose}>
                    <RedeemOutlined style={{ color: '#666666', fontSize: 20 }} />
                    <MenuItemText>Gift Cards</MenuItemText>
                </StyledMenuItem>

                <StyledMenuItem onClick={handleClose}>
                    <NotificationsNoneOutlined style={{ color: '#666666', fontSize: 20 }} />
                    <MenuItemText>Notifications</MenuItemText>
                </StyledMenuItem>

                <StyledMenuItem onClick={() => { handleClose(); logout(); }}>
                    <ExitToAppOutlined style={{ color: '#666666', fontSize: 20 }} />
                    <MenuItemText>Logout</MenuItemText>
                </StyledMenuItem>
            </Component>
        </>
    )    
}

export default Profile;