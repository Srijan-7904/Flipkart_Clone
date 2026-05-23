import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography, Card, Divider, Button, Grid, styled, CircularProgress } from '@mui/material';
import { ShoppingBag, ArrowBack, Payment, CalendarToday } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../context/ContextProvider';
import { getOrders } from '../../service/api';

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

const OrderCard = styled(Card)`
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    margin-bottom: 20px;
    overflow: hidden;
    border: 1px solid #e0e0e0;
`;

const OrderHeader = styled(Box)(({ theme }) => ({
    background: '#f7f9fa',
    padding: '15px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    borderBottom: '1px solid #e0e0e0',
    '& > div': {
        display: 'flex',
        flexDirection: 'column',
        marginRight: 20,
        marginBottom: 5,
        '& > span:first-of-type': {
            fontSize: 12,
            color: '#878787',
            textTransform: 'uppercase',
            fontWeight: 500,
        },
        '& > span:last-child': {
            fontSize: 14,
            fontWeight: 600,
            color: '#212121',
        }
    }
}));

const ProductItem = styled(Box)`
    padding: 20px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f0f0f0;
    &:last-child {
        border-bottom: none;
    }
`;

const Image = styled('img')({
    width: 80,
    height: 80,
    objectFit: 'contain',
    marginRight: 20,
});

const ProductDetails = styled(Box)`
    flex: 1;
    display: flex;
    flex-direction: column;
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

const EmptyIcon = styled(ShoppingBag)`
    font-size: 80px;
    color: #c2c2c2;
    margin-bottom: 20px;
`;

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { username } = useContext(LoginContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserOrders = async () => {
            if (username) {
                setLoading(true);
                const data = await getOrders(username);
                if (data) {
                    setOrders(data);
                }
                setLoading(false);
            } else {
                setLoading(false);
            }
        };
        fetchUserOrders();
    }, [username]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (loading) {
        return (
            <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
            </Container>
        );
    }

    if (!username) {
        return (
            <Container>
                <EmptyState>
                    <EmptyIcon />
                    <Typography variant="h5" style={{ fontWeight: 600, marginBottom: 10 }}>Please log in</Typography>
                    <Typography style={{ color: '#878787', marginBottom: 20 }}>Log in to view your order history and track shipments.</Typography>
                    <Button variant="contained" style={{ background: '#2874f0', color: '#fff' }} onClick={() => navigate('/')}>
                        Go Home
                    </Button>
                </EmptyState>
            </Container>
        );
    }

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
            <Heading>My Orders</Heading>
            
            {orders.length === 0 ? (
                <EmptyState>
                    <EmptyIcon />
                    <Typography variant="h5" style={{ fontWeight: 600, marginBottom: 10 }}>No Orders Placed Yet</Typography>
                    <Typography style={{ color: '#878787', marginBottom: 20 }}>You haven't placed any orders with us. Start shopping to fill this up!</Typography>
                    <Box display="flex" gap="15px">
                        <Button variant="contained" style={{ background: '#2874f0', color: '#fff', textTransform: 'none' }} onClick={() => navigate('/')}>
                            Shop Now
                        </Button>
                        <Button variant="outlined" style={{ color: '#2874f0', borderColor: '#2874f0', textTransform: 'none', fontWeight: 600 }} onClick={() => navigate('/wishlist')}>
                            Go to Wishlist
                        </Button>
                    </Box>
                </EmptyState>
            ) : (
                <>
                    {orders.map((order) => (
                        <OrderCard key={order.id}>
                            <OrderHeader>
                                <div>
                                    <span>Order Placed</span>
                                    <span>{formatDate(order.order_date)}</span>
                                </div>
                                <div>
                                    <span>Total Price</span>
                                    <span style={{ color: '#388e3c' }}>₹{parseFloat(order.amount).toLocaleString()}</span>
                                </div>
                                <div>
                                    <span>Order ID</span>
                                    <span>{order.order_id}</span>
                                </div>
                                <div>
                                    <span>Payment ID</span>
                                    <span>{order.payment_id}</span>
                                </div>
                            </OrderHeader>
                            <Box>
                                {order.items && Array.isArray(order.items) && order.items.map((item, idx) => (
                                    <ProductItem key={item.id || idx}>
                                        <Image src={item.detailUrl || item.detailurl || item.url} alt={item.title?.shortTitle || 'product'} />
                                        <ProductDetails>
                                            <Typography style={{ fontSize: 16, fontWeight: 600, color: '#212121' }}>
                                                {item.title?.longTitle || item.title?.shortTitle}
                                            </Typography>
                                            <Typography style={{ fontSize: 13, color: '#878787', marginTop: 4 }}>
                                                Quantity: 1
                                            </Typography>
                                            <Typography style={{ fontSize: 15, fontWeight: 600, marginTop: 10 }}>
                                                ₹{item.price?.cost?.toLocaleString()}
                                            </Typography>
                                        </ProductDetails>
                                        <Box style={{ marginLeft: 'auto' }}>
                                            <Button 
                                                variant="outlined" 
                                                style={{ textTransform: 'none', color: '#2874f0', borderColor: '#e0e0e0', fontWeight: 600 }}
                                                onClick={() => navigate(`/product/${item.id}`)}
                                            >
                                                View Item
                                            </Button>
                                        </Box>
                                    </ProductItem>
                                ))}
                            </Box>
                        </OrderCard>
                    ))}
                    <Box display="flex" justifyContent="center" marginTop="30px">
                        <Button 
                            variant="outlined" 
                            style={{ 
                                textTransform: 'none', 
                                color: '#2874f0', 
                                borderColor: '#2874f0', 
                                fontWeight: 600, 
                                padding: '8px 24px', 
                                borderRadius: '4px',
                                background: '#fff',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                            }}
                            onClick={() => navigate('/wishlist')}
                        >
                            View Your Wishlist
                        </Button>
                    </Box>
                </>
            )}
        </Container>
    );
};

export default Orders;
