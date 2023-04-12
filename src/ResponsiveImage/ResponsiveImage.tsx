import { PrismicImageType } from "@nexcodepl/prismic-custom-type";
import React from "react";

// import "./ResponsiveImage.scss";

const sizes = [2560, 2300, 2100, 1920, 1600, 1330, 1024, 768, 480, 320];

interface PropsBase<TBehaviour> {
    eagerLoad?: boolean;
    behaviour: TBehaviour;
    className?: string;
    classNameImg?: string;
    image?: PrismicImageType;
    highRes?: boolean;
}

interface PropsCoverContain extends PropsBase<"cover" | "contain"> {}

interface PropsRatio extends PropsBase<"ratio"> {
    maxRatio?: number;
    maxRatioAlignVertical?: "left" | "center" | "right";
    maxRatioAlignHorizontal?: "top" | "center" | "bottom";
}

interface PropsHeight extends PropsBase<"height"> {}

type Props = PropsCoverContain | PropsRatio | PropsHeight;

export const ResponsiveImage: React.FC<Props> = props => {
    if (props.behaviour === "ratio") {
        return <ResponsiveImageRatio {...props} />;
    } else if (props.behaviour === "height") {
        return <ResponsiveImageHeight {...props} />;
    } else {
        return <ResponsiveImageCoverContain {...props} />;
    }
};

interface RawImageProps {
    className?: string;
    image: PrismicImageType;
    eagerLoad?: boolean;
    highRes?: boolean;
}

export const ResponsiveImageCoverContain: React.FC<PropsCoverContain> = props => {
    if (!props.image || !props.image.width || !props.image.height || props.image.width <= 0 || props.image.height <= 0)
        return null;

    const imageClassNames: string[] = ["responsive-image-cover-contain__image"];

    if (props.behaviour === "contain") imageClassNames.push("responsive-image-cover-contain__image--contain");
    if (props.behaviour === "cover") imageClassNames.push("responsive-image-cover-contain__image--cover");
    if (props.classNameImg) imageClassNames.push(props.classNameImg);

    return (
        <div className={`responsive-image-cover-contain ${props.className ?? ""}`}>
            <RawImage
                image={props.image}
                className={imageClassNames.join(" ")}
                eagerLoad={props.eagerLoad}
                highRes={props.highRes}
            />
        </div>
    );
};

export const ResponsiveImageHeight: React.FC<PropsHeight> = props => {
    if (!props.image || !props.image.width || !props.image.height || props.image.width <= 0 || props.image.height <= 0)
        return null;

    const imageClassNames: string[] = ["responsive-image-height__image"];

    if (props.classNameImg) imageClassNames.push(props.classNameImg);

    return (
        <div className={`responsive-image-cover-contain ${props.className ?? ""}`}>
            <RawImage
                image={props.image}
                className={imageClassNames.join(" ")}
                eagerLoad={props.eagerLoad}
                highRes={props.highRes}
            />
        </div>
    );
};

export const ResponsiveImageRatio: React.FC<PropsRatio> = props => {
    if (!props.image || !props.image.width || !props.image.height || props.image.width <= 0 || props.image.height <= 0)
        return null;

    const imageClassNames: string[] = ["responsive-image-ratio__image"];

    let ratio = props.image.height / props.image.width;

    if (props.maxRatio && props.maxRatio > 0 && props.maxRatio < ratio) {
        ratio = props.maxRatio;
        imageClassNames.push("responsive-image-ratio__image--height");
    } else {
        imageClassNames.push("responsive-image-ratio__image--width");
    }

    if (props.classNameImg) {
        imageClassNames.push(props.classNameImg);
    }
    return (
        <div className={`responsive-image-ratio ${props.className ?? ""}`} style={{ paddingTop: `${ratio * 100}%` }}>
            <RawImage
                image={props.image}
                className={imageClassNames.join(" ")}
                eagerLoad={props.eagerLoad}
                highRes={props.highRes}
            />
        </div>
    );
};

export const RawImage: React.FC<RawImageProps> = ({ className, image, eagerLoad, highRes }) => {
    if (!image) {
        return null;
    }
    if (image.url.substring(image.url.length - 3, image.url.length).toLowerCase() === "svg" || highRes) {
        return (
            <img
                src={`${image.url}`}
                alt={image.alt ?? ""}
                className={`responsive-image-raw ${className ?? ""}`}
                loading={eagerLoad ? "eager" : "lazy"}
            />
        );
    }

    const srcSet = sizes.map(size => `${image.url}&w=${size} ${size}w`).join(", ");

    return (
        <img
            src={`${image.url}&w=1330`}
            alt={image.alt ?? ""}
            className={`responsive-image-raw ${className ?? ""}`}
            srcSet={srcSet}
            loading={eagerLoad ? "eager" : "lazy"}
        />
    );
};
