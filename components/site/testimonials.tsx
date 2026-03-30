import { testimonials } from "@/lib/site";

export function Testimonials() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {testimonials.map((testimonial) => (
        <article key={testimonial.name} className="panel p-6">
          <p className="font-serif text-2xl leading-9 text-ink">“{testimonial.quote}”</p>
          <div className="mt-6 text-sm text-taupe">
            <p className="font-medium text-ink">{testimonial.name}</p>
            <p>{testimonial.role}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
