import { PropsWithChildren } from "react";

export function Subheading({ children, className } : PropsWithChildren & { className?: string }) {
    return (
        <h1 className={"scroll-m-20 text-2xl font-thin tracking-tight lg:text-2xl mb-12 italic" + (className ? " " + className : "")}>
            {children}
        </h1>
    );
}
