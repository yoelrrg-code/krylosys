'use client'

import React from 'react'

export function SidebarHeader() {
  return (
    <div style={{
      padding: '0.85rem 1rem',
      borderBottom: '1px solid #E4E4E7',
      marginBottom: '0.75rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#FFFFFF',
      borderRadius: '8px',
      margin: '0.5rem 0.5rem 0.75rem 0.5rem',
      boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
        <div style={{
          width: '28px',
          height: '28px',
          borderRadius: '6px',
          backgroundColor: '#09090B',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: '700',
          fontSize: '0.8rem'
        }}>
          K
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#09090B', lineHeight: 1.1 }}>
            Krylosys Admin
          </span>
          <span style={{ fontSize: '0.7rem', color: '#71717A', fontWeight: '400' }}>
            Production
          </span>
        </div>
      </div>
      <span style={{ fontSize: '0.75rem', color: '#A1A1AA' }}>⇕</span>
    </div>
  )
}
