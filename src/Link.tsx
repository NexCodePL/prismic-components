import React from "react";
import { Link as PrismicLinkType } from "@nexcodepl/prismic-custom-type";
import { LinkComponent, LinkPropsOptional } from "@nexcodepl/vite-static-components";

export type LinkType = PrismicLinkType | LinkRichText | string | null;

export interface PrismicLinkProps {
    link: LinkType;
    className?: string;
    children: JSX.Element | string;
    onClick?: () => void;
    propsRaw?: LinkPropsOptional;
}

export type PrismicLinkComponent = ReturnType<typeof getLink>;

export function getLink(linkComponent: LinkComponent) {
    const Link: React.FC<PrismicLinkProps> = ({ link, className, children, onClick, propsRaw }) => {
        if (!link) return null;

        if (typeof link === "string") {
            return linkComponent({ className, to: link, onClick, children, propsRaw });
        }

        if (linkIsLinkRichText(link)) {
            if (link.link_type === "Document") {
                return linkComponent({ className, to: { id: link.id }, onClick, children, propsRaw });
            }

            if (link.link_type === "Web" || link.link_type === "Media") {
                return (
                    <a
                        {...propsRaw}
                        href={link.url}
                        className={className ?? ""}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        onClick={onClick}>
                        {children}
                    </a>
                );
            }
        } else if (linkIsLink(link)) {
            if (link.type === "web" || link.type === "media") {
                return (
                    <a
                        {...propsRaw}
                        href={link.url}
                        className={className ?? ""}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        onClick={onClick}>
                        {children}
                    </a>
                );
            }
            if (link.type === "document") {
                return linkComponent({ className, to: { id: link.id }, onClick, children, propsRaw });
            }
        }

        return linkComponent({ className, to: link, onClick, children, propsRaw });
    };

    return Link;
}

function linkIsLink(link: unknown): link is PrismicLinkType {
    return !!(link as PrismicLinkType)?.type;
}

function linkIsLinkRichText(link: unknown): link is LinkRichText {
    return !!(link as LinkRichText)?.link_type;
}

export interface LinkRichTextInternal {
    link_type: "Document";
    id: string;
}

export interface LinkRichTextWeb {
    link_type: "Web";
    url: string;
}

export interface LinkRichTextMedia {
    link_type: "Media";
    url: string;
}

export type LinkRichText = LinkRichTextInternal | LinkRichTextWeb | LinkRichTextMedia | null;
