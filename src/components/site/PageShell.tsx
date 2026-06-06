import Nav from "./Nav";
import Footer from "./Footer";
import { INK, sans } from "./theme";

/* Full-page chrome: near-black canvas, film-grain + radial glow,
   shared nav and footer. Wraps every interior page. */
export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{ background: INK, color: "#EDEAE3", fontFamily: sans }}
      className="relative min-h-screen overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.05] mix-blend-screen"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% -10%, rgba(0,144,240,0.10), transparent 55%), radial-gradient(80% 60% at 100% 120%, rgba(0,144,240,0.06), transparent 60%)",
        }}
      />
      <div className="relative z-10">
        <Nav />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
