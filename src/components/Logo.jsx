export default function Logo({ className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2 font-display text-xl font-bold ${className}`}>
      <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="#2F42CC" />
        <path d="M10 12h12l1.5 12h-15z" fill="#fff" />
        <path d="M12.5 12v-1.5a3.5 3.5 0 0 1 7 0V12" fill="none" stroke="#F5A524" strokeWidth="1.8" />
      </svg>
      White Bag
    </span>
  );
}
