import React from "react";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export function Logo({ className = "h-8", iconOnly = false }: LogoProps) {
  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Krylosys Stylized Icon */}
      <svg
        viewBox="0 0 160 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto overflow-visible"
        aria-hidden="true"
      >
        <defs>
          {/* Cyan Glow Gradient */}
          <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00E5FF" />
            <stop offset="50%" stopColor="#0099FF" />
            <stop offset="100%" stopColor="#0055D4" />
          </linearGradient>

          {/* Silver Metallic Gradient */}
          <linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#CBD5E1" />
            <stop offset="75%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>

          {/* Deep Shadow & Neon Filter */}
          <filter id="cyanGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Pixelated Tech Cubes (Left of K) */}
        <rect x="5" y="55" width="10" height="10" fill="#00E5FF" rx="1.5" />
        <rect x="18" y="42" width="12" height="12" fill="#00C8FF" rx="1.5" />
        <rect x="5" y="38" width="10" height="10" fill="#0099FF" rx="1.5" />
        <rect x="32" y="28" width="14" height="14" fill="#00E5FF" rx="2" />
        <rect x="18" y="70" width="12" height="12" fill="#0088FF" rx="1.5" />
        <rect x="32" y="85" width="10" height="10" fill="#00C8FF" rx="1.5" />

        {/* Left Vertical Cyan Pillar of "K" */}
        <path
          d="M 48 10 L 78 10 C 82 10 84 12 84 16 L 84 124 C 84 128 82 130 78 130 L 48 130 C 44 130 42 128 42 124 L 42 16 C 42 12 44 10 48 10 Z"
          fill="url(#cyanGrad)"
          filter="url(#cyanGlow)"
        />

        {/* Diagonal Top Arm (Silver) */}
        <path
          d="M 72 70 L 125 18 C 128 15 133 15 137 19 L 152 34 C 155 37 155 42 151 46 L 98 94 Z"
          fill="url(#silverGrad)"
        />

        {/* Diagonal Bottom Leg (Silver) */}
        <path
          d="M 75 62 L 148 122 C 152 125 152 130 148 134 L 134 140 C 130 142 126 140 123 137 L 60 76 Z"
          fill="url(#silverGrad)"
        />

        {/* Inner Highlight Line */}
        <path
          d="M 50 15 L 75 15 L 75 125 L 50 125 Z"
          fill="#FFFFFF"
          opacity="0.25"
        />
      </svg>

      {/* Typography: K R Y L O S Y S */}
      {!iconOnly && (
        <span className="font-extrabold tracking-tight sm:tracking-wider text-base sm:text-xl md:text-2xl flex items-center shrink-0">
          <span className="text-slate-900 dark:text-slate-100">RYLO</span>
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent ml-0.5 drop-shadow-[0_0_8px_rgba(0,200,255,0.4)]">
            SYS
          </span>
        </span>
      )}
    </div>
  );
}
