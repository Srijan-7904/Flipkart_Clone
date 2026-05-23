import { Typography, Box, styled } from '@mui/material';
import { navData } from '../../constant/data';

const Component = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    margin: '55px 130px 0 130px !important',
    overflowX: 'overlay',
    [theme.breakpoints.down('lg')]: {
        margin: '0px !important',
    },
}));

const Container = styled(Box)`
    padding: 12px 8px;
    text-align: center;
    cursor: pointer;
    transition: transform 0.22s ease;
    &:hover {
        transform: translateY(-3px);
    }
    &:hover img {
        filter: drop-shadow(0 2px 6px rgba(40,116,240,0.25));
    }
    &:hover p {
        color: #2874f0;
    }
`;

const NavImg = styled('img')`
    width: 64px;
    transition: filter 0.22s ease;
`;

const Text = styled(Typography)`
    font-size: 14px;
    font-weight: 600;
    font-family: inherit;
    transition: color 0.22s ease;
`;

const NavBar = () => {
    return (
        <Component>
            {navData.map((temp, i) => (
                <Container key={i}>
                    <NavImg src={temp.url} alt={temp.text} />
                    <Text>{temp.text}</Text>
                </Container>
            ))}
        </Component>
    );
};

export default NavBar;