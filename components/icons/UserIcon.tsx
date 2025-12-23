interface UserIconProps {
  className?: string;
}

export function UserIcon({ className = "" }: UserIconProps) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.09-.635-.477-.954-1.004-1.244H4.004c-.527.29-.914.609-1.004 1.244H3s.002.001.004" />
    </svg>
  );
}
