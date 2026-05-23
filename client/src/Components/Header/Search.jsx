import { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase, List, ListItem, Box, styled } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts as listProducts } from '../../redux/actions/productActions';
import { Link, useNavigate } from 'react-router-dom';
import { products as staticProducts } from '../../constant/data';

const SearchContainer = styled(Box)(({ theme }) => ({
  borderRadius: 8,
  marginLeft: 'auto',
  width: '38%',
  backgroundColor: '#ffffff',
  border: '1px solid #dbdbdb',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  height: 38,
  [theme.breakpoints.down('sm')]: {
    width: '98%',
    marginLeft: 0,
    marginTop: 6,
    height: 35
  }
}));

const SearchIconWrapper = styled(Box)`
  padding: 0 8px 0 12px;
  display: flex;
  color: #878787;
  cursor: pointer;
  align-items: center;
`;

const ListWrapper = styled(List)`
  position: absolute;
  color: #000;
  background: #FFFFFF;
  margin-top: 38px;
  width: 100%;
  border-radius: 0 0 4px 4px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  border: 1px solid #e0e0e0;
  border-top: none;
  max-height: 320px;
  overflow-y: auto;
  z-index: 1000;
`;

const InputSearchBase = styled(InputBase)`
  font-size: 14px;
  width: 100%;
  padding-left: 4px;
  color: #212121;
`;

const Search = () => {
    const [ text, setText ] = useState('');
    const [ open, setOpen ] = useState(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getProducts = useSelector(state => state.getProducts);
    const { products } = getProducts;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    const displayProducts = products && products.length > 0 ? products : staticProducts;

    const getText = (val) => {
        setText(val);
        setOpen(val ? false : true);
    };

    const handleSearchSubmit = (e) => {
        if (e.key === 'Enter' && text.trim()) {
            setOpen(true);
            navigate(`/products?search=${encodeURIComponent(text.trim())}`);
            setText('');
        }
    };

    const handleIconClick = () => {
        if (text.trim()) {
            setOpen(true);
            navigate(`/products?search=${encodeURIComponent(text.trim())}`);
            setText('');
        }
    };

    return (
        <SearchContainer>
            <SearchIconWrapper onClick={handleIconClick}>
              <SearchIcon />
            </SearchIconWrapper>
            <InputSearchBase
              placeholder="Search for Products, Brands and More"
              inputProps={{ 'aria-label': 'search' }}
              value={text}
              onChange={(e) => getText(e.target.value)}
              onKeyDown={handleSearchSubmit}
            />
            {
              text && !open && 
              <ListWrapper style={{ top: 0 }}>
                {
                  displayProducts
                    .filter(product => {
                        const titleText = product.title?.longTitle || product.title?.shortTitle || '';
                        return titleText.toLowerCase().includes(text.toLowerCase());
                    })
                    .map(product => (
                      <ListItem key={product.id} style={{ padding: '4px 20px' }}>
                        <Link 
                          to={`/product/${product.id}`} 
                          style={{ textDecoration:'none', color:'inherit', fontSize: '14px', width: '100%', display: 'block'}}
                          onClick={() => {
                            setOpen(true);
                            setText('');
                          }}  
                        >
                          {product.title?.longTitle || product.title?.shortTitle}
                        </Link>
                      </ListItem>
                    ))
                }  
              </ListWrapper>
            }
        </SearchContainer>
    );
};

export default Search;