import { useEffect } from 'react';
import { Box, styled } from '@mui/material';

import NavBar from './Home/NarBar';
import Banner from './Home/Banner';
import MidSlide from './Home/MidSlide';
import MidSection from './Home/MidSection';
import Slide from './Home/Slide';

import { products } from '../constant/data';

const discountProducts  = products.filter(p => ['product1','product2','product5','product6','product7'].includes(p.id));
const suggestedProducts = products.filter(p => ['product3','product4','product5','product6','product7'].includes(p.id));

const Component = styled(Box)`
    padding: 20px 10px;
    background: #F2F2F2;
`;

const Home = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <>
            <NavBar />
            <Component>
                <Banner />
                <MidSlide products={products} />
                <MidSection />
                <Slide
                    data={discountProducts}
                    title='Discounts for You'
                    timer={false}
                    multi={true}
                />
                <Slide
                    data={suggestedProducts}
                    title='Suggested Items'
                    timer={false}
                    multi={true}
                />
            </Component>
        </>
    );
};

export default Home;