export default function Loader() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative h-12 w-12">
        {/* Outer Ring */}
        <div
          className="
            absolute
            inset-0
            rounded-full
            border-[3px]
            border-[var(--border-color)]
          "
        />

        {/* Animated Ring */}
        <div
          className="
            absolute
            inset-0
            rounded-full
            border-[3px]
            border-transparent
            border-t-[var(--primary)]
            border-r-[var(--primary)]
            animate-spin
          "
        />

        {/* Center Dot */}
        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-2.5
            w-2.5
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
          "
          style={{
            background: "var(--primary)",
          }}
        />
      </div>
    </div>
  );
}