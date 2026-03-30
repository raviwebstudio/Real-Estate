import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section-space">
      <div className="shell">
        <div className="panel px-6 py-16 text-center sm:px-10">
          <p className="eyebrow">Not Found</p>
          <h1 className="mt-4 font-serif text-4xl text-ink">This page is unavailable.</h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-taupe">
            The listing or page may have moved. You can continue browsing Gurgaon
            residential inventory from the main property hub.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/properties" className="rounded-full bg-ink px-5 py-3 text-sm text-white">
              Browse Properties
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-black/10 px-5 py-3 text-sm text-ink"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
