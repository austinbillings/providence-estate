import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      width="1em"
      height="1em"
      {...props}
    >
      {children}
    </svg>
  );
}

export const ArrowRight = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Icon>
);

export const ChevronDown = (p: IconProps) => (
  <Icon {...p}>
    <path d="m6 9 6 6 6-6" />
  </Icon>
);

export const Check = (p: IconProps) => (
  <Icon {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Icon>
);

export const Phone = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 4h3.5l1.5 4.5-2 1.5a12 12 0 0 0 6 6l1.5-2 4.5 1.5V19a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </Icon>
);

export const Mail = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3" y="5" width="18" height="14" rx="1.5" />
    <path d="m3.5 6 8.5 7 8.5-7" />
  </Icon>
);

export const MapPin = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </Icon>
);

export const Shield = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3 4.5 6v5.5c0 4.7 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.8 7.5-9.5V6L12 3Z" />
    <path d="m9 12 2 2 4-4" />
  </Icon>
);

export const Home = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3 11 12 4l9 7" />
    <path d="M5.5 9.5V20h13V9.5" />
    <path d="M10 20v-5h4v5" />
  </Icon>
);

export const Family = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="8" cy="6.5" r="2.5" />
    <circle cx="16.5" cy="8" r="2" />
    <path d="M3.5 20v-3.5A4.5 4.5 0 0 1 8 12a4.5 4.5 0 0 1 4.5 4.5V20" />
    <path d="M13.5 14.2a3.5 3.5 0 0 1 6.5 1.8V20" />
  </Icon>
);

export const Calendar = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="1.5" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </Icon>
);

export const Document = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 3h8l4 4v14H6z" />
    <path d="M14 3v4h4M9 12h6M9 16h6" />
  </Icon>
);

export const Award = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="9" r="5.5" />
    <path d="m8.5 13.5-1.5 7.5 5-2.5 5 2.5-1.5-7.5" />
  </Icon>
);

export const Chat = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 5h16v11H9l-5 4z" />
    <path d="M8 9.5h8M8 12.5h5" />
  </Icon>
);

export const Broom = (p: IconProps) => (
  <Icon {...p}>
    <path d="m14 4 6 6M9.5 10.5l4 4" />
    <path d="M9.5 10.5 4 16c-.8.8-.8 2.2 0 3l1 1c.8.8 2.2.8 3 0l5.5-5.5" />
    <path d="m17 7-5.5 5.5" />
  </Icon>
);

export const Sun = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
  </Icon>
);

export const Menu = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Icon>
);

export const Close = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Icon>
);

export const External = (p: IconProps) => (
  <Icon {...p}>
    <path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6" />
  </Icon>
);
