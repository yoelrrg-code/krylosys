import React from 'react'
import { AdminLayoutClient } from '@/components/admin/layout-client'

export const metadata = {
  title: 'Dashboard Admin | Krylosys',
  description: 'Panel de administración custom para Krylosys',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>
}
