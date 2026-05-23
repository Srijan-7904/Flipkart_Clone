import { Box, Typography, styled, Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material';
import { ExpandMore, KeyboardArrowDown, KeyboardArrowRight, LocationOn, CreditCard } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/actions/cartActions';
import { createRazorpayOrder, verifyRazorpayPayment } from '../../service/api';
import { useContext, useState } from 'react';
import { LoginContext } from '../../context/ContextProvider';

/* ── Styled Components ── */
const Container = styled(Box)`
    font-family: "Plus Jakarta Sans", sans-serif;
    position: relative;
    min-height: 100%;
`;

const Title = styled(Typography)`
    font-size: 15px;
    color: #4a4a4a;
    line-height: 1.4;
    margin-bottom: 8px;
`;

const PriceRow = styled(Box)`
    display: flex;
    align-items: baseline;
    gap: 12px;
    margin-bottom: 16px;
    margin-top: 8px;
`;

const WowDealBox = styled(Box)`
    margin: 16px 0;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #e0e0e0;
`;

const WowBanner = styled(Box)`
    background: linear-gradient(90deg, #1251e6 0%, #2874f0 100%);
    color: #fff;
    padding: 12px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 700;
`;

const WowSub = styled(Box)`
    background: #e3f2fd;
    color: #4a4a4a;
    padding: 10px 16px;
    font-size: 13px;
`;

const SectionBox = styled(Box)`
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    margin-bottom: 16px;
    background: #fff;
    overflow: hidden;
`;

const StyledAccordion = styled(Accordion)`
    box-shadow: none;
    margin: 0 !important;
    &:before { display: none; }
    &.Mui-expanded { margin: 0 !important; }
`;

const AccSummary = styled(AccordionSummary)`
    font-weight: 600;
    font-size: 15px;
    padding: 0 16px;
    min-height: 52px !important;
    & .MuiAccordionSummary-content { margin: 10px 0 !important; }
`;

const ActionBar = styled(Box)`
    display: flex;
    gap: 16px;
    padding-bottom: 24px;
`;

const ActionBtn = styled(Button)`
    flex: 1;
    height: 48px;
    font-weight: 700 !important;
    font-size: 15px !important;
    text-transform: none !important;
    border-radius: 8px !important;
`;

const LocationBox = styled(Box)`
    background: #f0f4f8;
    padding: 12px 16px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
    cursor: pointer;
`;

const CardScroller = styled(Box)`
    display: flex;
    overflow-x: auto;
    gap: 12px;
    padding: 16px;
    padding-top: 8px;
    border-top: 1px solid #f0f0f0;
    background: #fafafa;
    &::-webkit-scrollbar { display: none; }
`;

const OfferCard = styled(Box)`
    min-width: 260px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 12px;
    background: #fff;
    display: flex;
    gap: 12px;
    align-items: flex-start;
`;

const ProductDetail = ({ product }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { username, account } = useContext(LoginContext);

    const [expanded, setExpanded] = useState('offers');
    const inStock = product.inStock !== false;

    const handleAccordion = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const addItemToCart = () => {
        if (!account) {
            alert("Please login first to add items to cart.");
            return;
        }
        if (!inStock) return;
        dispatch(addToCart(product.id, 1));
        navigate('/cart');
    };

    const buyNow = async () => {
        if (!account) {
            alert("Please login first to buy products.");
            return;
        }
        if (!inStock) return;
        const amount = product.price?.cost ?? 336;
        const orderData = await createRazorpayOrder(amount);
        if (!orderData) return;

        const options = {
            key: orderData.key,
            amount: orderData.amount,
            currency: orderData.currency,
            name: 'ShopEZ',
            description: product.title?.shortTitle || 'Product Purchase',
            order_id: orderData.orderId,
            handler: async (response) => {
                const result = await verifyRazorpayPayment({
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                    username: username || 'guest',
                    amount: amount,
                    items: [product],
                });
                if (result?.success) {
                    navigate('/order-confirmation', {
                        state: {
                            orderId: response.razorpay_order_id,
                            paymentId: response.razorpay_payment_id,
                            amount: amount,
                            items: [product],
                            address: { fullName: username || 'Customer' }
                        }
                    });
                }
            },
            prefill: { name: username || 'Customer', email: 'customer@example.com', contact: '9999999999' },
            theme: { color: '#fb641b' },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <Container>
            {/* ── Title ── */}
            <Title>
                {product.title?.longTitle || "AFRANCREATION Analog Watch - For Men & Women TRENDING ANALOG PRI..."}
                <span style={{ color: '#2874f0', fontWeight: 600, cursor: 'pointer' }}>more</span>
            </Title>
            
            {/* ── Price Section ── */}
            <PriceRow>
                <Typography style={{ color: '#388e3c', fontSize: 26, fontWeight: 700, letterSpacing: '-1px' }}>
                    ↓{product.price?.discount || '63%'}
                </Typography>
                <Typography style={{ color: '#878787', fontSize: 18, textDecoration: 'line-through', fontWeight: 500 }}>
                    {product.price?.mrp || '899'}
                </Typography>
                <Typography style={{ fontSize: 28, fontWeight: 700, color: '#212121' }}>
                    ₹{product.price?.cost || '336'}
                </Typography>
            </PriceRow>

            {/* ── WOW Deal ── */}
            <WowDealBox>
                <WowBanner>
                    <Box display="flex" alignItems="center" gap={1.5}>
                        <Box style={{ background: '#fff', color: '#1251e6', padding: '2px 4px', borderRadius: 4, fontSize: 10, fontStyle: 'italic', fontWeight: 900, lineHeight: 1.1, textAlign: 'center' }}>
                            WOW<br/>DEAL
                        </Box>
                        <span style={{ fontSize: 16 }}>Buy at ₹{product.price?.cost - 17 || 319}</span>
                    </Box>
                    <KeyboardArrowDown style={{ fontSize: 20 }} />
                </WowBanner>
                <WowSub>Apply offers for maximum savings!</WowSub>
            </WowDealBox>

            {/* ── Apply for Card Accordion ── */}
            <SectionBox>
                <StyledAccordion expanded={expanded === 'offers'} onChange={handleAccordion('offers')}>
                    <AccSummary expandIcon={<ExpandMore />}>
                        Apply for Card, EMI and Pay Later
                    </AccSummary>
                    <AccordionDetails style={{ padding: 0 }}>
                        <CardScroller>
                            <OfferCard>
                                <CreditCard style={{ color: '#2874f0', fontSize: 32 }} />
                                <Box>
                                    <Typography fontSize={13} fontWeight={600} mb={0.5}>0 Joining Fee | 5% Cashb...</Typography>
                                    <Typography fontSize={12} color="#878787" mb={1}>Flipkart Axis Bank Credit Card</Typography>
                                    <Typography fontSize={13} color="#2874f0" fontWeight={600}>Apply Now &gt;</Typography>
                                </Box>
                            </OfferCard>
                            <OfferCard>
                                <Box style={{ background: '#f5f7fa', padding: '4px', borderRadius: 4 }}>
                                    <img src="https://rukminim1.flixcart.com/www/100/100/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" alt="emi" width="30" height="30" style={{ objectFit: 'contain' }} />
                                </Box>
                                <Box>
                                    <Typography fontSize={13} fontWeight={600} mb={0.5}>Activate EMI</Typography>
                                    <Typography fontSize={12} color="#878787" mb={1}>No Cost EMI available</Typography>
                                    <Typography fontSize={13} color="#2874f0" fontWeight={600}>Check Details &gt;</Typography>
                                </Box>
                            </OfferCard>
                        </CardScroller>
                    </AccordionDetails>
                </StyledAccordion>
            </SectionBox>

            {/* ── Delivery Details ── */}
            <Typography fontSize={16} fontWeight={600} mb={1.5} mt={3}>Delivery details</Typography>
            
            <LocationBox>
                <LocationOn style={{ color: '#878787', fontSize: 18 }} />
                <Typography fontSize={13} color="#4a4a4a" sx={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    Lovely professional University, BH1 hostel, Kapurth...
                </Typography>
                <KeyboardArrowRight style={{ color: '#878787', fontSize: 20 }} />
            </LocationBox>

            {/* ── Action Bar ── */}
            <ActionBar>
                <ActionBtn 
                    variant="outlined" 
                    onClick={addItemToCart}
                    disabled={!inStock}
                    style={{ borderColor: '#e0e0e0', color: '#212121', background: '#fff' }}
                >
                    Add to cart
                </ActionBtn>
                <ActionBtn 
                    variant="contained" 
                    onClick={buyNow}
                    disabled={!inStock}
                    style={{ background: '#ffe500', color: '#212121', boxShadow: 'none' }}
                >
                    Buy at ₹{product.price?.cost || 336}
                </ActionBtn>
            </ActionBar>

        </Container>
    );
};

export default ProductDetail;