import React, { useState, useContext } from 'react';
import {
    Box, Typography, Grid, TextField, Button, Divider,
    styled, Radio, InputAdornment
} from '@mui/material';
import {
    LocationOn, Payment, CheckCircle, ShoppingBag,
    ArrowBack, ArrowForward, LocalShipping, Phone,
    PinDrop, Person, Home, LocationCity, Map,
    Landscape, CreditCard, Money
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../context/ContextProvider';
import { createRazorpayOrder, verifyRazorpayPayment } from '../../service/api';

/* ═══════════════════════════════════════════
   THEME CONSTANTS (matching site theme)
═══════════════════════════════════════════ */
const PRIMARY    = '#2874f0';
const ACCENT     = '#ffe500';
const BG         = '#f1f3f6';
const ORANGE     = '#fb641b';
const SUCCESS    = '#388e3c';
const TEXT_MAIN  = '#212121';
const TEXT_MUTED = '#878787';
const BORDER     = '#e0e0e0';
const FONT       = '"Plus Jakarta Sans", sans-serif';

/* ═══════════════════════════════════════════
   STYLED COMPONENTS
═══════════════════════════════════════════ */

const PageWrapper = styled(Box)(({ theme }) => ({
    background: BG,
    minHeight: '90vh',
    padding: '28px 8%',
    fontFamily: FONT,
    [theme.breakpoints.down('md')]: { padding: '16px 12px' },
}));

/* ── Stepper ── */
const StepperRow = styled(Box)`
    display: flex;
    align-items: center;
    margin-bottom: 28px;
    gap: 6px;
    background: #fff;
    border-radius: 16px;
    padding: 6px;
    border: 1px solid ${BORDER};
    box-shadow: 0 1px 4px rgba(0,0,0,0.06);
`;

const StepItem = styled(Box)(({ status }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '10px 20px',
    background: status === 'active' ? PRIMARY
              : status === 'done'   ? '#e8f0fe'
              : 'transparent',
    color: status === 'active' ? '#fff'
         : status === 'done'   ? PRIMARY
         : TEXT_MUTED,
    fontFamily: FONT,
    fontWeight: 600,
    fontSize: 14,
    cursor: status === 'done' ? 'pointer' : 'default',
    transition: 'all 0.25s ease',
    flex: 1,
    justifyContent: 'center',
    borderRadius: 12,
    boxShadow: status === 'active' ? '0 4px 14px rgba(40,116,240,0.22)' : 'none',
}));

const StepNumber = styled(Box)(({ status }) => ({
    width: 26,
    height: 26,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: 13,
    flexShrink: 0,
    background: status === 'active' ? '#fff'
              : status === 'done'   ? PRIMARY
              : BORDER,
    color: status === 'active' ? PRIMARY
         : status === 'done'   ? '#fff'
         : TEXT_MUTED,
}));

/* ── Cards ── */
const SectionCard = styled(Box)`
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.07);
    margin-bottom: 20px;
    overflow: hidden;
    border: 1px solid #ebebeb;
`;

const CardBanner = styled(Box)(({ color }) => ({
    background: '#fff',
    color: PRIMARY,
    padding: '16px 26px',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    fontFamily: FONT,
    borderRadius: '16px 16px 0 0',
    borderBottom: `1px solid ${BORDER}`,
}));

const CardBody = styled(Box)`
    padding: 28px 24px;
`;

/* ── Summary card ── */
const SummaryCard = styled(Box)`
    background: #fff;
    border-radius: 16px;
    border: 1px solid #ebebeb;
    box-shadow: 0 4px 20px rgba(0,0,0,0.07);
    position: sticky;
    top: 72px;
    overflow: hidden;
`;

const SummaryHeader = styled(Box)`
    background: #fff;
    color: ${TEXT_MAIN};
    padding: 16px 22px;
    font-family: ${FONT};
    font-weight: 700;
    font-size: 15px;
    border-bottom: 1px solid ${BORDER};
    border-radius: 16px 16px 0 0;
`;

const SummaryRow = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 20px;
    border-bottom: 1px solid #f5f5f5;
    font-family: ${FONT};
    font-size: 14px;
    color: ${TEXT_MAIN};
`;

const SavingsBadge = styled(Box)`
    background: linear-gradient(135deg, #e8f5e9, #f1f8e9);
    border: 1px solid #c8e6c9;
    color: ${SUCCESS};
    font-size: 13px;
    font-weight: 600;
    padding: 10px 20px;
    font-family: ${FONT};
    display: flex;
    align-items: center;
    gap: 6px;
`;

/* ── Address card display ── */
const AddressBox = styled(Box)`
    background: #f7f9ff;
    border: 1.5px solid #c5d8fd;
    border-radius: 14px;
    padding: 16px 20px;
    margin-bottom: 20px;
    display: flex;
    align-items: flex-start;
    gap: 12px;
`;

/* ── Product row in summary ── */
const ProductRow = styled(Box)`
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 24px;
    border-bottom: 1px solid #f5f5f5;
    &:last-child { border-bottom: none; }
    transition: background 0.15s ease;
    &:hover { background: #fafbff; }
`;

const ProductImg = styled('img')`
    width: 68px;
    height: 68px;
    object-fit: contain;
    border: 1px solid ${BORDER};
    border-radius: 10px;
    padding: 6px;
    background: #fff;
    flex-shrink: 0;
`;

/* ── Payment option ── */
const PayOption = styled(Box)(({ selected }) => ({
    border: `1.5px solid ${selected ? PRIMARY : BORDER}`,
    borderRadius: 14,
    padding: '16px 20px',
    marginBottom: 14,
    background: selected ? '#f0f5ff' : '#fafafa',
    cursor: 'pointer',
    transition: 'all 0.22s ease',
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    boxShadow: selected ? '0 4px 16px rgba(40,116,240,0.14)' : 'none',
    '&:hover': {
        borderColor: PRIMARY,
        background: '#f3f7ff',
        boxShadow: '0 2px 10px rgba(40,116,240,0.08)',
    },
}));

const PayIconBox = styled(Box)(({ color }) => ({
    width: 46,
    height: 46,
    borderRadius: 12,
    background: color || '#e8f0fe',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
}));

/* ── Action Buttons ── */
const PrimaryBtn = styled(Button)`
    background: ${ORANGE} !important;
    color: #fff !important;
    font-family: ${FONT} !important;
    font-weight: 700 !important;
    font-size: 15px !important;
    padding: 12px 36px !important;
    border-radius: 50px !important;
    letter-spacing: 0.3px !important;
    text-transform: none !important;
    transition: transform 0.18s ease, box-shadow 0.18s ease !important;
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 28px rgba(251,100,27,0.38) !important;
    }
    &:active { transform: translateY(0) !important; }
    &:disabled { background: #bdbdbd !important; }
`;

const GhostBtn = styled(Button)`
    color: ${PRIMARY} !important;
    font-family: ${FONT} !important;
    font-weight: 600 !important;
    font-size: 14px !important;
    text-transform: none !important;
    padding: 10px 0 !important;
`;

/* ── Delivery strip ── */
const DeliveryStrip = styled(Box)`
    background: #e8f5e9;
    border: 1px solid #c8e6c9;
    border-radius: 12px;
    padding: 12px 18px;
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 16px 24px;
    font-family: ${FONT};
    font-size: 13px;
    color: ${SUCCESS};
    font-weight: 500;
`;

/* ═══════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════ */

const Checkout = () => {
    const navigate     = useNavigate();
    const cartDetails  = useSelector(state => state.cart);
    const { cartItems } = cartDetails;
    const { username } = useContext(LoginContext);

    const [activeStep,     setActiveStep]     = useState(0);
    const [paymentMethod,  setPaymentMethod]  = useState('razorpay');

    const [address, setAddress] = useState({
        fullName: '', phone: '', pincode: '',
        addressLine: '', city: '', state: '', landmark: '',
    });
    const [errors, setErrors] = useState({});

    /* ── Price math ── */
    const totalMRP      = cartItems.reduce((s, i) => s + (i.price?.mrp  ?? 0) * (i.quantity || 1), 0);
    const totalCost     = cartItems.reduce((s, i) => s + (i.price?.cost ?? 0) * (i.quantity || 1), 0);
    const totalDiscount = totalMRP - totalCost;
    const deliveryFee   = 40;
    const grandTotal    = totalCost + deliveryFee;
    const totalQty      = cartItems.reduce((s, i) => s + (i.quantity || 1), 0);

    /* ── Validation ── */
    const validateAddress = () => {
        const e = {};
        if (!address.fullName.trim())           e.fullName    = 'Full name is required';
        if (!/^[6-9]\d{9}$/.test(address.phone)) e.phone     = 'Enter valid 10-digit mobile number';
        if (!/^\d{6}$/.test(address.pincode))   e.pincode    = 'Enter valid 6-digit pincode';
        if (!address.addressLine.trim())         e.addressLine = 'Address is required';
        if (!address.city.trim())               e.city        = 'City is required';
        if (!address.state.trim())              e.state       = 'State is required';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleNext = () => {
        if (activeStep === 0 && !validateAddress()) return;
        setActiveStep(s => s + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const handleBack = () => {
        setActiveStep(s => s - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    /* ── Place order ── */
    const handlePlaceOrder = async () => {
        const orderData = await createRazorpayOrder(grandTotal);
        if (!orderData) return;
        const options = {
            key: orderData.key,
            amount: orderData.amount,
            currency: orderData.currency,
            name: 'ShopEZ',
            description: 'Order Payment',
            order_id: orderData.orderId,
            handler: async (response) => {
                const result = await verifyRazorpayPayment({
                    razorpay_order_id:    response.razorpay_order_id,
                    razorpay_payment_id:  response.razorpay_payment_id,
                    razorpay_signature:   response.razorpay_signature,
                    username: username || 'guest',
                    amount:   grandTotal,
                    items:    cartItems,
                    shippingAddress: address,
                });
                if (result?.success) {
                    navigate('/order-confirmation', {
                        state: {
                            orderId:   response.razorpay_order_id,
                            paymentId: response.razorpay_payment_id,
                            amount:    grandTotal,
                            items:     cartItems,
                            address,
                        }
                    });
                } else {
                    alert('Payment verification failed. Please contact support.');
                }
            },
            prefill: {
                name:    address.fullName || 'Customer',
                email:   'customer@example.com',
                contact: address.phone || '9999999999',
            },
            theme: { color: PRIMARY },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    /* ── Empty cart ── */
    if (cartItems.length === 0) {
        return (
            <PageWrapper>
                <Box textAlign="center" padding="80px 0">
                    <ShoppingBag style={{ fontSize: 80, color: '#c2c2c2', marginBottom: 20 }} />
                    <Typography variant="h5" fontWeight={700} fontFamily={FONT} mb={1}>Your cart is empty</Typography>
                    <Typography color={TEXT_MUTED} fontFamily={FONT} mb={3}>Add items before checking out</Typography>
                    <PrimaryBtn variant="contained" onClick={() => navigate('/')}>Shop Now</PrimaryBtn>
                </Box>
            </PageWrapper>
        );
    }

    const steps = [
        { label: 'Delivery Address', icon: <LocationOn style={{ fontSize: 18 }} /> },
        { label: 'Order Summary',    icon: <ShoppingBag style={{ fontSize: 18 }} /> },
        { label: 'Payment',          icon: <Payment style={{ fontSize: 18 }} /> },
    ];

    const getStatus = (idx) =>
        activeStep > idx ? 'done' : activeStep === idx ? 'active' : 'idle';

    return (
        <PageWrapper>

            {/* ── Top breadcrumb ── */}
            <Box display="flex" alignItems="center" gap={1} mb={2.5}>
                <GhostBtn startIcon={<ArrowBack style={{ fontSize: 18 }} />} onClick={() => navigate('/cart')}>
                    Back to Cart
                </GhostBtn>
                <Typography color={TEXT_MUTED} fontSize={13} fontFamily={FONT}>›</Typography>
                <Typography color={TEXT_MUTED} fontSize={13} fontFamily={FONT}>Checkout</Typography>
            </Box>

            {/* ── Step Header Bar ── */}
            <StepperRow>
                {steps.map((step, idx) => {
                    const status = getStatus(idx);
                    return (
                        <StepItem
                            key={idx}
                            status={status}
                            onClick={() => status === 'done' && setActiveStep(idx)}
                        >
                            <StepNumber status={status}>
                                {status === 'done'
                                    ? <CheckCircle style={{ fontSize: 16 }} />
                                    : idx + 1
                                }
                            </StepNumber>
                            <Typography fontFamily={FONT} fontWeight={600} fontSize={14}>
                                {step.label}
                            </Typography>
                        </StepItem>
                    );
                })}
            </StepperRow>

            <Grid container spacing={2.5}>
                {/* ════════════════════════════
                    LEFT COLUMN
                ════════════════════════════ */}
                <Grid item lg={8} md={8} sm={12} xs={12}>

                    {/* ╔══════════════════╗
                        ║  STEP 1: ADDRESS ║
                        ╚══════════════════╝ */}
                    {activeStep === 0 && (
                        <SectionCard>
                            <CardBanner>
                                <LocationOn style={{ fontSize: 22 }} />
                                <Box>
                                    <Typography fontFamily={FONT} fontWeight={700} fontSize={15}>
                                        Delivery Address
                                    </Typography>
                                    <Typography fontFamily={FONT} fontSize={12} style={{ opacity: 0.8 }}>
                                        Enter your shipping address
                                    </Typography>
                                </Box>
                            </CardBanner>

                            <CardBody>
                                <Grid container spacing={2.5}>
                                    {/* Full Name */}
                                    <Grid item sm={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Full Name"
                                            variant="outlined"
                                            size="small"
                                            value={address.fullName}
                                            onChange={e => setAddress({ ...address, fullName: e.target.value })}
                                            error={!!errors.fullName}
                                            helperText={errors.fullName}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Person style={{ fontSize: 18, color: PRIMARY }} />
                                                    </InputAdornment>
                                                )
                                            }}
                                            sx={{ '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: PRIMARY } }}
                                        />
                                    </Grid>

                                    {/* Phone */}
                                    <Grid item sm={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Mobile Number"
                                            variant="outlined"
                                            size="small"
                                            value={address.phone}
                                            onChange={e => setAddress({ ...address, phone: e.target.value })}
                                            error={!!errors.phone}
                                            helperText={errors.phone}
                                            inputProps={{ maxLength: 10 }}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Phone style={{ fontSize: 18, color: PRIMARY }} />
                                                    </InputAdornment>
                                                )
                                            }}
                                            sx={{ '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: PRIMARY } }}
                                        />
                                    </Grid>

                                    {/* Pincode */}
                                    <Grid item sm={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Pincode"
                                            variant="outlined"
                                            size="small"
                                            value={address.pincode}
                                            onChange={e => setAddress({ ...address, pincode: e.target.value })}
                                            error={!!errors.pincode}
                                            helperText={errors.pincode}
                                            inputProps={{ maxLength: 6 }}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PinDrop style={{ fontSize: 18, color: PRIMARY }} />
                                                    </InputAdornment>
                                                )
                                            }}
                                            sx={{ '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: PRIMARY } }}
                                        />
                                    </Grid>

                                    {/* City */}
                                    <Grid item sm={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            label="City / District / Town"
                                            variant="outlined"
                                            size="small"
                                            value={address.city}
                                            onChange={e => setAddress({ ...address, city: e.target.value })}
                                            error={!!errors.city}
                                            helperText={errors.city}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <LocationCity style={{ fontSize: 18, color: PRIMARY }} />
                                                    </InputAdornment>
                                                )
                                            }}
                                            sx={{ '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: PRIMARY } }}
                                        />
                                    </Grid>

                                    {/* Address line */}
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Address (House No., Building, Street, Area)"
                                            variant="outlined"
                                            size="small"
                                            multiline
                                            rows={2}
                                            value={address.addressLine}
                                            onChange={e => setAddress({ ...address, addressLine: e.target.value })}
                                            error={!!errors.addressLine}
                                            helperText={errors.addressLine}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start" style={{ alignSelf: 'flex-start', marginTop: 8 }}>
                                                        <Home style={{ fontSize: 18, color: PRIMARY }} />
                                                    </InputAdornment>
                                                )
                                            }}
                                            sx={{ '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: PRIMARY } }}
                                        />
                                    </Grid>

                                    {/* State */}
                                    <Grid item sm={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            label="State"
                                            variant="outlined"
                                            size="small"
                                            value={address.state}
                                            onChange={e => setAddress({ ...address, state: e.target.value })}
                                            error={!!errors.state}
                                            helperText={errors.state}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Landscape style={{ fontSize: 18, color: PRIMARY }} />
                                                    </InputAdornment>
                                                )
                                            }}
                                            sx={{ '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: PRIMARY } }}
                                        />
                                    </Grid>

                                    {/* Landmark */}
                                    <Grid item sm={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Landmark (Optional)"
                                            variant="outlined"
                                            size="small"
                                            value={address.landmark}
                                            onChange={e => setAddress({ ...address, landmark: e.target.value })}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Map style={{ fontSize: 18, color: '#bdbdbd' }} />
                                                    </InputAdornment>
                                                )
                                            }}
                                            sx={{ '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: PRIMARY } }}
                                        />
                                    </Grid>
                                </Grid>

                                {/* CTA */}
                                <Box mt={3.5} display="flex" justifyContent="flex-end">
                                    <PrimaryBtn
                                        variant="contained"
                                        onClick={handleNext}
                                        endIcon={<ArrowForward />}
                                    >
                                        Save & Continue
                                    </PrimaryBtn>
                                </Box>
                            </CardBody>
                        </SectionCard>
                    )}

                    {/* ╔═══════════════════════╗
                        ║  STEP 2: ORDER REVIEW ║
                        ╚═══════════════════════╝ */}
                    {activeStep === 1 && (
                        <SectionCard>
                            <CardBanner>
                                <ShoppingBag style={{ fontSize: 22 }} />
                                <Box>
                                    <Typography fontFamily={FONT} fontWeight={700} fontSize={15}>
                                        Order Summary
                                    </Typography>
                                    <Typography fontFamily={FONT} fontSize={12} style={{ opacity: 0.8 }}>
                                        {totalQty} item{totalQty !== 1 ? 's' : ''} · Review before you pay
                                    </Typography>
                                </Box>
                            </CardBanner>

                            {/* Delivery address pill */}
                            <Box px={3} pt={2.5}>
                                <AddressBox>
                                    <LocationOn style={{ color: PRIMARY, fontSize: 22, marginTop: 2, flexShrink: 0 }} />
                                    <Box>
                                        <Typography fontFamily={FONT} fontWeight={700} fontSize={13} color={PRIMARY} mb={0.5}>
                                            Delivering to
                                        </Typography>
                                        <Typography fontFamily={FONT} fontWeight={600} fontSize={14} color={TEXT_MAIN}>
                                            {address.fullName}
                                        </Typography>
                                        <Typography fontFamily={FONT} fontSize={13} color="#555" lineHeight={1.6}>
                                            {address.addressLine}, {address.city}, {address.state} – {address.pincode}
                                        </Typography>
                                        <Typography fontFamily={FONT} fontSize={12} color={TEXT_MUTED}>
                                            📞 {address.phone}
                                        </Typography>
                                    </Box>
                                    <Button
                                        size="small"
                                        onClick={handleBack}
                                        style={{ marginLeft: 'auto', textTransform: 'none', color: PRIMARY, fontFamily: FONT, fontWeight: 600, flexShrink: 0 }}
                                    >
                                        Change
                                    </Button>
                                </AddressBox>
                            </Box>

                            {/* Items */}
                            <Divider />
                            {cartItems.map((item, idx) => {
                                const title = item.title?.longTitle || item.title?.shortTitle || 'Product';
                                const cost  = (item.price?.cost ?? 0) * (item.quantity || 1);
                                const mrp   = (item.price?.mrp  ?? 0) * (item.quantity || 1);
                                const qty   = item.quantity || 1;
                                return (
                                    <ProductRow key={item.id || idx}>
                                        <ProductImg src={item.url} alt={title} onError={e => e.target.style.opacity = 0} />
                                        <Box flex={1} minWidth={0}>
                                            <Typography fontFamily={FONT} fontWeight={500} fontSize={14} color={TEXT_MAIN}
                                                style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                {title}
                                            </Typography>
                                            <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                                                {item.price?.discount && (
                                                    <Box style={{
                                                        background: '#fff9c4', color: '#f57f17',
                                                        borderRadius: 3, padding: '1px 7px',
                                                        fontSize: 11, fontWeight: 700, fontFamily: FONT
                                                    }}>
                                                        {item.price.discount} OFF
                                                    </Box>
                                                )}
                                                <Typography fontFamily={FONT} fontSize={12} color={TEXT_MUTED}>
                                                    Qty: {qty}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box textAlign="right" flexShrink={0}>
                                            <Typography fontFamily={FONT} fontWeight={700} fontSize={15} color={TEXT_MAIN}>
                                                ₹{cost.toLocaleString()}
                                            </Typography>
                                            {mrp > cost && (
                                                <Typography fontFamily={FONT} fontSize={12} color={TEXT_MUTED}
                                                    style={{ textDecoration: 'line-through' }}>
                                                    ₹{mrp.toLocaleString()}
                                                </Typography>
                                            )}
                                        </Box>
                                    </ProductRow>
                                );
                            })}

                            {/* Estimated delivery strip */}
                            <DeliveryStrip>
                                <LocalShipping style={{ fontSize: 18 }} />
                                <span>Estimated delivery by <strong>{new Date(Date.now() + 5 * 86400000).toDateString()}</strong></span>
                            </DeliveryStrip>

                            {/* CTAs */}
                            <Box px={3} pb={3} display="flex" justifyContent="space-between" alignItems="center">
                                <GhostBtn startIcon={<ArrowBack style={{ fontSize: 16 }} />} onClick={handleBack}>
                                    Back
                                </GhostBtn>
                                <PrimaryBtn variant="contained" onClick={handleNext} endIcon={<ArrowForward />}>
                                    Continue to Payment
                                </PrimaryBtn>
                            </Box>
                        </SectionCard>
                    )}

                    {/* ╔═════════════════╗
                        ║  STEP 3: PAYMENT║
                        ╚═════════════════╝ */}
                    {activeStep === 2 && (
                        <SectionCard>
                            <CardBanner color="#1a56c4">
                                <Payment style={{ fontSize: 22 }} />
                                <Box>
                                    <Typography fontFamily={FONT} fontWeight={700} fontSize={15}>
                                        Payment Options
                                    </Typography>
                                    <Typography fontFamily={FONT} fontSize={12} style={{ opacity: 0.8 }}>
                                        All transactions are 100% secure
                                    </Typography>
                                </Box>
                                {/* Yellow secure lock badge */}
                                <Box ml="auto" style={{
                                    background: ACCENT, color: '#000',
                                    borderRadius: 20, padding: '4px 12px',
                                    fontSize: 11, fontWeight: 700, fontFamily: FONT,
                                    display: 'flex', alignItems: 'center', gap: 4
                                }}>
                                    🔒 Secure
                                </Box>
                            </CardBanner>

                            <CardBody>
                                {/* Pay Online */}
                                <PayOption selected={paymentMethod === 'razorpay'} onClick={() => setPaymentMethod('razorpay')}>
                                    <Radio
                                        checked={paymentMethod === 'razorpay'}
                                        onChange={() => setPaymentMethod('razorpay')}
                                        style={{ color: PRIMARY, padding: 0 }}
                                        size="small"
                                    />
                                    <PayIconBox color="#e8f0fe">
                                        <CreditCard style={{ color: PRIMARY, fontSize: 22 }} />
                                    </PayIconBox>
                                    <Box>
                                        <Typography fontFamily={FONT} fontWeight={700} fontSize={14} color={TEXT_MAIN}>
                                            Pay Online
                                        </Typography>
                                        <Typography fontFamily={FONT} fontSize={12} color={TEXT_MUTED}>
                                            Credit / Debit Card · UPI · Net Banking · Wallets
                                        </Typography>
                                    </Box>
                                    {paymentMethod === 'razorpay' && (
                                        <Box ml="auto" style={{
                                            background: '#e8f5e9', color: SUCCESS,
                                            borderRadius: 20, padding: '3px 10px',
                                            fontSize: 11, fontWeight: 700, fontFamily: FONT
                                        }}>
                                            Selected
                                        </Box>
                                    )}
                                </PayOption>

                                {/* Cash on delivery */}
                                <PayOption selected={paymentMethod === 'cod'} onClick={() => setPaymentMethod('cod')}>
                                    <Radio
                                        checked={paymentMethod === 'cod'}
                                        onChange={() => setPaymentMethod('cod')}
                                        style={{ color: PRIMARY, padding: 0 }}
                                        size="small"
                                    />
                                    <PayIconBox color="#fff8e1">
                                        <Money style={{ color: '#f9a825', fontSize: 22 }} />
                                    </PayIconBox>
                                    <Box>
                                        <Typography fontFamily={FONT} fontWeight={700} fontSize={14} color={TEXT_MAIN}>
                                            Cash on Delivery
                                        </Typography>
                                        <Typography fontFamily={FONT} fontSize={12} color={TEXT_MUTED}>
                                            Pay when your order arrives at your doorstep
                                        </Typography>
                                    </Box>
                                    {paymentMethod === 'cod' && (
                                        <Box ml="auto" style={{
                                            background: '#e8f5e9', color: SUCCESS,
                                            borderRadius: 20, padding: '3px 10px',
                                            fontSize: 11, fontWeight: 700, fontFamily: FONT
                                        }}>
                                            Selected
                                        </Box>
                                    )}
                                </PayOption>

                                {/* Order total recap */}
                                <Box style={{
                                    background: '#f7f9ff',
                                    border: `1px solid #d5e3fd`,
                                    borderRadius: 6,
                                    padding: '14px 18px',
                                    marginTop: 20,
                                    marginBottom: 24,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <Box>
                                        <Typography fontFamily={FONT} fontSize={13} color={TEXT_MUTED}>
                                            Total payable amount
                                        </Typography>
                                        <Typography fontFamily={FONT} fontWeight={800} fontSize={22} color={PRIMARY}>
                                            ₹{grandTotal.toLocaleString()}
                                        </Typography>
                                    </Box>
                                    {totalDiscount > 0 && (
                                        <Box style={{
                                            background: '#e8f5e9', color: SUCCESS,
                                            border: '1px solid #c8e6c9',
                                            borderRadius: 6, padding: '6px 14px',
                                            textAlign: 'center'
                                        }}>
                                            <Typography fontFamily={FONT} fontSize={11} color={SUCCESS}>You save</Typography>
                                            <Typography fontFamily={FONT} fontWeight={700} fontSize={15} color={SUCCESS}>
                                                ₹{(totalDiscount - deliveryFee).toLocaleString()}
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>

                                {/* CTAs */}
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <GhostBtn startIcon={<ArrowBack style={{ fontSize: 16 }} />} onClick={handleBack}>
                                        Back
                                    </GhostBtn>
                                    <PrimaryBtn
                                        variant="contained"
                                        onClick={handlePlaceOrder}
                                        style={{ fontSize: '16px', padding: '13px 44px' }}
                                    >
                                        Place Order — ₹{grandTotal.toLocaleString()}
                                    </PrimaryBtn>
                                </Box>
                            </CardBody>
                        </SectionCard>
                    )}
                </Grid>

                {/* ════════════════════════════
                    RIGHT COLUMN: PRICE SUMMARY
                ════════════════════════════ */}
                <Grid item lg={4} md={4} sm={12} xs={12}>
                    <SummaryCard>
                        <SummaryHeader>Price Details</SummaryHeader>

                        <SummaryRow>
                            <Typography fontFamily={FONT} fontSize={14} color={TEXT_MAIN}>
                                Price ({totalQty} item{totalQty !== 1 ? 's' : ''})
                            </Typography>
                            <Typography fontFamily={FONT} fontSize={14} color={TEXT_MAIN}>
                                ₹{totalMRP.toLocaleString()}
                            </Typography>
                        </SummaryRow>

                        <SummaryRow>
                            <Typography fontFamily={FONT} fontSize={14} color={TEXT_MAIN}>Discount</Typography>
                            <Typography fontFamily={FONT} fontSize={14} fontWeight={600} color={SUCCESS}>
                                − ₹{totalDiscount.toLocaleString()}
                            </Typography>
                        </SummaryRow>

                        <SummaryRow>
                            <Typography fontFamily={FONT} fontSize={14} color={TEXT_MAIN}>Delivery Charges</Typography>
                            <Typography fontFamily={FONT} fontSize={14} color={TEXT_MAIN}>₹{deliveryFee}</Typography>
                        </SummaryRow>

                        <Box style={{ borderTop: `2px dashed ${BORDER}`, padding: '16px 20px' }}>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography fontFamily={FONT} fontWeight={700} fontSize={16} color={TEXT_MAIN}>
                                    Total Amount
                                </Typography>
                                <Typography fontFamily={FONT} fontWeight={800} fontSize={18} color={TEXT_MAIN}>
                                    ₹{grandTotal.toLocaleString()}
                                </Typography>
                            </Box>
                        </Box>

                        {totalDiscount > 0 && (
                            <SavingsBadge>
                                <span>🎉</span>
                                You will save <strong>₹{(totalDiscount - deliveryFee).toLocaleString()}</strong> on this order
                            </SavingsBadge>
                        )}

                        {/* Mini item list */}
                        <Box style={{ borderTop: `1px solid ${BORDER}`, padding: '14px 20px 6px' }}>
                            <Typography fontFamily={FONT} fontSize={12} color={TEXT_MUTED}
                                fontWeight={600} textTransform="uppercase" letterSpacing={0.5} mb={1.5}>
                                Items in this order
                            </Typography>
                            {cartItems.map((item, idx) => (
                                <Box key={item.id || idx} display="flex" alignItems="center" gap={1.5} mb={1.5}>
                                    <img
                                        src={item.url}
                                        alt={item.title?.shortTitle}
                                        style={{ width: 36, height: 36, objectFit: 'contain', border: `1px solid ${BORDER}`, borderRadius: 3, padding: 2, flexShrink: 0 }}
                                    />
                                    <Typography fontFamily={FONT} fontSize={12} color={TEXT_MAIN}
                                        style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                                        {item.title?.shortTitle || item.title?.longTitle}
                                    </Typography>
                                    <Typography fontFamily={FONT} fontSize={12} fontWeight={700} color={TEXT_MAIN} flexShrink={0}>
                                        ×{item.quantity || 1}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>

                        {/* Safe shopping badge */}
                        <Box style={{
                            borderTop: `1px solid ${BORDER}`,
                            padding: '12px 20px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            background: '#fafafa'
                        }}>
                            <span style={{ fontSize: 18 }}>🛡️</span>
                            <Typography fontFamily={FONT} fontSize={12} color={TEXT_MUTED}>
                                Safe and Secure Payments. Easy returns. 100% Authentic products.
                            </Typography>
                        </Box>
                    </SummaryCard>
                </Grid>
            </Grid>
        </PageWrapper>
    );
};

export default Checkout;
