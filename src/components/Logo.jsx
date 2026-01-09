function Logo() {
  return (
    <svg
      width="300"
      height="80"
      viewBox="0 0 400 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(20, 10)">
        <circle cx="40" cy="65" r="6" fill="#2F855A" />
        <circle cx="20" cy="45" r="6" fill="#38A169" />
        <circle cx="60" cy="45" r="6" fill="#38A169" />
        <circle cx="10" cy="25" r="6" fill="#48BB78" />
        <circle cx="30" cy="25" r="6" fill="#48BB78" />
        <circle cx="50" cy="25" r="6" fill="#48BB78" />
        <circle cx="70" cy="25" r="6" fill="#48BB78" />

        <path
          d="M40 65 L20 45 M40 65 L60 45 M20 45 L10 25 M20 45 L30 25 M60 45 L50 25 M60 45 L70 25"
          stroke="#2F855A"
          stroke-width="3"
          stroke-linecap="round"
        />

        <path
          d="M40 80 L40 65"
          stroke="#2F855A"
          stroke-width="4"
          stroke-linecap="round"
        />
      </g>

      <text
        x="110"
        y="55"
        font-family="'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
        font-weight="bold"
        font-size="28"
        fill="#EDE1DC"
      >
        learn<tspan fill="#38A169">.datamatiker</tspan>.dev
      </text>
    </svg>
  );
}

export default Logo;
