import { useState, useEffect } from 'react';
import { Box, Typography, styled } from '@mui/material';

const Header = styled(Box)`
    padding: 15px 24px;
    background: #fff;
    border-bottom: 1px solid #f0f0f0;
`;

const Heading = styled(Typography)`
    color: #878787;
    font-weight: 600;
    font-size: 13px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
`;

const Container = styled(Box)`
    padding: 15px 24px;
    background: #fff;
    & > p {
        margin-bottom: 20px;
        font-size: 14px;
    }
`;

const Price = styled('span')`
    float: right;
`;

const TotalAmount = styled(Typography)`
    font-size: 18px;
    font-weight: 600;
    border-top: 1px dashed #e0e0e0;
    padding: 20px 0;
    border-bottom: 1px dashed #e0e0e0;
`;

const Discount = styled('span')`
    font-size: 14px; 
    color: #388e3c;
    font-weight: 500;
`;

const TotalView = ({ cartItems }) => {
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [totalQty, setTotalQty] = useState(0);

    useEffect(() => {
        totalAmount();
    }, [cartItems]);

    const totalAmount = () => {
        let price = 0, discount = 0, qty = 0;
        cartItems.forEach(item => {
            const q   = item.quantity || 1;
            const mrp = (item.price?.mrp ?? item.mrp ?? 0) * q;
            const cost = (item.price?.cost ?? item.cost ?? 0) * q;
            price    += mrp;
            discount += (mrp - cost);
            qty      += q;
        });
        setPrice(price);
        setDiscount(discount);
        setTotalQty(qty);
    };

    const savings = discount - 40;

    return (
        <Box>
            <Header>
                <Heading>Price Details</Heading>
            </Header>
            <Container>
                <Typography>
                    Price ({totalQty} item{totalQty !== 1 ? 's' : ''})
                    <Price>₹{price.toLocaleString()}</Price>
                </Typography>
                <Typography>
                    Discount
                    <Price style={{ color: '#388e3c' }}>- ₹{discount.toLocaleString()}</Price>
                </Typography>
                <Typography>
                    Delivery Charges
                    <Price>₹40</Price>
                </Typography>
                <TotalAmount>
                    Total Amount
                    <Price>₹{(price - discount + 40).toLocaleString()}</Price>
                </TotalAmount>
                {savings > 0 && (
                    <Discount>You will save ₹{savings.toLocaleString()} on this order</Discount>
                )}
            </Container>
        </Box>
    );
};

export default TotalView;