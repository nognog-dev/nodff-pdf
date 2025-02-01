'use client';

import React from 'react';

export function Divider({ className = "" }) {
  return (
    <div
      className={`w-full h-[1px] bg-gradient-to-r from-[#072E4A] to-[#F0F9FF] ${className}`}
    />
  );
}
