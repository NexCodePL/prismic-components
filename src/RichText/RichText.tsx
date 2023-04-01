import React from "react";
import { RichText as PrismicRichTextComponent, RichTextBlock } from "prismic-reactjs";
import { PrismicRichTextType } from "@nexcodepl/prismic-custom-type";
import { Link } from "../Link";

import "./RichText.scss";

interface Props {
    text: PrismicRichTextType;
    className?: string;
    ignoreDefaultStyle?: boolean;
}

export const RichText: React.FC<Props> = ({ text, className, ignoreDefaultStyle }) => {
    if (!text) return null;

    return (
        <div className={`${ignoreDefaultStyle ? "" : "rich-text"} ${className ?? ""}`}>
            {typeof text === "string" ? (
                text
            ) : (
                <PrismicRichTextComponent
                    render={text as RichTextBlock[]}
                    serializeHyperlink={(type, element, content, children, index) => (
                        <Link key={index} link={element.data}>
                            {content}
                        </Link>
                    )}
                />
            )}
        </div>
    );
};
