import { SiteChrome } from "@/components/site-chrome";
import { ButtonLink, Container, Ornament } from "@/components/ui";

// Lives outside the (site) group, so it brings its own header and footer.
export default function NotFound() {
  return (
    <SiteChrome>
      <section className="bg-ink py-32 sm:py-44">
        <Container className="text-center">
          <Ornament />
          <p className="mt-8 font-display text-8xl text-gold-light">404</p>
          <h1 className="mt-4 font-display text-4xl text-ivory sm:text-5xl">
            This page isn&apos;t built yet.
          </h1>
          <p className="mx-auto mt-5 max-w-md text-lg text-mist">
            That page may have moved, or the link might be off. Try one of
            these instead.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ButtonLink href="/">Back to Home</ButtonLink>
            <ButtonLink href="/contact" variant="outline-gold">
              Contact Us
            </ButtonLink>
          </div>
        </Container>
      </section>
    </SiteChrome>
  );
}
