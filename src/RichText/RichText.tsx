import React from "react";
import PrsimicReactjs from "prismic-reactjs";
import { LinkPropsOptional } from "@nexcodepl/vite-static-components";
import { PrismicRichTextType } from "@nexcodepl/prismic-custom-type";
import { PrismicLinkComponent } from "../Link";

const PrismicRichTextComponent = PrsimicReactjs.RichText;
type RichTextBlock = PrsimicReactjs.RichTextBlock;
// import "./RichText.scss";

export interface RichTextProps {
    text: PrismicRichTextType;
    className?: string;
    ignoreDefaultStyle?: boolean;
    linkPropsRaw?: LinkPropsOptional;
}

export function getRichText(LinkComponent: PrismicLinkComponent): React.FC<RichTextProps> {
    const RichText: React.FC<RichTextProps> = ({ text, className, ignoreDefaultStyle, linkPropsRaw }) => {
        if (!text) return null;

        return (
            <div className={`${ignoreDefaultStyle ? "" : "rich-text"} ${className ?? ""}`}>
                {typeof text === "string" ? (
                    text
                ) : (
                    <PrismicRichTextComponent
                        render={text as RichTextBlock[]}
                        serializeHyperlink={(type, element, content, children, index) => (
                            <LinkComponent key={index} link={element.data} propsRaw={linkPropsRaw}>
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
