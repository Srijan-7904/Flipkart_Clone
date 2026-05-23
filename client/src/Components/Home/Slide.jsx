import { useContext } from 'react';
import { Button, Divider, Box, Typography, styled, IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import Countdown from 'react-countdown';
import { Link } from 'react-router-dom';
import { LoginContext } from '../../context/ContextProvider';

const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
    tablet:  { breakpoint: { max: 1024, min: 464 },  items: 2 },
    mobile:  { breakpoint: { max: 464,  min: 0 },    items: 1 },
};

const Component = styled(Box)`
    margin-top: 10px;
    background: #FFFFFF;
`;

const Deal = styled(Box)`
    display: flex;    
    padding: 15px 20px;
`;

const DealText = styled(Typography)`
    font-size: 22px;
    font-weight: 600;
    line-height: 32px;
    margin-right: 25px;
`;

const Timer = styled(Box)`
    color: #7f7f7f;
    margin-left: 10px;
    display: flex;
    align-items: center;
`;

const ViewAllButton = styled(Button)`
    margin-left: auto;
    background-color: #2874f0;
    border-radius: 2px;
    font-size: 13px;
    transition: background-color 0.2s ease, transform 0.2s ease !important;
    &:hover {
        background-color: #1a5dc8 !important;
        transform: translateY(-1px);
    }
`;

const Image = styled('img')({
    width: 'auto',
    height: 150,
    transition: 'transform 0.25s ease',
});

const Text = styled(Typography)`
    font-size: 14px;
    margin-top: 5px;
`;

const RenderTimer = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: { display: 'none' },
}));

/* ── Product card: only hover effects, layout untouched ── */
const cardHover = {
    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
    cursor: 'pointer',
    borderRadius: 0,
};

const MultiSlide = ({ data, timer, title }) => {
    const timerURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg';
    const { wishlist, setWishlist } = useContext(LoginContext);

    const toggleWishlist = (e, product) => {
        e.preventDefault();
        e.stopPropagation();
        const isWishlisted = wishlist.some(item => item.id === product.id);
        if (isWishlisted) {
            setWishlist(wishlist.filter(item => item.id !== product.id));
        } else {
            setWishlist([...wishlist, product]);
        }
    };

    const renderer = ({ hours, minutes, seconds }) => (
        <RenderTimer variant="span">
            {hours} : {minutes} : {seconds} Left
        </RenderTimer>
    );

    return (
        <Component>
            <Deal>
                <DealText>{title}</DealText>
                {timer && (
                    <Timer>
                        <img src={timerURL} style={{ width: 24 }} alt="time clock" />
                        <Countdown date={Date.now() + 5.04e+7} renderer={renderer} />
                    </Timer>
                )}
                <Link to="/products" style={{ textDecoration: 'none', marginLeft: 'auto' }}>
                    <ViewAllButton variant="contained" color="primary">View All</ViewAllButton>
                </Link>
            </Deal>
            <Divider />
            <Carousel
                swipeable={false}
                draggable={false}
                responsive={responsive}
                centerMode={true}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={10000}
                keyBoardControl={true}
                showDots={false}
                containerClass="carousel-container"
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                {data.map(temp => (
                    <Link key={temp.id} to={`product/${temp.id}`} style={{ textDecoration: 'none' }}>
                        <Box
                            textAlign="center"
                            style={{ padding: '25px 15px', ...cardHover, position: 'relative' }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.1)';
                                e.currentTarget.querySelector('img').style.transform = 'scale(1.08)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.querySelector('img').style.transform = 'scale(1)';
                            }}
                        >
                            <IconButton 
                                onClick={(e) => toggleWishlist(e, temp)}
                                style={{ 
                                    position: 'absolute', 
                                    top: 10, 
                                    right: 10, 
                                    background: 'rgba(255,255,255,0.9)', 
                                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                                    zIndex: 10
                                }}
                                size="small"
                            >
                                {wishlist.some(item => item.id === temp.id) ? (
                                    <Favorite fontSize="small" style={{ color: '#ff3f6c' }} />
                                ) : (
                                    <FavoriteBorder fontSize="small" style={{ color: '#878787' }} />
                                )}
                            </IconButton>
                            <Image src={temp.url} alt={temp.title?.shortTitle || temp.title} />
                            <Text style={{ fontWeight: 600, color: '#212121' }}>
                                {temp.title?.shortTitle || temp.title}
                            </Text>
                            <Text style={{ color: 'green' }}>{temp.discount}</Text>
                            <Text style={{ color: '#212121', opacity: '.6' }}>{temp.tagline}</Text>
                        </Box>
                    </Link>
                ))}
            </Carousel>
        </Component>
    );
};

const Slide = (props) => (
    <>
        {props.multi === true && <MultiSlide {...props} />}
    </>
);

export default Slide;