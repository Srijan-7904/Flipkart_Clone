import { Card, Box, Typography, styled } from '@mui/material';
import { addEllipsis } from '../../utils/util';
import GroupButton from './GroupButton';

const Component = styled(Card)`
    border-top: 1px solid #f0f0f0;
    border-radius: 0px;
    display: flex;
`;

const LeftComponent = styled(Box)`
    margin: 20px; 
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SmallText = styled(Typography)`
    color: #878787;
    font-size: 14px;
    margin-top: 10px;
`;

const CostText = styled('span')`
    font-size: 18px;
    font-weight: 600;
`;

const MRPText = styled('span')`
    color: #878787;
    text-decoration: line-through;
    margin-left: 8px;
`;

const DiscountText = styled('span')`
    color: #388E3C;
    font-size: 14px;
    margin-left: 8px;
`;

const RemoveButton = styled(Typography)`
    margin-top: 16px;
    font-size: 14px;
    font-weight: 500;
    color: #2874f0;
    cursor: pointer;
    &:hover { text-decoration: underline; }
`;

const PLACEHOLDER = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="110" height="110">' +
    '<rect width="110" height="110" fill="#eee"/>' +
    '<text x="55" y="60" font-size="11" fill="#aaa" text-anchor="middle" font-family="Arial">No Image</text>' +
    '</svg>'
);

const CartItem = ({ item, removeItemFromCart }) => {
    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png';

    const imageUrl   = item?.url || PLACEHOLDER;
    const shortTitle = item?.title?.shortTitle || item?.shortTitle || '';
    const longTitle  = item?.title?.longTitle  || item?.longTitle  || 'Unknown Product';
    const cost       = item?.price?.cost       || item?.cost       || 0;
    const mrp        = item?.price?.mrp        || item?.mrp        || 0;
    const discount   = item?.price?.discount   || item?.discount   || '';
    const quantity   = item?.quantity || 1;

    return (
        <Component>
            <LeftComponent>
                <img
                    src={imageUrl}
                    alt={shortTitle || 'product image'}
                    style={{ height: 110, width: 110, objectFit: 'contain' }}
                    onError={(e) => { e.target.src = PLACEHOLDER; }}
                />
                {/* Wired quantity controls */}
                <GroupButton item={item} />
            </LeftComponent>
            <Box style={{ margin: 20, flex: 1 }}>
                <Typography>{addEllipsis(longTitle)}</Typography>
                <SmallText>
                    Seller: RetailNet&nbsp;
                    <img src={fassured} alt="Flipkart Assured" style={{ width: 50, verticalAlign: 'middle', marginLeft: 6 }} />
                </SmallText>
                <Typography style={{ margin: '20px 0' }}>
                    <CostText>₹{(cost * quantity).toLocaleString()}</CostText>
                    {mrp > 0 && <MRPText>₹{(mrp * quantity).toLocaleString()}</MRPText>}
                    {discount && <DiscountText>{discount} off</DiscountText>}
                </Typography>
                {quantity > 1 && (
                    <Typography style={{ fontSize: 13, color: '#878787' }}>
                        ₹{cost.toLocaleString()} × {quantity} items
                    </Typography>
                )}
                <RemoveButton onClick={() => removeItemFromCart(item.id)}>Remove</RemoveButton>
            </Box>
        </Component>
    );
};

export default CartItem;