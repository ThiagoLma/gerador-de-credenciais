'use client';

import React, { useState } from 'react';
import { Shield } from 'lucide-react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function BrandLogo({ className = '', size = 'md' }: BrandLogoProps) {
  const [hasError, setHasError] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  }[size];

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }[size];

  if (!hasError) {
    return (
      <div
        className={`relative flex items-center justify-center shrink-0 transition-transform hover:scale-105 ${sizeClasses} ${className}`}
      >
        <img
          src="/logo.png"
          alt="Logo Onboarding Pass"
          onError={() => setHasError(true)}
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  // Fallback se não encontrar o arquivo
  return (
    <div
      className={`flex items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 shadow-glow-blue ${sizeClasses} ${className}`}
    >
      <Shield className={`${iconSizes} text-white`} />
    </div>
  );
}
