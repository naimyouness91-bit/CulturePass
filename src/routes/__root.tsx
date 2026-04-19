import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { ChatbotProvider } from "@/context/ChatbotContext";
import { ToastContainer } from "@/components/ToastContainer";
import { ChatBot } from "@/components/ChatBot";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "CulturePass — Cultural events in Mediouna" },
      {
        name: "description",
        content:
          "Discover music, theatre, festivals and community gatherings across Mediouna. Book your seat with CulturePass.",
      },
      { property: "og:title", content: "CulturePass — Cultural events in Mediouna" },
      {
        property: "og:description",
        content: "Mediouna's cultural agenda: music, theatre, festivals and community life.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "CulturePass — Cultural events in Mediouna" },
      { name: "description", content: "Mediouna Culture Hub is a web platform for discovering and booking local cultural events." },
      { property: "og:description", content: "Mediouna Culture Hub is a web platform for discovering and booking local cultural events." },
      { name: "twitter:description", content: "Mediouna Culture Hub is a web platform for discovering and booking local cultural events." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/331fdac2-f347-40d5-a137-d673bf86a64e/id-preview-9d7f0c08--3d33fdfd-9d08-4bc4-92ba-f72c84937308.lovable.app-1776520962670.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/331fdac2-f347-40d5-a137-d673bf86a64e/id-preview-9d7f0c08--3d33fdfd-9d08-4bc4-92ba-f72c84937308.lovable.app-1776520962670.png" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
      },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <ChatbotProvider>
      <NotificationProvider>
        <LanguageProvider>
          <AuthProvider>
            <Outlet />
            <ToastContainer />
            <ChatBot />
          </AuthProvider>
        </LanguageProvider>
      </NotificationProvider>
    </ChatbotProvider>
  );
}
