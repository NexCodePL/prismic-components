import React from "react";
import PrsimicReactjs from "prismic-reactjs";
import { PrismicRichTextType } from "@nexcodepl/prismic-custom-type";
import { PrismicLinkComponent } from "../Link";

const PrismicRichTextComponent = PrsimicReactjs.RichText;
type RichTextBlock = PrsimicReactjs.RichTextBlock;
// import "./RichText.scss";

export interface RichTextProps {
    text: PrismicRichTextType;
    className?: string;
    ignoreDefaultStyle?: boolean;
}

export function getRichText(LinkComponent: PrismicLinkComponent): React.FC<RichTextProps> {
    const RichText: React.FC<RichTextProps> = ({ text, className, ignoreDefaultStyle }) => {
        if (!text) return null;

        return (
            <div className={`${ignoreDefaultStyle ? "" : "rich-text"} ${className ?? ""}`}>
                {typeof text === "string" ? (
                    text
                ) : (
                    <PrismicRichTextComponent
                        render={text as RichTextBlock[]}
                        serializeHyperlink={(type, element, content, children, index) => (
                            <LinkComponent key={index} link={element.data}>
                                {content}
                            </LinkComponent>
                        )}
                    />
                )}
            </div>
        );
    };

    return RichText;
}
