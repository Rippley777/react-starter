import { AllRoutes } from "expo-router";

export const formatHref = (href: string): "/" | AllRoutes | `${string}:${string}` => {
        // Example conditional formatting
        if (href.startsWith('http')) {
            return href as `${string}:${string}`; // Treat as full URL
        }
        return `/${href}` as AllRoutes; // Treat as path, assuming leading slash is needed
}