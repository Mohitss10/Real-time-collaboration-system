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
            border-[4px]
            border-transparent
            border-t-[var(--primary)]
            border-r-[var(--primary)]
            animate-spin
          "
        />

        {/* Center Dot */}

      </div>
    </div>
  );
}