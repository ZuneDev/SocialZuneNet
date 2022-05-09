import {AnchorHTMLAttributes, DetailedHTMLProps} from "react";

declare namespace JSX {
    interface ZuneMarketplaceAnchor extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
        sendinfo?: string;
        canpurchase?: string;
        purchaseinfo?: string;
        mediainfo?: string;
        isactionable?: string;
        mixviewinfo?: string;
        purchasebiinfo?: string;
    }
}