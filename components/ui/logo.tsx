"use client";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className="text-2xl underline">
      <svg
        fill="none"
        className="h-8 w-8"
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clipRule="evenodd"
          d="m0 24c15.2548 0 24-8.7452 24-24 0 15.2548 8.7452 24 24 24-15.2548 0-24 8.7452-24 24 0-15.2548-8.7452-24-24-24z"
          fill="#0c111d"
          fillRule="evenodd"
        />
      </svg>
    </span>
  );
}
