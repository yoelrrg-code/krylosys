'use client'

import React from 'react'

export function SidebarFooter() {
  return (
    <div style={{
      marginTop: 'auto',
      paddingTop: '1rem',
      padding: '0.75rem 0.5rem 0.5rem 0.5rem',
      borderTop: '1px solid #E4E4E7',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    }}>
      {/* Help Center Link */}
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.45rem 0.65rem',
          borderRadius: '6px',
          color: '#3F3F46',
          fontSize: '0.825rem',
          fontWeight: '500',
          textDecoration: 'none',
          transition: 'background-color 0.15s ease'
        }}
      >
        <span>❓</span>
        <span>Help Center</span>
      </a>

      {/* User Profile Card */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.5rem 0.65rem',
        backgroundColor: '#FFFFFF',
        border: '1px solid #E4E4E7',
        borderRadius: '8px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            backgroundColor: '#18181B',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem',
            fontWeight: '600'
          }}>
            Y
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#09090B', whiteSpace: 'nowrap' }}>
              Yoelkys Admin
            </span>
            <span style={{ fontSize: '0.675rem', color: '#71717A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '110px' }}>
              admin@krylosys.com
            </span>
          </div>
        </div>
        <span style={{ fontSize: '0.75rem', color: '#A1A1AA' }}>⇕</span>
      </div>
    </div>
  )
}
