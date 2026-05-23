import { useState, useContext } from 'react';
import { AppBar, Toolbar, Box, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Button, Badge, styled } from '@mui/material';
import { Menu, Home, Receipt, Favorite, ShoppingCart, Storefront, PowerSettingsNew, AccountCircle, Close, Flight } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// components
import CustomButtons from './CustomButtons';
import Search from './Search';
import LoginDialog from '../Login/LoginDialog';
import { LoginContext } from '../../context/ContextProvider';

const StyledHeader = styled(AppBar)(({ theme }) => ({
    background: '#ffffff',
    height: 64,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
    borderBottom: '1px solid #e8e8e8',
    justifyContent: 'center',
    color: '#212121',
    [theme.breakpoints.down('sm')]: {
        height: 100
    }
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    minHeight: '64px !important',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'stretch',
        paddingBottom: 8,
        paddingTop: 8,
        justifyContent: 'space-between',
        height: '100%'
    }
}));

const BrandRow = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    width: 'auto',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        justifyContent: 'space-between',
        position: 'relative'
    }
}));

const LogoContainer = styled(Link)({
    display: 'flex',
    alignItems: 'center',
    background: '#ffe500',
    borderRadius: '8px',
    padding: '6px 14px',
    textDecoration: 'none',
    marginRight: '20px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    transition: 'transform 0.1s ease',
    '&:active': {
        transform: 'scale(0.98)'
    }
});

const LogoText = styled(Typography)({
    fontSize: '17px',
    fontWeight: 900,
    fontStyle: 'italic',
    color: '#000000',
    letterSpacing: '-0.5px',
    fontFamily: '"Plus Jakarta Sans", sans-serif'
});

const FlipkartBagIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 6 }}>
        <path d="M19 6H17C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6H5C3.9 6 3 6.9 3 8V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V8C21 6.9 20.1 6 19 6ZM12 3C13.66 3 15 4.34 15 6H9C9 4.34 10.34 3 12 3ZM19 20H5V8H7V10C7 10.55 7.45 11 8 11C8.55 11 9 10.55 9 10V8H15V10C15 10.55 15.45 11 16 11C16.55 11 17 10.55 17 10V8H19V20Z" fill="#1d52bd" />
        <path d="M9 14C9 15.66 10.34 17 12 17C13.66 17 15 15.66 15 14" stroke="#ffe500" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const TagPill = styled(Link)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    background: '#f0f2f5',
    borderRadius: '8px',
    padding: '6px 14px',
    textDecoration: 'none',
    color: '#212121',
    fontSize: '13px',
    fontWeight: 600,
    marginRight: '12px',
    transition: 'background-color 0.2s',
    '&:hover': {
        background: '#e4e6eb'
    },
    [theme.breakpoints.down('md')]: {
        display: 'none'
    }
}));

const MenuButton = styled(IconButton)(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.down('sm')]: {
        display: 'block',
        color: '#212121',
        marginRight: 10,
        padding: 5
    }
}));

const CustomButtonWrapper = styled('span')(({ theme }) => ({ 
    margin: '0 5% 0 30px', 
    [theme.breakpoints.down('sm')]: {
        display: 'none'
    }
}));

const MobileActions = styled(Box)(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.down('sm')]: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        marginRight: '5px'
    }
}));

const DrawerHeader = styled(Box)({
    background: '#2874f0',
    color: '#ffffff',
    padding: '20px 15px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    position: 'relative'
});

const DrawerCloseButton = styled(IconButton)({
    position: 'absolute',
    right: 8,
    top: 8,
    color: '#ffffff'
});

const StyledDrawerItem = styled(ListItem)({
    padding: '12px 20px',
    borderBottom: '1px solid #f0f0f0',
    color: '#333333',
    '&:hover': {
        background: '#f9f9f9'
    }
});

const DrawerLoginButton = styled(Button)({
    color: '#2874f0',
    background: '#ffffff',
    textTransform: 'none',
    fontWeight: 600,
    borderRadius: 4,
    padding: '4px 16px',
    '&:hover': {
        background: '#f0f0f0'
    }
});

const Header = () => {
    const [open, setOpen] = useState(false);
    const [loginDialogOpen, setLoginDialogOpen] = useState(false);

    const { account, setAccount, setUsername } = useContext(LoginContext);
    const cartDetails = useSelector(state => state.cart);
    const { cartItems } = cartDetails;

    const navigate = useNavigate();

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const logoutUser = () => {
        setAccount('');
        setUsername('');
        handleClose();
    };

    const list = () => (
        <Box style={{ width: 260 }} onClick={handleClose}>
            <DrawerHeader onClick={(e) => e.stopPropagation()}>
                {account ? (
                    <>
                        <AccountCircle style={{ fontSize: 32 }} />
                        <Box>
                            <Typography style={{ fontWeight: 600, fontSize: 16 }}>
                                Hello, {account}
                            </Typography>
                            <Typography style={{ fontSize: 11, opacity: 0.8 }}>
                                Plus Member
                            </Typography>
                        </Box>
                    </>
                ) : (
                    <>
                        <AccountCircle style={{ fontSize: 32 }} />
                        <Box style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                            <Typography style={{ fontWeight: 600, fontSize: 14 }}>
                                Welcome Guest
                            </Typography>
                            <DrawerLoginButton 
                                variant="contained" 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleClose();
                                    setLoginDialogOpen(true);
                                }}
                            >
                                Login & Signup
                            </DrawerLoginButton>
                        </Box>
                    </>
                )}
                <DrawerCloseButton 
                    onClick={(e) => {
                        e.stopPropagation();
                        handleClose();
                    }} 
                    size="small"
                >
                    <Close />
                </DrawerCloseButton>
            </DrawerHeader>
            <List style={{ padding: 0 }}>
                <StyledDrawerItem button onClick={() => navigate('/')}>
                    <ListItemIcon style={{ minWidth: 40, color: '#2874f0' }}>
                        <Home />
                    </ListItemIcon>
                    <ListItemText primary="Home" primaryTypographyProps={{ style: { fontSize: 14, fontWeight: 500 } }} />
                </StyledDrawerItem>

                <StyledDrawerItem button onClick={() => navigate('/orders')}>
                    <ListItemIcon style={{ minWidth: 40, color: '#2874f0' }}>
                        <Receipt />
                    </ListItemIcon>
                    <ListItemText primary="My Orders" primaryTypographyProps={{ style: { fontSize: 14, fontWeight: 500 } }} />
                </StyledDrawerItem>

                <StyledDrawerItem button onClick={() => navigate('/wishlist')}>
                    <ListItemIcon style={{ minWidth: 40, color: '#e91e63' }}>
                        <Favorite />
                    </ListItemIcon>
                    <ListItemText primary="Wishlist" primaryTypographyProps={{ style: { fontSize: 14, fontWeight: 500 } }} />
                </StyledDrawerItem>

                <StyledDrawerItem button onClick={() => navigate('/cart')}>
                    <ListItemIcon style={{ minWidth: 40, color: '#2874f0' }}>
                        <ShoppingCart />
                    </ListItemIcon>
                    <ListItemText primary="My Cart" primaryTypographyProps={{ style: { fontSize: 14, fontWeight: 500 } }} />
                </StyledDrawerItem>

                <StyledDrawerItem button onClick={() => navigate('/products')}>
                    <ListItemIcon style={{ minWidth: 40, color: '#2874f0' }}>
                        <Storefront />
                    </ListItemIcon>
                    <ListItemText primary="Become a Seller" primaryTypographyProps={{ style: { fontSize: 14, fontWeight: 500 } }} />
                </StyledDrawerItem>

                {account && (
                    <StyledDrawerItem button onClick={logoutUser}>
                        <ListItemIcon style={{ minWidth: 40, color: '#d32f2f' }}>
                            <PowerSettingsNew />
                        </ListItemIcon>
                        <ListItemText primary="Logout" primaryTypographyProps={{ style: { fontSize: 14, fontWeight: 500 } }} />
                    </StyledDrawerItem>
                )}
            </List>
        </Box>
    );

    return (
        <StyledHeader position="fixed">
            <StyledToolbar>
                <BrandRow>
                    <Box style={{ display: 'flex', alignItems: 'center' }}>
                        <MenuButton onClick={handleOpen}>
                            <Menu />
                        </MenuButton>

                        <Drawer open={open} onClose={handleClose}>
                            {list()}
                        </Drawer>

                        <LogoContainer to='/'>
                            <FlipkartBagIcon />
                            <LogoText>Flipkart</LogoText>
                        </LogoContainer>

                        <TagPill to='#'>
                            <Flight style={{ color: '#ff6f61', fontSize: 16 }} />
                            <span>Travel</span>
                        </TagPill>

                        <TagPill to='#'>
                            <Storefront style={{ color: '#22c55e', fontSize: 16 }} />
                            <span>Grocery</span>
                        </TagPill>
                    </Box>

                    {/* Mobile Only Actions */}
                    <MobileActions>
                        <Link to='/cart' style={{ color: '#212121', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                            <Badge badgeContent={cartItems?.length} color="primary">
                                <ShoppingCart style={{ color: '#212121' }} />
                            </Badge>
                        </Link>
                    </MobileActions>
                </BrandRow>
                
                <Search />
                
                <CustomButtonWrapper>
                    <CustomButtons />
                </CustomButtonWrapper>
            </StyledToolbar>
            <LoginDialog open={loginDialogOpen} setOpen={setLoginDialogOpen} setAccount={setAccount} setUsername={setUsername} />
        </StyledHeader>
    );
};

export default Header;