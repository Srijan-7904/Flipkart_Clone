import { useContext } from 'react';
import { Box, Typography, Button, Grid, styled } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../../redux/actions/cartActions';
import TotalView from './TotalView';
import EmptyCart from './EmptyCart';
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../context/ContextProvider';

const Component = styled(Grid)(({ theme }) => ({
    padding: '30px 135px',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
        padding: '15px 0'
    }
}));

const LeftComponent = styled(Grid)(({ theme }) => ({
    paddingRight: 15,
    [theme.breakpoints.down('sm')]: {
        marginBottom: 15
    }
}));

const Header = styled(Box)`
    padding: 15px 24px;
    background: #fff;
`;

const BottomWrapper = styled(Box)`
    padding: 16px 22px;
    background: #fff;
    box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
    border-top: 1px solid #f0f0f0;
`;

const PlaceOrderButton = styled(Button)`
    display: flex;
    margin-left: auto;
    background: #fb641b;
    color: #fff;
    border-radius: 2px;
    width: 250px;
    height: 51px;
    font-weight: 600;
    font-size: 16px;
    transition: transform 0.2s ease, box-shadow 0.2s ease !important;
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(251, 100, 27, 0.4) !important;
    }
`;

const Cart = () => {
    const cartDetails = useSelector(state => state.cart);
    const { cartItems } = cartDetails;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { username } = useContext(LoginContext);

    const removeItemFromCart = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleProceedToCheckout = () => {
        navigate('/checkout');
    };

    return (
        <>
            {cartItems.length ?
                <Component container>
                    <LeftComponent item lg={9} md={9} sm={12} xs={12}>
                        <Header>
                            <Typography style={{ fontWeight: 600, fontSize: 18 }}>
                                My Cart ({cartItems?.length} item{cartItems?.length !== 1 ? 's' : ''})
                            </Typography>
                        </Header>
                        {cartItems.map((item, index) => (
                            <CartItem key={item.id || index} item={item} removeItemFromCart={removeItemFromCart} />
                        ))}
                        <BottomWrapper>
                            <PlaceOrderButton onClick={handleProceedToCheckout} variant="contained">
                                Proceed to Checkout
                            </PlaceOrderButton>
                        </BottomWrapper>
                    </LeftComponent>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                        <TotalView cartItems={cartItems} />
                    </Grid>
                </Component> : <EmptyCart />
            }
        </>
    );
};

export default Cart;