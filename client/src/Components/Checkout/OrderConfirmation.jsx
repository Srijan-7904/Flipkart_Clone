import React from 'react';
import { Box, Typography, Button, styled, Grid } from '@mui/material';
import { CheckCircle, ShoppingBag, Home, ListAlt, LocalShipping, ConfirmationNumber } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

/* ═══════════════════════════════
   THEME CONSTANTS
═══════════════════════════════ */
const PRIMARY    = '#2874f0';
const ACCENT     = '#ffe500';
const BG         = '#f1f3f6';
const SUCCESS    = '#388e3c';
const TEXT_MAIN  = '#212121';
const TEXT_MUTED = '#878787';
const BORDER     = '#e0e0e0';
const FONT       = '"Plus Jakarta Sans", sans-serif';

/* ═══════════════════════════════
   STYLED COMPONENTS
═══════════════════════════════ */

const PageWrapper = styled(Box)(({ theme }) => ({
    background: BG,
    minHeight: '90vh',
    padding: '36px 8%',
    display: 'flex',
    justifyContent: 'center',
    fontFamily: FONT,
    [theme.breakpoints.down('md')]: { padding: '20px 10px' }
}));

const ConfirmCard = styled(Box)`
    background: #fff;
    border-radius: 20px;
    border: 1px solid #ebebeb;
    box-shadow: 0 8px 32px rgba(0,0,0,0.10);
    max-width: 780px;
    width: 100%;
    overflow: hidden;
`;

/* Success banner */
const SuccessBanner = styled(Box)`
    background: linear-gradient(135deg, ${PRIMARY} 0%, #1a56c4 100%);
    padding: 0;
    position: relative;
    overflow: hidden;
    border-radius: 20px 20px 0 0;
`;

const BannerInner = styled(Box)`
    padding: 40px 36px;
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 24px;
`;

/* Decorative circles in banner */
const Circle = styled(Box)(({ size, top, right, opacity }) => ({
    position: 'absolute',
    width: size,
    height: size,
    borderRadius: '50%',
    border: '2px solid rgba(255,255,255,0.15)',
    top: top,
    right: right,
    opacity: opacity || 0.4,
}));

const CheckIconWrap = styled(Box)`
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: ${ACCENT};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
`;

const OrderIdChip = styled(Box)`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(255,255,255,0.15);
    border: 1px solid rgba(255,255,255,0.25);
    border-radius: 20px;
    padding: 6px 16px;
    margin-top: 12px;
    font-family: ${FONT};
    font-size: 13px;
    color: #fff;
    word-break: break-all;
`;

/* Section header */
const SectionHead = styled(Box)`
    padding: 14px 24px;
    background: #f0f5ff;
    border-bottom: 1px solid ${BORDER};
    display: flex;
    align-items: center;
    gap: 8px;
    border-radius: 14px 14px 0 0;
`;

/* Product row */
const ProductRow = styled(Box)`
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px 24px;
    border-bottom: 1px solid #f5f5f5;
    transition: background 0.15s;
    &:last-child { border-bottom: none; }
    &:hover { background: #fafbff; }
`;

/* Info grid card */
const InfoCard = styled(Box)`
    border: 1px solid ${BORDER};
    border-radius: 14px;
    overflow: hidden;
`;

const InfoCardHeader = styled(Box)`
    background: #f0f5ff;
    border-bottom: 1px solid ${BORDER};
    padding: 10px 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: ${FONT};
    font-size: 12px;
    font-weight: 700;
    color: ${PRIMARY};
    text-transform: uppercase;
    letter-spacing: 0.6px;
    border-radius: 14px 14px 0 0;
`;

const InfoCardBody = styled(Box)`
    padding: 14px 16px;
    background: #fff;
`;

/* Action buttons */
const PrimaryBtn = styled(Button)`
    background: ${PRIMARY} !important;
    color: #fff !important;
    font-family: ${FONT} !important;
    font-weight: 700 !important;
    text-transform: none !important;
    border-radius: 50px !important;
    padding: 11px 30px !important;
    transition: transform 0.18s ease, box-shadow 0.18s ease !important;
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(40,116,240,0.32) !important;
    }
`;

const SecondaryBtn = styled(Button)`
    color: ${PRIMARY} !important;
    border-color: ${PRIMARY} !important;
    font-family: ${FONT} !important;
    font-weight: 700 !important;
    text-transform: none !important;
    border-radius: 50px !important;
    padding: 11px 30px !important;
    transition: all 0.18s ease !important;
    &:hover {
        background: #f0f5ff !important;
    }
`;

/* ═══════════════════════════════
   COMPONENT
═══════════════════════════════ */

const OrderConfirmation = () => {
    const navigate  = useNavigate();
    const location  = useLocation();
    const state     = location.state || {};

    const orderId   = state.orderId   || 'ORD-DEMO-001';
    const paymentId = state.paymentId || 'PAY-DEMO-001';
    const amount    = state.amount    || 0;
    const items     = state.items     || [];
    const address   = state.address   || {};

    const deliveryDate = new Date(Date.now() + 5 * 86400000).toDateString();
    const totalQty     = items.reduce((s, i) => s + (i.quantity || 1), 0);

    return (
        <PageWrapper>
            <ConfirmCard>

                {/* ══ SUCCESS BANNER ══ */}
                <SuccessBanner>
                    {/* Decorative circles */}
                    <Circle size="180px" top="-60px" right="-40px" />
                    <Circle size="120px" top="20px"  right="60px"  opacity={0.25} />
                    <Circle size="60px"  top="10px"  right="200px" opacity={0.2} />

                    <BannerInner>
                        <CheckIconWrap>
                            <CheckCircle style={{ fontSize: 40, color: '#1a56c4' }} />
                        </CheckIconWrap>
                        <Box>
                            <Typography fontFamily={FONT} fontWeight={800} fontSize={22} color="#fff" mb={0.5}>
                                Order Placed Successfully! 🎉
                            </Typography>
                            <Typography fontFamily={FONT} fontSize={14} color="rgba(255,255,255,0.85)">
                                Thank you for shopping with us. We'll deliver your items soon!
                            </Typography>
                            <OrderIdChip>
                                <ConfirmationNumber style={{ fontSize: 14 }} />
                                <span style={{ fontWeight: 600 }}>Order ID:</span>
                                <span style={{ fontWeight: 400, opacity: 0.9 }}>{orderId}</span>
                            </OrderIdChip>
                        </Box>
                    </BannerInner>
                </SuccessBanner>

                {/* ══ DELIVERY STRIP ══ */}
                <Box style={{
                    background: '#e8f5e9',
                    borderBottom: '1px solid #c8e6c9',
                    padding: '12px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                }}>
                    <LocalShipping style={{ color: SUCCESS, fontSize: 20 }} />
                    <Typography fontFamily={FONT} fontSize={13} color={SUCCESS} fontWeight={600}>
                        Estimated delivery by <strong>{deliveryDate}</strong>
                        {address.city && <span style={{ fontWeight: 400, opacity: 0.85 }}> · {address.city}</span>}
                    </Typography>
                </Box>

                {/* ══ BODY ══ */}
                <Box padding="24px">

                    <Grid container spacing={2.5} mb={3}>
                        {/* Payment Info */}
                        <Grid item sm={6} xs={12}>
                            <InfoCard>
                                <InfoCardHeader>
                                    <span>💳</span> Payment Info
                                </InfoCardHeader>
                                <InfoCardBody>
                                    <Typography fontFamily={FONT} fontSize={14} fontWeight={700} color={TEXT_MAIN} mb={0.5}>
                                        ₹{amount.toLocaleString()} Paid
                                    </Typography>
                                    <Box display="flex" alignItems="center" gap={0.5} mb={1}>
                                        <CheckCircle style={{ fontSize: 14, color: SUCCESS }} />
                                        <Typography fontFamily={FONT} fontSize={12} color={SUCCESS} fontWeight={600}>
                                            Payment Successful
                                        </Typography>
                                    </Box>
                                    <Typography fontFamily={FONT} fontSize={11} color={TEXT_MUTED}
                                        style={{ wordBreak: 'break-all', lineHeight: 1.6 }}>
                                        Payment ID: {paymentId}
                                    </Typography>
                                </InfoCardBody>
                            </InfoCard>
                        </Grid>

                        {/* Shipping Address */}
                        {address.fullName && (
                            <Grid item sm={6} xs={12}>
                                <InfoCard>
                                    <InfoCardHeader>
                                        <span>📦</span> Shipping Address
                                    </InfoCardHeader>
                                    <InfoCardBody>
                                        <Typography fontFamily={FONT} fontSize={14} fontWeight={700} color={TEXT_MAIN} mb={0.5}>
                                            {address.fullName}
                                        </Typography>
                                        <Typography fontFamily={FONT} fontSize={13} color="#555" lineHeight={1.7}>
                                            {address.addressLine}<br />
                                            {address.city}, {address.state} – {address.pincode}
                                        </Typography>
                                        <Typography fontFamily={FONT} fontSize={12} color={TEXT_MUTED} mt={0.5}>
                                            📞 {address.phone}
                                        </Typography>
                                    </InfoCardBody>
                                </InfoCard>
                            </Grid>
                        )}
                    </Grid>

                    {/* Items */}
                    {items.length > 0 && (
                        <Box style={{ border: `1px solid ${BORDER}`, borderRadius: 6, overflow: 'hidden', marginBottom: 24 }}>
                            <SectionHead>
                                <ShoppingBag style={{ fontSize: 18, color: PRIMARY }} />
                                <Typography fontFamily={FONT} fontWeight={700} fontSize={13} color={PRIMARY}>
                                    Items Ordered · {totalQty} item{totalQty !== 1 ? 's' : ''}
                                </Typography>
                            </SectionHead>
                            {items.map((item, idx) => {
                                const title = item.title?.longTitle || item.title?.shortTitle || 'Product';
                                const cost  = (item.price?.cost ?? 0) * (item.quantity || 1);
                                const qty   = item.quantity || 1;
                                return (
                                    <ProductRow key={item.id || idx}>
                                        <img
                                            src={item.url}
                                            alt={title}
                                            style={{
                                                width: 64, height: 64, objectFit: 'contain',
                                                border: `1px solid ${BORDER}`, borderRadius: 4,
                                                padding: 6, background: '#fff', flexShrink: 0
                                            }}
                                        />
                                        <Box flex={1} minWidth={0}>
                                            <Typography fontFamily={FONT} fontSize={14} fontWeight={500} color={TEXT_MAIN}
                                                style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                {title}
                                            </Typography>
                                            <Typography fontFamily={FONT} fontSize={12} color={TEXT_MUTED} mt={0.4}>
                                                Qty: {qty}
                                            </Typography>
                                        </Box>
                                        <Typography fontFamily={FONT} fontWeight={700} fontSize={15} color={TEXT_MAIN} flexShrink={0}>
                                            ₹{cost.toLocaleString()}
                                        </Typography>
                                    </ProductRow>
                                );
                            })}
                        </Box>
                    )}

                    {/* CTA Buttons */}
                    <Box display="flex" gap={2} flexWrap="wrap">
                        <PrimaryBtn
                            variant="contained"
                            startIcon={<ListAlt />}
                            onClick={() => navigate('/orders')}
                            style={{ flex: 1 }}
                        >
                            View My Orders
                        </PrimaryBtn>
                        <SecondaryBtn
                            variant="outlined"
                            startIcon={<Home />}
                            onClick={() => navigate('/')}
                            style={{ flex: 1 }}
                        >
                            Continue Shopping
                        </SecondaryBtn>
                    </Box>

                    {/* Safe badge */}
                    <Box mt={2.5} display="flex" justifyContent="center" alignItems="center" gap={1}>
                        <span style={{ fontSize: 16 }}>🛡️</span>
                        <Typography fontFamily={FONT} fontSize={12} color={TEXT_MUTED} textAlign="center">
                            Safe and Secure Payments · Easy Returns · 100% Authentic Products
                        </Typography>
                    </Box>
                </Box>
            </ConfirmCard>
        </PageWrapper>
    );
};

export default OrderConfirmation;
