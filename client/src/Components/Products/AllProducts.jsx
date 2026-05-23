import React, { useEffect, useState, useContext } from 'react';
import { Box, Grid, Typography, Button, styled, CircularProgress, Card, IconButton, FormControl, RadioGroup, FormControlLabel, Radio, Divider, Chip } from '@mui/material';
import { Favorite, FavoriteBorder, FilterAlt, ClearAll, Star, LocalOffer } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { getProducts as listProducts } from '../../redux/actions/productActions';
import { products as fallbackProducts } from '../../constant/data';
import { LoginContext } from '../../context/ContextProvider';

const Container = styled(Box)(({ theme }) => ({
    padding: '24px 4%',
    background: '#f1f3f6',
    minHeight: '90vh',
    [theme.breakpoints.down('md')]: {
        padding: '12px 6px'
    }
}));

const SidebarCard = styled(Card)`
    padding: 0;
    border-radius: 2px;
    border: none;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 115px;
    background: #ffffff;
`;

const SidebarHeader = styled(Box)`
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f0f0f0;
`;

const SidebarTitle = styled(Typography)`
    font-size: 18px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
    color: #212121;
`;

const FilterSection = styled(Box)`
    padding: 16px;
    border-bottom: 1px solid #f0f0f0;
    &:last-child {
        border-bottom: none;
    }
`;

const FilterLabel = styled(Typography)`
    font-size: 12px;
    font-weight: 500;
    color: #212121;
    margin-bottom: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
`;

const CategoryButton = styled(Button)(({ active }) => ({
    textTransform: 'none',
    justifyContent: 'flex-start',
    width: '100%',
    textAlign: 'left',
    padding: '6px 0',
    borderRadius: 0,
    fontSize: '14px',
    fontWeight: active ? 600 : 400,
    background: 'transparent',
    color: active ? '#2874f0' : '#212121',
    minWidth: 0,
    transition: 'color 0.2s ease',
    '&:hover': {
        background: 'transparent',
        color: '#2874f0'
    }
}));

const Heading = styled(Typography)`
    font-size: 20px;
    font-weight: 600;
    color: #212121;
    margin-bottom: 18px;
`;

const ProductCard = styled(Card)`
    border-radius: 4px;
    background: #ffffff;
    border: 1px solid #f0f0f0;
    box-shadow: none;
    position: relative;
    padding: 20px;
    text-align: left;
    transition: box-shadow 0.2s ease-in-out;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    height: 100%;
    &:hover {
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
        & img {
            transform: scale(1.03);
        }
    }
`;

const ImageContainer = styled(Box)`
    height: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 12px;
    position: relative;
    background: #fff;
`;

const Image = styled('img')({
    maxHeight: '100%',
    maxWidth: '100%',
    objectFit: 'contain',
    transition: 'transform 0.3s ease',
});

const Title = styled(Typography)`
    font-size: 14px;
    font-weight: 500;
    color: #212121;
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
`;

const PriceRow = styled(Box)`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
    margin-top: auto;
    padding-top: 10px;
`;

const Discount = styled(Typography)`
    color: #388e3c;
    font-size: 13px;
    font-weight: 500;
    margin-top: 0;
`;

const Tagline = styled(Typography)`
    color: #878787;
    font-size: 12px;
    margin-top: 2px;
    text-align: left;
`;

const RatingBadge = styled(Box)`
    display: inline-flex;
    align-items: center;
    gap: 3px;
    background: #388e3c;
    color: #ffffff;
    font-size: 11px;
    font-weight: 600;
    padding: 2px 6px;
    border-radius: 3px;
`;

const FilterOptionText = styled(Typography)`
    font-size: 14px;
    color: #212121;
`;

const AllProducts = () => {
    const { products: apiProducts, loading } = useSelector(state => state.getProducts);
    const { wishlist, setWishlist } = useContext(LoginContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    // Filters state
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedPriceRange, setSelectedPriceRange] = useState('All');
    const [selectedDiscount, setSelectedDiscount] = useState('All');
    const [sortBy, setSortBy] = useState('none');

    // Extract search query
    const useQuery = () => {
        return new URLSearchParams(location.search);
    };
    const query = useQuery();
    const searchQuery = query.get('search') || '';

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    const displayProducts = apiProducts && apiProducts.length > 0 ? apiProducts : fallbackProducts;

    // Dynamically fetch available categories from the products list
    const categories = ['All', ...new Set(displayProducts.map(p => p.title?.shortTitle || 'Other'))];

    // Helper to get ratings
    const getProductRating = (id) => {
        const ratings = {
            'product1': { rate: 4.3, count: 245 },
            'product2': { rate: 4.1, count: 189 },
            'product3': { rate: 4.5, count: 312 },
            'product4': { rate: 4.6, count: 524 },
            'product5': { rate: 4.0, count: 98 },
            'product6': { rate: 4.2, count: 147 },
            'product7': { rate: 4.4, count: 418 },
        };
        return ratings[id] || { rate: 4.2, count: 120 };
    };

    // Filter and Sort Logic
    let filteredProducts = [...displayProducts];

    // Search Query Filter
    if (searchQuery) {
        filteredProducts = filteredProducts.filter(p => {
            const titleText = p.title?.longTitle || p.title?.shortTitle || '';
            const descText = p.description || '';
            return titleText.toLowerCase().includes(searchQuery.toLowerCase()) || 
                   descText.toLowerCase().includes(searchQuery.toLowerCase());
        });
    }

    // Category Filter
    if (selectedCategory !== 'All') {
        filteredProducts = filteredProducts.filter(p => (p.title?.shortTitle || 'Other') === selectedCategory);
    }

    // Price Filter
    if (selectedPriceRange !== 'All') {
        filteredProducts = filteredProducts.filter(p => {
            const cost = p.price?.cost || 0;
            if (selectedPriceRange === 'under1000') return cost < 1000;
            if (selectedPriceRange === '1000to2000') return cost >= 1000 && cost <= 2000;
            if (selectedPriceRange === 'over2000') return cost > 2000;
            return true;
        });
    }

    // Discount Filter
    if (selectedDiscount !== 'All') {
        filteredProducts = filteredProducts.filter(p => {
            const discountString = p.price?.discount || '';
            const pct = parseInt(discountString) || 0;
            return pct >= parseInt(selectedDiscount);
        });
    }

    // Sorting
    if (sortBy === 'lowToHigh') {
        filteredProducts.sort((a, b) => (a.price?.cost || 0) - (b.price?.cost || 0));
    } else if (sortBy === 'highToLow') {
        filteredProducts.sort((a, b) => (b.price?.cost || 0) - (a.price?.cost || 0));
    }

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

    const clearAllFilters = () => {
        setSelectedCategory('All');
        setSelectedPriceRange('All');
        setSelectedDiscount('All');
        setSortBy('none');
        if (searchQuery) {
            navigate('/products');
        }
    };

    if (loading) {
        return (
            <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container>
            <Heading>
                {searchQuery ? `Search Results for "${searchQuery}"` : 'Product Catalog'}
            </Heading>

            <Grid container spacing={4}>
                {/* Filters Sidebar */}
                <Grid item lg={3} md={4} sm={12} xs={12}>
                    <SidebarCard>
                        <SidebarHeader>
                            <SidebarTitle>
                                Filters
                            </SidebarTitle>
                            <Button 
                                size="small" 
                                style={{ textTransform: 'none', color: '#2874f0', fontWeight: 500, fontSize: 13, minWidth: 0, padding: 0 }}
                                onClick={clearAllFilters}
                            >
                                Clear All
                            </Button>
                        </SidebarHeader>

                        {/* Sort Section */}
                        <FilterSection>
                            <FilterLabel>Sort By Price</FilterLabel>
                            <FormControl component="fieldset">
                                <RadioGroup value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                    <FormControlLabel value="none" control={<Radio size="small" />} label={<FilterOptionText>None</FilterOptionText>} />
                                    <FormControlLabel value="lowToHigh" control={<Radio size="small" />} label={<FilterOptionText>Low to High</FilterOptionText>} />
                                    <FormControlLabel value="highToLow" control={<Radio size="small" />} label={<FilterOptionText>High to Low</FilterOptionText>} />
                                </RadioGroup>
                            </FormControl>
                        </FilterSection>

                        {/* Category Section */}
                        <FilterSection>
                            <FilterLabel>Categories</FilterLabel>
                            <Box display="flex" flexDirection="column" gap="2px">
                                {categories.map((cat) => (
                                    <CategoryButton 
                                        key={cat} 
                                        active={selectedCategory === cat ? 1 : 0} 
                                        onClick={() => setSelectedCategory(cat)}
                                    >
                                        {cat}
                                    </CategoryButton>
                                ))}
                            </Box>
                        </FilterSection>

                        {/* Price Range Section */}
                        <FilterSection>
                            <FilterLabel>Price Range</FilterLabel>
                            <FormControl component="fieldset">
                                <RadioGroup value={selectedPriceRange} onChange={(e) => setSelectedPriceRange(e.target.value)}>
                                    <FormControlLabel value="All" control={<Radio size="small" />} label={<FilterOptionText>All</FilterOptionText>} />
                                    <FormControlLabel value="under1000" control={<Radio size="small" />} label={<FilterOptionText>Under ₹1,000</FilterOptionText>} />
                                    <FormControlLabel value="1000to2000" control={<Radio size="small" />} label={<FilterOptionText>₹1,000 - ₹2,000</FilterOptionText>} />
                                    <FormControlLabel value="over2000" control={<Radio size="small" />} label={<FilterOptionText>Over ₹2,000</FilterOptionText>} />
                                </RadioGroup>
                            </FormControl>
                        </FilterSection>

                        {/* Discount Section */}
                        <FilterSection>
                            <FilterLabel>Minimum Discount</FilterLabel>
                            <FormControl component="fieldset">
                                <RadioGroup value={selectedDiscount} onChange={(e) => setSelectedDiscount(e.target.value)}>
                                    <FormControlLabel value="All" control={<Radio size="small" />} label={<FilterOptionText>All</FilterOptionText>} />
                                    <FormControlLabel value="40" control={<Radio size="small" />} label={<FilterOptionText>40% and above</FilterOptionText>} />
                                    <FormControlLabel value="50" control={<Radio size="small" />} label={<FilterOptionText>50% and above</FilterOptionText>} />
                                    <FormControlLabel value="60" control={<Radio size="small" />} label={<FilterOptionText>60% and above</FilterOptionText>} />
                                </RadioGroup>
                            </FormControl>
                        </FilterSection>
                    </SidebarCard>
                </Grid>

                {/* Product Grid */}
                <Grid item lg={9} md={8} sm={12} xs={12}>
                    <Box marginBottom="18px" display="flex" justifyContent="space-between" alignItems="center">
                        <Typography style={{ color: '#64748b', fontSize: 14, fontWeight: 500 }}>
                            Showing {filteredProducts.length} of {displayProducts.length} products
                        </Typography>
                    </Box>

                    {filteredProducts.length === 0 ? (
                        <Box 
                            style={{ 
                                padding: '80px 20px', 
                                textAlign: 'center', 
                                background: '#fff', 
                                borderRadius: 12, 
                                border: '1px solid rgba(226, 232, 240, 0.8)',
                                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.02)'
                            }}
                        >
                            <Typography variant="h6" style={{ fontWeight: 700, color: '#0f172a', marginBottom: 10 }}>
                                No Products Match Your Filters
                            </Typography>
                            <Typography style={{ color: '#64748b', marginBottom: 24, fontSize: 14 }}>
                                Try clearing some filters or changing your selections to find products.
                            </Typography>
                            <Button 
                                variant="contained" 
                                style={{ background: '#2874f0', color: '#fff', textTransform: 'none', padding: '8px 24px', borderRadius: '6px', fontWeight: 600 }} 
                                onClick={clearAllFilters}
                            >
                                Reset Filters
                            </Button>
                        </Box>
                    ) : (
                        <Grid container spacing={3}>
                            {filteredProducts.map((product) => {
                                const isWishlisted = wishlist.some(item => item.id === product.id);
                                const rating = getProductRating(product.id);
                                return (
                                    <Grid item lg={4} md={6} sm={6} xs={12} key={product.id}>
                                        <ProductCard onClick={() => navigate(`/product/${product.id}`)}>
                                            <IconButton 
                                                onClick={(e) => toggleWishlist(e, product)}
                                                style={{ 
                                                    position: 'absolute', 
                                                    top: 15, 
                                                    right: 15, 
                                                    background: '#ffffff', 
                                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                                    zIndex: 10
                                                }}
                                                size="small"
                                            >
                                                {isWishlisted ? (
                                                    <Favorite fontSize="small" style={{ color: '#ff3f6c' }} />
                                                ) : (
                                                    <FavoriteBorder fontSize="small" style={{ color: '#64748b' }} />
                                                )}
                                            </IconButton>
                                            <ImageContainer>
                                                <Image src={product.url} alt={product.title?.shortTitle || product.title} />
                                            </ImageContainer>
                                            <Title>{product.title?.longTitle || product.title?.shortTitle}</Title>
                                            <Tagline>{product.tagline}</Tagline>

                                            {/* Ratings row */}
                                            <Box display="flex" alignItems="center" justifyContent="center" gap="6px" mt={1}>
                                                <RatingBadge>
                                                    {rating.rate} <Star style={{ fontSize: 10 }} />
                                                </RatingBadge>
                                                <Typography style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>
                                                    ({rating.count} reviews)
                                                </Typography>
                                            </Box>

                                            <PriceRow>
                                                <Typography style={{ fontWeight: 700, fontSize: 16, color: '#0f172a' }}>₹{product.price?.cost}</Typography>
                                                <Typography style={{ color: '#64748b', fontSize: 13 }}><strike>₹{product.price?.mrp}</strike></Typography>
                                                <Discount>{product.price?.discount} Off</Discount>
                                            </PriceRow>
                                        </ProductCard>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};

export default AllProducts;
