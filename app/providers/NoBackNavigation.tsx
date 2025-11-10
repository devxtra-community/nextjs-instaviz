"use client";

import { useEffect } from "react";

export default function NoBackNavigation({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        if (typeof window !== "undefined") {
            window.history.pushState(null, "", window.location.href);
            window.onpopstate = function () {
                window.history.go(1);
            };
        }
    }, []);

    return <>{children}</>;
}
