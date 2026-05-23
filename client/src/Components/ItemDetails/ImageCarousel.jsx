import React, { useState, useEffect } from 'react';
import { Box, IconButton, styled } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

/* ── Styled Components ── */

const CarouselWrapper = styled(Box)`
    position: relative;
    width: 100%;
    padding: 16px 0;
    user-select: none;
`;

const MainImageBox = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 340px;
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 4px;
    position: relative;
    overflow: hidden;
`;

const MainImage = styled('img')`
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
    transition: opacity 0.3s ease, transform 0.3s ease;
`;

const ArrowBtn = styled(IconButton)`
    position: absolute !important;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.92) !important;
    border: 1px solid #e0e0e0 !important;
    box-shadow: 0 2px 8px rgba(0,0,0,0.12) !important;
    width: 36px;
    height: 36px;
    z-index: 10;
    transition: background 0.2s ease, box-shadow 0.2s ease !important;
    &:hover {
        background: #fff !important;
        box-shadow: 0 4px 14px rgba(0,0,0,0.18) !important;
    }
`;

const ThumbnailRow = styled(Box)`
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 14px;
    flex-wrap: wrap;
`;

const Thumbnail = styled('img')`
    width: 60px;
    height: 60px;
    object-fit: contain;
    border: 2px solid ${({ active }) => (active ? '#2874f0' : '#e0e0e0')};
    border-radius: 4px;
    cursor: pointer;
    padding: 4px;
    background: #fff;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
    &:hover {
        border-color: #2874f0;
        box-shadow: 0 2px 8px rgba(40, 116, 240, 0.25);
        transform: translateY(-2px);
    }
`;

const DotRow = styled(Box)`
    display: flex;
    justify-content: center;
    gap: 6px;
    margin-top: 10px;
`;

const Dot = styled('span')`
    width: ${({ active }) => (active ? '20px' : '8px')};
    height: 8px;
    border-radius: 4px;
    background: ${({ active }) => (active ? '#2874f0' : '#d0d0d0')};
    display: inline-block;
    transition: all 0.3s ease;
    cursor: pointer;
`;

/* ── Component ── */

const ImageCarousel = ({ images = [], alt = 'product' }) => {
    const [current, setCurrent] = useState(0);
    const [fadeKey, setFadeKey] = useState(0);

    // fallback if no images
    const imgs = images.length > 0 ? images : ['/placeholder.png'];

    const goTo = (idx) => {
        setCurrent(idx);
        setFadeKey(k => k + 1);
    };

    const prev = (e) => {
        e.stopPropagation();
        goTo((current - 1 + imgs.length) % imgs.length);
    };

    const next = (e) => {
        e.stopPropagation();
        goTo((current + 1) % imgs.length);
    };

    // auto-play every 4 seconds
    useEffect(() => {
        if (imgs.length <= 1) return;
        const timer = setInterval(() => {
            setCurrent(c => (c + 1) % imgs.length);
            setFadeKey(k => k + 1);
        }, 4000);
        return () => clearInterval(timer);
    }, [imgs.length]);

    return (
        <CarouselWrapper>
            <MainImageBox>
                {imgs.length > 1 && (
                    <ArrowBtn onClick={prev} style={{ left: 8 }} size="small">
                        <ChevronLeft style={{ fontSize: 20 }} />
                    </ArrowBtn>
                )}

                <MainImage
                    key={fadeKey}
                    src={imgs[current]}
                    alt={`${alt} - ${current + 1}`}
                    style={{ animation: 'fadeIn 0.35s ease' }}
                    onError={(e) => { e.target.src = imgs[0]; }}
                />

                {imgs.length > 1 && (
                    <ArrowBtn onClick={next} style={{ right: 8 }} size="small">
                        <ChevronRight style={{ fontSize: 20 }} />
                    </ArrowBtn>
                )}
            </MainImageBox>

            {/* Thumbnails */}
            {imgs.length > 1 && (
                <ThumbnailRow>
                    {imgs.map((img, idx) => (
                        <Thumbnail
                            key={idx}
                            src={img}
                            alt={`${alt} view ${idx + 1}`}
                            active={current === idx ? 1 : 0}
                            onClick={() => goTo(idx)}
                            onError={(e) => { e.target.style.display = 'none'; }}
                        />
                    ))}
                </ThumbnailRow>
            )}

            {/* Dot indicators */}
            {imgs.length > 1 && (
                <DotRow>
                    {imgs.map((_, idx) => (
                        <Dot key={idx} active={current === idx ? 1 : 0} onClick={() => goTo(idx)} />
                    ))}
                </DotRow>
            )}

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0.3; transform: scale(0.97); }
                    to   { opacity: 1;   transform: scale(1); }
                }
            `}</style>
        </CarouselWrapper>
    );
};

export default ImageCarousel;
