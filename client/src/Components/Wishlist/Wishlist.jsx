import React, { useContext } from 'react';
import { Box, Typography, Card, Divider, Button, Grid, styled } from '@mui/material';
import { Favorite, Delete, ShoppingCart, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../context/ContextProvider';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/actions/cartActions';

const Container = styled(Box)(({ theme }) => ({
    padding: '30px 135px',
    background: '#f1f3f6',
    minHeight: '85vh',
    [theme.breakpoints.down('md')]: {
        padding: '15px 10px'
    }
}));

const Heading = styled(Typography)`
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 20px;
`;

const WishlistCard = styled(Card)`
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    margin-bottom: 20px;
    overflow: hidden;
    border: 1px solid #e0e0e0;
`;

const WishlistHeader = styled(Box)`
    background: #fff;
    padding: 15px 24px;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    justifyContent: space-between;
    align-items: center;
`;

const ProductItem = styled(Box)`
    padding: 24px;
    display: flex;
    align-items: center;
    background: #fff;
    border-bottom: 1px solid #f0f0f0;
    &:last-child {
        border-bottom: none;
    }
`;

const Image = styled('img')({
    width: 100,
    height: 100,
    objectFit: 'contain',
    marginRight: 24,
});

const ProductDetails = styled(Box)`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const ActionWrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-end;
    margin-left: 20px;
`;

const EmptyState = styled(Box)`
    text-align: center;
    padding: 80px 0;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const EmptyIcon = styled(Favorite)`
    font-size: 80px;
    color: #ffd1d7;
    margin-bottom: 20px;
`;

const Wishlist = () => {
    const { wishlist, setWishlist, account } = useContext(LoginContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const removeItem = (id) => {
        setWishlist(wishlist.filter(item => item.id !== id));
    };

    const addItemToCart = (id) => {
        if (!account) {
            alert("Please login first to add items to cart.");
            return;
        }
        dispatch(addToCart(id, 1));
        navigate('/cart');
    };

    return (
        <Container>
            <Box display="flex" alignItems="center" marginBottom="10px">
                <Button 
                    startIcon={<ArrowBack />} 
                    onClick={() => navigate('/')} 
                    style={{ textTransform: 'none', color: '#2874f0', fontWeight: 600, paddingLeft: 0 }}
                >
                    Continue Shopping
                </Button>
            </Box>
            
            {wishlist.length === 0 ? (
                <EmptyState>
                    <EmptyIcon />
                    <Typography variant="h5" style={{ fontWeight: 600, marginBottom: 10 }}>Your Wishlist is Empty</Typography>
                    <Typography style={{ color: '#878787', marginBottom: 20 }}>Save items you like to view and purchase them here later.</Typography>
                    <Button variant="contained" style={{ background: '#2874f0', color: '#fff', textTransform: 'none', padding: '8px 30px' }} onClick={() => navigate('/')}>
                        Shop Now
                    </Button>
                </EmptyState>
            ) : (
                <WishlistCard>
                    <WishlistHeader>
                        <Heading style={{ marginBottom: 0 }}>My Wishlist ({wishlist.length})</Heading>
                    </WishlistHeader>
                    <Box>
                        {wishlist.map((item) => (
                            <ProductItem key={item.id}>
                                <Image 
                                    src={item.detailUrl || item.url} 
                                    alt={item.title?.shortTitle || 'product'} 
                                    onClick={() => navigate(`/product/${item.id}`)}
                                    style={{ cursor: 'pointer' }}
                                />
                                <ProductDetails>
                                    <Typography 
                                        onClick={() => navigate(`/product/${item.id}`)}
                                        style={{ fontSize: 16, fontWeight: 600, color: '#212121', cursor: 'pointer' }}
                                    >
                                        {item.title?.longTitle || item.title?.shortTitle}
                                    </Typography>
                                    <Typography style={{ color: 'green', fontSize: 13, marginTop: 4 }}>
                                        {item.discount}
                                    </Typography>
                                    <Typography style={{ fontSize: 18, fontWeight: 600, marginTop: 12 }}>
                                        ₹{item.price?.cost?.toLocaleString()}&nbsp;&nbsp;&nbsp;
                                        <span style={{ color: '#878787', fontSize: 14, fontWeight: 400 }}><strike>₹{item.price?.mrp?.toLocaleString()}</strike></span>&nbsp;&nbsp;&nbsp;
                                        <span style={{ color: '#388E3C', fontSize: 14, fontWeight: 500 }}>{item.price?.discount} off</span>
                                    </Typography>
                                </ProductDetails>
                                <ActionWrapper>
                                    <Button 
                                        variant="contained" 
                                        startIcon={<ShoppingCart />}
                                        style={{ 
                                            textTransform: 'none', 
                                            background: '#ff9f00', 
                                            color: '#fff', 
                                            fontWeight: 600,
                                            width: 150
                                        }}
                                        onClick={() => addItemToCart(item.id)}
                                    >
                                        Add to Cart
                                    </Button>
                                    <Button 
                                        variant="outlined" 
                                        startIcon={<Delete />}
                                        color="error"
                                        style={{ 
                                            textTransform: 'none', 
                                            fontWeight: 600,
                                            width: 150
                                        }}
                                        onClick={() => removeItem(item.id)}
                                    >
                                        Remove
                                    </Button>
                                </ActionWrapper>
                            </ProductItem>
                        ))}
                    </Box>
                </WishlistCard>
            )}
        </Container>
    );
};

export default Wishlist;
