import React from 'react'
import { Logo } from './logo'

export function AdminLogo() {
  return (
    <div className="dark flex items-center justify-center py-2 text-white">
      <Logo className="h-10 md:h-12" />
    </div>
  )
}

export function AdminIcon() {
  return (
    <div className="dark flex items-center justify-center p-1 text-white">
      <Logo className="h-8 md:h-10" iconOnly />
    </div>
  )
}
