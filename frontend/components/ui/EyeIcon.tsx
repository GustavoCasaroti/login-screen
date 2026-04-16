type Props = {
  open: boolean;
};

export default function EyeIcon({ open }: Props) {
  return open ? (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M1 8C1 8 3.5 3 8 3C12.5 3 15 8 15 8C15 8 12.5 13 8 13C3.5 13 1 8 1 8Z" stroke="#AAAAAA" strokeWidth="1.2" />
      <circle cx="8" cy="8" r="2" stroke="#AAAAAA" strokeWidth="1.2" />
      <line x1="2" y1="14" x2="14" y2="2" stroke="#AAAAAA" strokeWidth="1.2" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M1 8C1 8 3.5 3 8 3C12.5 3 15 8 15 8C15 8 12.5 13 8 13C3.5 13 1 8 1 8Z" stroke="#AAAAAA" strokeWidth="1.2" />
      <circle cx="8" cy="8" r="2" stroke="#AAAAAA" strokeWidth="1.2" />
    </svg>
  );
}