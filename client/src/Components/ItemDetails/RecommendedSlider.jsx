import { Box, Typography, Divider, styled } from '@mui/material';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';

const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
    tablet:  { breakpoint: { max: 1024, min: 600 },  items: 3 },
    mobile:  { breakpoint: { max: 600,  min: 0 },    items: 2 },
};

const Section = styled(Box)`
    background: #fff;
    margin-top: 10px;
    padding: 0 0 12px 0;
`;

const Header = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 20px;
`;

const Title = styled(Typography)`
    font-size: 20px;
    font-weight: 700;
`;

const Card = styled(Box)`
    padding: 18px 10px;
    text-align: center;
    cursor: pointer;
    border-radius: 4px;
    transition: transform 0.24s ease, box-shadow 0.24s ease;
    &:hover {
        transform: translateY(-6px);
        box-shadow: 0 8px 22px rgba(0,0,0,0.12);
    }
    &:hover img {
        transform: scale(1.08);
    }
`;

const ProductImg = styled('img')`
    height: 130px;
    width: auto;
    display: block;
    margin: 0 auto;
    transition: transform 0.24s ease;
    object-fit: contain;
`;

const ProductName = styled(Typography)`
    font-size: 13px;
    font-weight: 600;
    color: #212121;
    margin-top: 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const ProductPrice = styled(Typography)`
    font-size: 14px;
    font-weight: 700;
    color: #212121;
    margin-top: 2px;
`;

const ProductMrp = styled('span')`
    font-size: 12px;
    color: #878787;
    text-decoration: line-through;
    margin-left: 6px;
`;

const ProductDiscount = styled('span')`
    font-size: 12px;
    color: #388E3C;
    margin-left: 6px;
`;

const RecommendedSlider = ({ currentId, products }) => {
    // Show all products except the current one
    const recommended = products.filter(p => p.id !== currentId);

    if (!recommended.length) return null;

    return (
        <Section>
            <Header>
                <Title>Similar Products</Title>
                <Typography style={{ color: '#2874f0', fontSize: 13, cursor: 'pointer', fontWeight: 600 }}>
                    View All →
                </Typography>
            </Header>
            <Divider />
            <Carousel
                swipeable={true}
                draggable={false}
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3000}
                keyBoardControl={true}
                showDots={false}
                containerClass="carousel-container"
                itemClass="carousel-item-padding-40-px"
            >
                {recommended.map(p => (
                    <Link key={p.id} to={`/product/${p.id}`} style={{ textDecoration: 'none' }}>
                        <Card>
                            <ProductImg src={p.url} alt={p.title?.shortTitle} />
                            <ProductName>{p.title?.shortTitle || p.title}</ProductName>
                            <ProductPrice>
                                ₹{p.price?.cost}
                                <ProductMrp>₹{p.price?.mrp}</ProductMrp>
                                <ProductDiscount>{p.price?.discount} off</ProductDiscount>
                            </ProductPrice>
                        </Card>
                    </Link>
                ))}
            </Carousel>
        </Section>
    );
};

export default RecommendedSlider;
