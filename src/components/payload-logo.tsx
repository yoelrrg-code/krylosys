import React from 'react'
import { Logo } from './logo'

export function AdminLogo() {
  return (
    <div className="flex items-center justify-center py-2 text-slate-900">
      <Logo className="h-10 md:h-12" />
    </div>
  )
}

export function AdminIcon() {
  return (
    <div className="flex items-center justify-center p-1 text-slate-900">
      <Logo className="h-8 md:h-10" iconOnly />
    </div>
  )
}
