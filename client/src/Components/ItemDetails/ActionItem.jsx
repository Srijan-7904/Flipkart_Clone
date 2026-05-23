import { Box, styled, IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useContext } from 'react';
import { LoginContext } from '../../context/ContextProvider';

const GridContainer = styled(Box)`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    padding: 24px;
`;

const ImageBox = styled(Box)`
    position: relative;
    background: #f8f8f8;
    border-radius: 8px;
    padding: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1;
    overflow: hidden;
`;

const StyledImage = styled('img')`
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    mix-blend-mode: multiply;
`;

const ActionItem = ({ product }) => {
    const { wishlist, setWishlist } = useContext(LoginContext);
    const isWishlisted = wishlist.some(item => item.id === product.id);

    const toggleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isWishlisted) {
            setWishlist(wishlist.filter(item => item.id !== product.id));
        } else {
            setWishlist([...wishlist, product]);
        }
    };

    // Make sure we have at least 4 images to show the grid
    let carouselImages = product.images || [];
    if (carouselImages.length === 0) {
        carouselImages = [product.detailUrl, product.detailUrl, product.detailUrl, product.detailUrl].filter(Boolean);
    } else if (carouselImages.length < 4) {
        // Pad with the first image if there are fewer than 4
        while (carouselImages.length < 4) {
            carouselImages.push(carouselImages[0]);
        }
    }

    return (
        <GridContainer>
            {carouselImages.slice(0, 4).map((img, idx) => (
                <ImageBox key={idx}>
                    {idx === 0 && (
                        <IconButton
                            onClick={toggleWishlist}
                            style={{
                                position: 'absolute',
                                top: 12,
                                right: 12,
                                background: '#ffffff',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                zIndex: 10,
                                width: 36, height: 36
                            }}
                        >
                            {isWishlisted ? <Favorite style={{ color: '#ff3f6c', fontSize: 18 }} /> : <FavoriteBorder style={{ color: '#878787', fontSize: 18 }} />}
                        </IconButton>
                    )}
                    <StyledImage src={img} alt={`Product ${idx}`} />
                </ImageBox>
            ))}
        </GridContainer>
    );
};

export default ActionItem;