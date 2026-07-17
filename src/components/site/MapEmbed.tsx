/* Google My Maps embed (office location) — used compact in the footer and
   full-size on /company/contact. */
const MAP_EMBED_SRC =
  "https://www.google.com/maps/d/u/4/embed?mid=1qqAtB5wSOMfUD-wGDTf20OM2VQ3OoIw&ehbc=2E312F&noprof=1";

export default function MapEmbed({ className }: { className?: string }) {
  return (
    <iframe
      src={MAP_EMBED_SRC}
      title="Marketing Powered location on Google Maps"
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      className={className}
    />
  );
}
