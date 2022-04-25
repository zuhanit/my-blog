import { Link } from 'react-router-dom';
import styled, { } from 'styled-components';
import { IPost } from '../pages/posts/Post';

interface StyledBannerProps {
    background_colors: {
        left: string;
        right: string;
    };

    angle: number;
}

const StyledBanner = styled(Link)`
    display: flex;
    border-radius: 0.5rem;
    width: 25%;
    min-height: 50px;
    max-height: 50px;
    padding: 0.5rem;
    cursor: pointer;
    transition: all 0.2s linear;
    flex-direction: column;
    color: white;

    &:hover {
        transform: scale(1.01);
    }

    &{p} {
        color: white;
        max-height: 50px;
        overflow: hidden;
    }

    background: ${({ background_colors, angle }: StyledBannerProps) => `linear-gradient(${angle}deg, ${background_colors.left}, ${background_colors.right})`}
`;

/**
 * 
 * @param param0 포스트
 * @returns 배너 컴포넌트
 */
export default function Banner({ title, content, id, subtitle }: IPost) {
    const props: StyledBannerProps = {
        background_colors: {
            left: getRandomColorHex(),
            right: getRandomColorHex(),
        },
        angle: Math.round(Math.random() * 360)
    };

    return (
        <StyledBanner {...props} to={'posts/' + id} className="banner">
            <h2>{title}</h2>
            <p>
                {
                    subtitle.length >= 60
                    ? subtitle.slice(0, 60) + '...'
                    : subtitle
                }
            </p>
        </StyledBanner>
    )
}

/**
 * 랜덤한 헥스 컬러 코드를 가져옵니다.
 * @returns 헥스 컬러 코드.
 */
function getRandomColorHex() {
    const HEX_DIGITS = '01234567890ABCDEF';
    const colors = Array(6).fill(0).map(() => HEX_DIGITS[Math.floor(Math.random() * 16)]);

    return '#' + colors.join('');
}