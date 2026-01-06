import React from "react";

export const Arrow = ({ size = 22, rotate = 0 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ transform: `rotate(${rotate}deg)` }}
    pointerEvents="none"
  >
    <path d="M12 4 L4 12 M6 4 L12 4 L12 10" />
  </svg>
);


export const CloseIcon = ({ size = 28 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
  >
    <path d="M4 4 L12 12 M12 4 L4 12" />
  </svg>
);


export const ExpandIcon = () => (
  <div style={{ position: "relative", width: 0, height: 0 }}>
    <div style={{ position: "absolute", top: 0, right: 0 }}>
      <Arrow rotate={180} />
    </div>
    <div style={{ position: "absolute", bottom: 0, left: 0 }}>
      <Arrow rotate={0} />
    </div>
  </div>
);



export const CollapseIcon = () => (
  <div style={{ position: "relative", width: 0, height: 0 }}>
    <div style={{ position: "absolute", top: 0, right: 0 }}>
      <Arrow rotate={0} />
    </div>
    <div style={{ position: "absolute", bottom: 0, left: 0 }}>
      <Arrow rotate={180} />
    </div>
  </div>
);
