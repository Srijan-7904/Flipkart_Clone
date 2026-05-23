import { Box, Grid, keyframes, styled } from '@mui/material';

import ProductDetail from './ProductDetail';
import ActionItem from './ActionItem';
import RecommendedSlider from './RecommendedSlider';

import { useParams } from 'react-router-dom';
import { products } from '../../constant/data';

const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
`;

const Component = styled(Box)(({ theme }) => ({
    marginTop: 64,
    background: '#F1F3F6',
    padding: '16px 120px', /* Even more space on left/right sides */
    animation: `${fadeIn} 0.4s ease`,
    [theme.breakpoints.down('md')]: {
        padding: '16px', /* Less space on mobile/tablet */
    }
}));

const BreadcrumbText = styled(Box)`
    font-size: 13px;
    color: #878787;
    margin-bottom: 12px;
`;

const Container = styled(Grid)(({ theme }) => ({
    background: '#FFFFFF',
    display: 'flex',
    transition: 'box-shadow 0.3s ease',
    '&:hover': {
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    },
    [theme.breakpoints.down('md')]: {
        margin: 0,
    },
}));

const RightContainer = styled(Grid)`
    margin-top: 50px;
    padding-left: 24px;
`;

const DetailView = () => {
    const { id } = useParams();
    const product = products.find(p => p.id === id) || {};

    return (
        <Component>
            {product && Object.keys(product).length > 0 &&
                <>
                    {/* ── Main product card ── */}
                    <Container container>
                        <Grid item xs={12} style={{ padding: '16px 24px 0 24px' }}>
                            <BreadcrumbText>
                                Home / Watches / Wrist Watches / {product.title?.shortTitle || 'Brand'} / {product.title?.longTitle?.substring(0, 30) || 'Product'}...
                            </BreadcrumbText>
                        </Grid>
                        <Grid item lg={5} md={5} sm={12} xs={12} style={{ padding: '0 24px' }}>
                            <ActionItem product={product} />
                        </Grid>
                        <RightContainer item lg={7} md={7} sm={12} xs={12} style={{ padding: '0 24px' }}>
                            <ProductDetail product={product} />
                        </RightContainer>
                    </Container>

                    {/* ── Recommended / Similar Products slider ── */}
                    <RecommendedSlider currentId={id} products={products} />
                </>
            }
        </Component>
    );
};

export default DetailView;