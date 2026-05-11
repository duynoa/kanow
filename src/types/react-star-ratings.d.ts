declare module 'react-star-ratings' {
    import { ComponentType } from 'react';

    export interface StarRatingsProps {
        rating?: number;
        numberOfStars?: number;
        starRatedColor?: string;
        starHoverColor?: string;
        starEmptyColor?: string;
        starDimension?: string;
        starSpacing?: string;
        gradientPathName?: string;
        ignoreInlineStyles?: boolean;
        svgIconPath?: string;
        svgIconViewBox?: string;
        name?: string;
        changeRating?: (rating: number) => void;
        isAggregateRating?: boolean;
        isScrollable?: boolean;
        isListMode?: boolean;
        scrollable?: boolean;
        ignoreAnonymous?: boolean;
    }

    const StarRatings: ComponentType<StarRatingsProps>;
    export default StarRatings;
}
