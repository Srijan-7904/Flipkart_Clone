import React from 'react';
import { Box, styled, Typography, Grid, Link, Divider, Container } from '@mui/material';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  YouTube, 
  Storefront, 
  Stars, 
  Redeem, 
  HelpOutline 
} from '@mui/icons-material';

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#212121', // Dark charcoal background
  color: '#ffffff',
  padding: '40px 0 25px 0',
  marginTop: theme.spacing(6),
  fontFamily: 'Roboto, Arial, sans-serif',
  borderTop: '1px solid #333333',
}));

const LeftGrid = styled(Grid)(({ theme }) => ({
  paddingRight: '20px',
}));

const RightGrid = styled(Grid)(({ theme }) => ({
  borderLeft: '1px solid #444444',
  paddingLeft: '24px',
  [theme.breakpoints.down('md')]: {
    borderLeft: 'none',
    paddingLeft: '0px',
    marginTop: '30px',
    borderTop: '1px solid #444444',
    paddingTop: '20px'
  }
}));

const ColumnHeading = styled(Typography)`
  font-size: 12px;
  font-weight: 400;
  color: #878787;
  margin-bottom: 12px;
  text-transform: uppercase;
`;

const FooterLink = styled(Link)`
  color: #ffffff;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 6px;
  display: inline-block;
  text-decoration: none;
  &:hover {
    color: #2874f0;
    text-decoration: underline;
  }
`;

const AddressText = styled(Typography)`
  color: #ffffff;
  font-size: 12px;
  line-height: 1.6;
  margin-bottom: 4px;
`;

const BottomLink = styled(Link)`
  color: #ffffff;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  &:hover {
    color: #ffe500;
  }
`;

const PaymentBadge = styled(Box)`
  background: #ffffff;
  padding: 2px 6px;
  border-radius: 2px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #333333;
  min-width: 48px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
`;

// Payment Badge CSS Components
const VisaIcon = () => (
  <span style={{ color: '#1a1f71', fontWeight: 'bold', fontStyle: 'italic', fontSize: '10px', fontFamily: 'sans-serif' }}>VISA</span>
);

const MastercardIcon = () => (
  <span style={{ display: 'inline-flex', alignItems: 'center' }}>
    <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#eb001b', marginRight: -4 }} />
    <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f00', opacity: 0.9 }} />
  </span>
);

const MaestroIcon = () => (
  <span style={{ display: 'inline-flex', alignItems: 'center' }}>
    <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#0064e0', marginRight: -4 }} />
    <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#eb001b', opacity: 0.9 }} />
  </span>
);

const RupayIcon = () => (
  <span style={{ fontWeight: 'bold', fontStyle: 'italic', fontSize: '9px', fontFamily: 'sans-serif' }}>
    <span style={{ color: '#0a529a' }}>Ru</span>
    <span style={{ color: '#a2c842' }}>Pay</span>
  </span>
);

const AmexIcon = () => (
  <span style={{ background: '#017ece', color: '#ffffff', fontWeight: 'bold', fontSize: '8px', padding: '1px 3px', borderRadius: '1px', fontFamily: 'sans-serif', lineHeight: 1 }}>AMEX</span>
);

const NetbankingIcon = () => (
  <span style={{ color: '#2d3b4f', fontWeight: '600', fontSize: '8px', fontFamily: 'sans-serif' }}>NetBanking</span>
);

const Footer = () => {
  return (
    <FooterContainer>
      <Container maxWidth={false} style={{ padding: '0 4%' }}>
        <Grid container spacing={2} style={{ marginBottom: 30 }}>
          {/* Left Grid containing 4 columns */}
          <Grid item lg={7} md={7} sm={12} xs={12}>
            <LeftGrid container spacing={2}>
              {/* Column 1: ABOUT */}
              <Grid item lg={3} md={3} sm={6} xs={6}>
                <ColumnHeading>ABOUT</ColumnHeading>
                <Box display="flex" flexDirection="column">
                  <FooterLink href="#">Contact Us</FooterLink>
                  <FooterLink href="#">About Us</FooterLink>
                  <FooterLink href="#">Careers</FooterLink>
                  <FooterLink href="#">Flipkart Stories</FooterLink>
                  <FooterLink href="#">Press</FooterLink>
                  <FooterLink href="#">Corporate Information</FooterLink>
                </Box>
              </Grid>

              {/* Column 2: GROUP COMPANIES */}
              <Grid item lg={3} md={3} sm={6} xs={6}>
                <ColumnHeading>GROUP COMPANIES</ColumnHeading>
                <Box display="flex" flexDirection="column">
                  <FooterLink href="#">Myntra</FooterLink>
                  <FooterLink href="#">Cleartrip</FooterLink>
                  <FooterLink href="#">Shopsy</FooterLink>
                </Box>
              </Grid>

              {/* Column 3: HELP */}
              <Grid item lg={3} md={3} sm={6} xs={6}>
                <ColumnHeading>HELP</ColumnHeading>
                <Box display="flex" flexDirection="column">
                  <FooterLink href="#">Payments</FooterLink>
                  <FooterLink href="#">Shipping</FooterLink>
                  <FooterLink href="#">Cancellation & Returns</FooterLink>
                  <FooterLink href="#">FAQ</FooterLink>
                </Box>
              </Grid>

              {/* Column 4: CONSUMER POLICY */}
              <Grid item lg={3} md={3} sm={6} xs={6}>
                <ColumnHeading>CONSUMER POLICY</ColumnHeading>
                <Box display="flex" flexDirection="column">
                  <FooterLink href="#">Cancellation & Returns</FooterLink>
                  <FooterLink href="#">Terms Of Use</FooterLink>
                  <FooterLink href="#">Security</FooterLink>
                  <FooterLink href="#">Privacy</FooterLink>
                  <FooterLink href="#">Sitemap</FooterLink>
                  <FooterLink href="#">Grievance Redressal</FooterLink>
                  <FooterLink href="#">EPR Compliance</FooterLink>
                  <FooterLink href="#">FSSAI Food Safety Connect App</FooterLink>
                </Box>
              </Grid>
            </LeftGrid>
          </Grid>

          {/* Right Grid containing Mail and Registered Address */}
          <Grid item lg={5} md={5} sm={12} xs={12}>
            <RightGrid container spacing={2}>
              {/* Column 5: Mail Us */}
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <ColumnHeading>Mail Us:</ColumnHeading>
                <AddressText>Flipkart Internet Private Limited,</AddressText>
                <AddressText>Buildings Alyssa, Begonia &amp;</AddressText>
                <AddressText>Clove Embassy Tech Village,</AddressText>
                <AddressText>Outer Ring Road, Devarabeesanahalli Village,</AddressText>
                <AddressText>Bengaluru, 560103,</AddressText>
                <AddressText>Karnataka, India</AddressText>
                
                <Box mt={3}>
                  <Typography style={{ fontSize: '12px', color: '#878787', marginBottom: '8px' }}>Social:</Typography>
                  <Box display="flex" gap="15px">
                    <Link href="#" style={{ color: '#ffffff', display: 'flex', alignItems: 'center' }}><Facebook style={{ fontSize: 20 }} /></Link>
                    <Link href="#" style={{ color: '#ffffff', display: 'flex', alignItems: 'center' }}><Twitter style={{ fontSize: 20 }} /></Link>
                    <Link href="#" style={{ color: '#ffffff', display: 'flex', alignItems: 'center' }}><YouTube style={{ fontSize: 20 }} /></Link>
                    <Link href="#" style={{ color: '#ffffff', display: 'flex', alignItems: 'center' }}><Instagram style={{ fontSize: 20 }} /></Link>
                  </Box>
                </Box>
              </Grid>

              {/* Column 6: Registered Address */}
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <ColumnHeading>Registered Office Address:</ColumnHeading>
                <AddressText>Flipkart Internet Private Limited,</AddressText>
                <AddressText>Buildings Alyssa, Begonia &amp;</AddressText>
                <AddressText>Clove Embassy Tech Village,</AddressText>
                <AddressText>Outer Ring Road, Devarabeesanahalli Village,</AddressText>
                <AddressText>Bengaluru, 560103,</AddressText>
                <AddressText>Karnataka, India</AddressText>
                <AddressText>CIN : U51109KA2012PTC066107</AddressText>
                <AddressText style={{ marginTop: 8 }}>
                  Telephone: <span style={{ color: '#2874f0', fontWeight: 500 }}>044-45614700</span> / <span style={{ color: '#2874f0', fontWeight: 500 }}>044-67415800</span>
                </AddressText>
              </Grid>
            </RightGrid>
          </Grid>
        </Grid>

        <Divider style={{ backgroundColor: '#333333', marginBottom: 20 }} />

        {/* Footer Bottom Bar */}
        <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
          <Grid item xs={12} lg={7} display="flex" justifyContent="space-between" flexWrap="wrap" gap="15px">
            <BottomLink href="#">
              <Storefront style={{ color: '#ffe500', fontSize: 16 }} />
              <span>Become a Seller</span>
            </BottomLink>
            
            <BottomLink href="#">
              <Stars style={{ color: '#ffe500', fontSize: 16 }} />
              <span>Advertise</span>
            </BottomLink>
            
            <BottomLink href="#">
              <Redeem style={{ color: '#ffe500', fontSize: 16 }} />
              <span>Gift Cards</span>
            </BottomLink>
            
            <BottomLink href="#">
              <HelpOutline style={{ color: '#ffe500', fontSize: 16 }} />
              <span>Help Center</span>
            </BottomLink>

            <Typography style={{ fontSize: 12, color: '#ffffff', display: 'flex', alignItems: 'center' }}>
              © 2007-2026 Flipkart.com
            </Typography>
          </Grid>

          <Grid item xs={12} lg={5} display="flex" justifyContent={{ xs: 'flex-start', lg: 'flex-end' }} gap="10px" flexWrap="wrap">
            <PaymentBadge><VisaIcon /></PaymentBadge>
            <PaymentBadge><MastercardIcon /></PaymentBadge>
            <PaymentBadge><MaestroIcon /></PaymentBadge>
            <PaymentBadge><RupayIcon /></PaymentBadge>
            <PaymentBadge><AmexIcon /></PaymentBadge>
            <PaymentBadge><NetbankingIcon /></PaymentBadge>
          </Grid>
        </Grid>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
