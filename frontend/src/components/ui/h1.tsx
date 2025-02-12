import { PropsWithChildren } from "react";

export function TypographyH1({ children, className } : PropsWithChildren & { className?: string }) {
    return (
        <h1 className={"scroll-m-20 text-4xl font-thin tracking-tight lg:text-5xl mb-6" + (className ? " " + className : "")}>
            {children}
        </h1>
    );
}
