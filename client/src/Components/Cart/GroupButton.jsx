import React from 'react';
import { Button, styled, Box } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { updateCartQuantity, removeFromCart } from '../../redux/actions/cartActions';

const Wrapper = styled(Box)`
    display: flex;
    align-items: center;
    margin-top: 16px;
    gap: 4px;
`;

const QtyButton = styled(Button)`
    border-radius: 50% !important;
    min-width: 32px !important;
    width: 32px;
    height: 32px;
    padding: 0 !important;
    border: 1px solid #d0d0d0 !important;
    background: #fff !important;
    color: #2874f0 !important;
    &:hover {
        background: #e8f0fe !important;
        border-color: #2874f0 !important;
    }
    &:disabled {
        color: #bdbdbd !important;
    }
`;

const CountDisplay = styled(Button)`
    min-width: 44px !important;
    height: 32px;
    padding: 0 8px !important;
    border: 1px solid #d0d0d0 !important;
    background: #fff !important;
    color: #212121 !important;
    font-weight: 600 !important;
    cursor: default !important;
    border-radius: 4px !important;
    &:hover {
        background: #fff !important;
    }
`;

const GroupButton = ({ item }) => {
    const dispatch = useDispatch();
    const quantity = item?.quantity || 1;

    const handleIncrement = () => {
        dispatch(updateCartQuantity(item.id, quantity + 1));
    };

    const handleDecrement = () => {
        if (quantity <= 1) {
            dispatch(removeFromCart(item.id));
        } else {
            dispatch(updateCartQuantity(item.id, quantity - 1));
        }
    };

    return (
        <Wrapper>
            <QtyButton onClick={handleDecrement} size="small">
                <Remove style={{ fontSize: 16 }} />
            </QtyButton>
            <CountDisplay disableRipple>
                {quantity}
            </CountDisplay>
            <QtyButton onClick={handleIncrement} size="small">
                <Add style={{ fontSize: 16 }} />
            </QtyButton>
        </Wrapper>
    );
};

export default GroupButton;