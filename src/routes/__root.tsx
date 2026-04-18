import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CursorAndReveal } from "@/components/CursorAndReveal";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface gutter">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-8xl text-primary">404</h1>
        <h2 className="mt-4 font-serif text-2xl">A page lost in the steam.</h2>
        <p className="mt-3 text-on-surface-variant">Let's pour you a fresh one.</p>
        <Link to="/" className="btn-primary mt-8 inline-flex">Return Home</Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Brew — A Quiet Ritual in Islamabad" },
      { name: "description", content: "Brew is a specialty coffee house in Islamabad. Curated single origins, ceremonial pour-overs and a serene architectural space." },
      { name: "author", content: "Brew" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400&family=Manrope:wght@300;400;500;600;700;800&display=swap",
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
    <>
      <CursorAndReveal />
      <Nav />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
