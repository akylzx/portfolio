export function Windmill() {
  return (
    <figure className="shrink-0 select-none">
      <div className="relative h-72 w-full sm:h-80 sm:w-56">
        <img
          src="/windmill.jpeg"
          alt="A windmill glowing against the dark"
          className="windmill-img absolute inset-0 h-full w-full object-contain"
        />
      </div>
      <figcaption className="mt-2 text-center font-mono text-[10px] leading-tight text-muted/70">
        windmill
      </figcaption>
    </figure>
  );
}
