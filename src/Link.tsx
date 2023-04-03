import React from "react";
import { Link as PrismicLinkType } from "@nexcodepl/prismic-custom-type";
import { Link as RouterLink } from "@nexcodepl/vite-static-components";

export type LinkType = PrismicLinkType | LinkRichText | string | null;

interface Props {
    link: LinkType;
    className?: string;
    children: JSX.Element | string;
    onClick?: () => void;
}

export const Link: React.FC<Props> = ({ link, className, children, onClick }) => {
    if (!link) return null;

    if (typeof link === "string") {
        return (
            <RouterLink className={`${className ?? ""}`} to={link} onClick={onClick}>
                {children}
            </RouterLink>
        );
    }

    if (linkIsLinkRichText(link)) {
        if (link.link_type === "Document") {
            return (
                <RouterLink className={`${className ?? ""}`} to={{ id: link.id }} onClick={onClick}>
                    {children}
                </RouterLink>
            );
        }

        if (link.link_type === "Web" || link.link_type === "Media") {
            return (
                <a
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
            return (
                <RouterLink className={`${className ?? ""}`} to={{ id: link.id }} onClick={onClick}>
                    {children}
                </RouterLink>
            );
        }
    }

    return (
        <RouterLink className={`${className ?? ""}`} to={link} onClick={onClick}>
            {children}
        </RouterLink>
    );
};

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
