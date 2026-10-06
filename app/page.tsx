import Image from "next/image";
// Web copy of logo.png with the near-black background texture flattened to
// #040404, so it blends into the page and compresses without blotching.
import logo from "../public/logo-splash.png";

const QUOTE_EMAIL = "jfelan@providenceestate.com";
const quoteHref = `mailto:${QUOTE_EMAIL}?subject=${encodeURIComponent(
  "Quote Request"
)}`;

export default function Home() {
  return (
    <main className="splash">
      <h1 className="visually-hidden">Providence Estate Builders</h1>

      <Image
        src={logo}
        alt="Providence Estate Builders — Built on faith. Designed for generations."
        className="logo"
        priority
        sizes="(max-width: 640px) 90vw, 640px"
      />

      <a className="quote" href={quoteHref}>
        Request a Quote
      </a>

      <footer className="footer">
        <span>Providence Estate Builders LLC</span>
        <span aria-hidden="true">·</span>
        <span>ROC #367364</span>
      </footer>
    </main>
  );
}
