import React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

export const HourglassIcon = (props: IconProps) => {
  return (
    <svg
      {...props}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.4364 3.73303H4.99886C4.9519 3.73303 4.90685 3.75169 4.87364 3.7849C4.84043 3.81811 4.82178 3.86315 4.82178 3.91012V4.33512C4.82528 4.70598 4.91862 5.07048 5.09379 5.39739C5.26897 5.72429 5.52076 6.00388 5.82761 6.2122L7.30094 7.26053C7.59844 7.45745 7.84636 7.72095 8.02344 8.03191C8.20542 8.3387 8.30145 8.68883 8.30145 9.04553C8.30145 9.40224 8.20542 9.75236 8.02344 10.0592C7.84636 10.3694 7.59844 10.6336 7.30094 10.8305L5.82761 11.8789C5.52076 12.0872 5.26897 12.3668 5.09379 12.6937C4.91862 13.0206 4.82528 13.3851 4.82178 13.7559V14.1809C4.82178 14.2279 4.84043 14.273 4.87364 14.3062C4.90685 14.3394 4.9519 14.358 4.99886 14.358H12.4364C12.4833 14.358 12.5284 14.3394 12.5616 14.3062C12.5948 14.273 12.6134 14.2279 12.6134 14.1809V13.7559C12.6099 13.3851 12.5166 13.0206 12.3414 12.6937C12.1663 12.3668 11.9145 12.0872 11.6076 11.8789L10.1343 10.8305C9.83637 10.6335 9.58889 10.3693 9.41178 10.0592C9.2298 9.75236 9.13377 9.40224 9.13377 9.04553C9.13377 8.68883 9.2298 8.3387 9.41178 8.03191C9.58886 7.72166 9.83678 7.45745 10.1343 7.26053L11.6076 6.2122C11.9145 6.00388 12.1663 5.72429 12.3414 5.39739C12.5166 5.07048 12.6099 4.70598 12.6134 4.33512V3.91012C12.6134 3.86315 12.5948 3.81811 12.5616 3.7849C12.5284 3.75169 12.4833 3.73303 12.4364 3.73303Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const RoadIcon = (props: IconProps) => {
  return (
    <svg
      {...props}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.3563 1.41199L1.13696 14.5385L1.58345 14.6791L5.80161 1.55554L5.3563 1.41199ZM10.4891 1.41199L10.0438 1.55554L14.2625 14.6791L14.7079 14.5385L10.4891 1.41199ZM7.68833 1.48376L7.66489 2.0697H8.18052L8.15708 1.48376H7.68833ZM7.64731 2.53845L7.62388 3.12439H8.22153L8.1981 2.53845H7.64731ZM7.60337 3.59314L7.56528 4.53064H8.28013L8.24204 3.59314H7.60337ZM7.5477 4.99939L7.48911 6.40564H8.3563L8.2977 4.99939H7.5477ZM7.46567 6.99158L7.39536 8.74939H8.45005L8.37974 6.99158H7.46567ZM7.36899 9.45251L7.28403 11.5619H8.56138L8.47642 9.45251H7.36899ZM7.25181 12.3822L7.16099 14.6088H8.68442L8.5936 12.3822H7.25181Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const LeafIcon = (props: IconProps) => {
  return (
    <svg
      {...props}
      width="20"
      height="19"
      viewBox="0 0 20 19"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.6815 6.40972C6.62604 7.97761 4.97975 12.8146 3.34914 16.8676L4.8308 17.385L5.57555 15.5819C5.95184 15.7152 6.34382 15.8171 6.62604 15.8171C15.2494 15.8171 17.6013 2.48999 17.6013 2.48999C16.8173 4.05788 11.3297 4.25387 7.40998 5.03781C3.49025 5.82176 1.92236 9.15353 1.92236 10.7214C1.92236 12.2893 3.29427 13.6612 3.29427 13.6612C5.84209 6.40972 13.6815 6.40972 13.6815 6.40972Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const PlaneIcon = (props: IconProps) => {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="40" height="40">
      <g stroke="currentColor" fillRule="evenodd">
        <path
          stroke="currentColor"
          strokeLinecap="square"
          strokeWidth="2"
          d="M5 34.569h29.999M20.994 9.324 14.509 5l-3.624 1.208 4.324 5.044"
        />
        <path
          fill="currentColor"
          fillOpacity=".24"
          d="M34.861 11.896a2.729 2.729 0 0 0-3.451-1.727L12.431 16.49l-3.739-2.073-3.092 1.03 2.094 3.622a3 3 0 0 0 2.6 1.5h7.153l15.7-5.232a2.721 2.721 0 0 0 1.721-3.441h-.007Z"
        />
        <path
          stroke="currentColor"
          strokeWidth="2"
          d="M34.861 11.896a2.729 2.729 0 0 0-3.451-1.727L12.431 16.49l-3.739-2.073-3.092 1.03 2.094 3.622a3 3 0 0 0 2.6 1.5h7.153l15.7-5.232a2.721 2.721 0 0 0 1.721-3.441h-.007Z"
        />
        <path
          stroke="currentColor"
          strokeWidth="2"
          d="m19.389 19.921-2.116 10.648h4.091l5.435-13.119"
        />
      </g>
    </svg>
  );
};

export const HandIcon = (props: IconProps) => {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="40" height="40">
      <g fill="none" fillRule="evenodd">
        <path
          stroke="currentColor"
          strokeLinecap="square"
          strokeWidth="2"
          d="M27 25h2.324a5 5 0 0 1 4.16 2.226L34 28l-15.168 5.9a6 6 0 0 1-5.4-.53L5 28v-9h2c2.631 0 5.638.967 7 3h5a5 5 0 0 1 5 5H13"
        />
        <path fill="currentColor" fillOpacity=".24" d="m26 6-6 5v7h12v-7z" />
        <path
          stroke="currentColor"
          strokeLinecap="square"
          strokeWidth="2"
          d="m26 6-6 5v7h12v-7zM26 15v3"
        />
      </g>
    </svg>
  );
};

export const BranchIcon = (props: IconProps) => {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="40" height="40">
      <g fill="none" fillRule="evenodd">
        <path
          stroke="currentColor"
          strokeLinecap="square"
          strokeWidth="2"
          d="M26.784 29.563s-2.397 3.704-6.306 4.388C17.475 34.477 14 30.622 14 30.622s2.342-2.617 5.345-3.143c3.527-.617 7.439 2.084 7.439 2.084Z"
        />
        <path
          fill="currentColor"
          fillOpacity=".24"
          d="M6 21.582s2.721-2.265 5.879-1.856c2.426.314 4.168 4.097 4.168 4.097s-2.419 1.446-4.846 1.131C8.352 24.586 6 21.582 6 21.582ZM27.252 17.756s-2.267 3.756-1.176 7.549c.838 2.914 5.797 4.342 5.797 4.342s1.32-3.234.482-6.147c-.985-3.423-5.103-5.744-5.103-5.744Z"
        />
        <path
          stroke="currentColor"
          strokeLinecap="square"
          strokeWidth="2"
          d="M6 21.582s2.721-2.265 5.879-1.856c2.426.314 4.168 4.097 4.168 4.097s-2.419 1.446-4.846 1.131C8.352 24.586 6 21.582 6 21.582ZM19.344 19s-2.598-2.825-2.324-6.267c.211-2.644 4.213-4.732 4.213-4.732s1.695 2.542 1.484 5.186C22.471 16.293 19.344 19 19.344 19ZM27.252 17.756s-2.267 3.756-1.176 7.549c.838 2.914 5.797 4.342 5.797 4.342s1.32-3.234.482-6.147c-.985-3.423-5.103-5.744-5.103-5.744Z"
        />
        <path
          stroke="currentColor"
          strokeLinecap="square"
          strokeWidth="2"
          d="M34 30C21 30 12 20 12 7"
        />
      </g>
    </svg>
  );
};

export const CirclesIcon = (props: IconProps) => {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="40" height="40">
      <g fill="none" fillRule="evenodd">
        <path
          stroke="currentColor"
          strokeWidth="2"
          d="M21 28h-6M27.351 23.762l-2.774-4.439M17.351 16.238l-2.59 4.144"
        />
        <circle cx="10" cy="28" r="5" fill="currentColor" fillOpacity=".24" />
        <circle cx="30" cy="28" r="5" fill="currentColor" fillOpacity=".24" />
        <circle cx="20" cy="12" r="5" fill="currentColor" fillOpacity=".24" />
        <circle
          cx="10"
          cy="28"
          r="5"
          stroke="currentColor"
          strokeLinecap="square"
          strokeWidth="2"
        />
        <circle
          cx="30"
          cy="28"
          r="5"
          stroke="currentColor"
          strokeLinecap="square"
          strokeWidth="2"
        />
        <circle
          cx="20"
          cy="12"
          r="5"
          stroke="currentColor"
          strokeLinecap="square"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
};
