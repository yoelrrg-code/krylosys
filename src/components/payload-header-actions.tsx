'use client'

import React from 'react'

export function HeaderActions() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', justifyContent: 'space-between' }}>
      
      {/* Header Search Input Bar (Shadcn layout style) */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        backgroundColor: '#FFFFFF',
        border: '1px solid #E4E4E7',
        borderRadius: '6px',
        padding: '0.35rem 0.75rem',
        minWidth: '220px',
        maxWidth: '320px',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.02)'
      }}>
        <span style={{ fontSize: '0.8rem', color: '#A1A1AA' }}>🔍</span>
        <input
          type="text"
          placeholder="Search..."
          style={{
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            fontSize: '0.825rem',
            color: '#09090B',
            width: '100%',
            padding: 0
          }}
        />
      </div>

      {/* Right Controls: Notifications, Theme, Avatars & Invite button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        
        {/* Notification Bell */}
        <button style={{
          width: '32px',
          height: '32px',
          borderRadius: '6px',
          border: '1px solid #E4E4E7',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '0.85rem'
        }}>
          🔔
        </button>

        {/* Theme Toggle Button */}
        <button style={{
          width: '32px',
          height: '32px',
          borderRadius: '6px',
          border: '1px solid #E4E4E7',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '0.85rem'
        }}>
          ☀️
        </button>

        {/* Avatar Stack */}
        <div style={{ display: 'flex', alignItems: 'center', margin: '0 0.25rem' }}>
          <div style={{ width: '26px', height: '26px', borderRadius: '50%', border: '2px solid #FFFFFF', backgroundColor: '#09090B', color: '#FFFFFF', fontSize: '0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', marginLeft: '-6px' }}>Y</div>
          <div style={{ width: '26px', height: '26px', borderRadius: '50%', border: '2px solid #FFFFFF', backgroundColor: '#27272A', color: '#FFFFFF', fontSize: '0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', marginLeft: '-6px' }}>A</div>
          <div style={{ width: '26px', height: '26px', borderRadius: '50%', border: '2px solid #FFFFFF', backgroundColor: '#52525B', color: '#FFFFFF', fontSize: '0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', marginLeft: '-6px' }}>K</div>
        </div>

        {/* Invite Pill Button */}
        <button style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.35rem',
          backgroundColor: '#FFFFFF',
          border: '1px solid #E4E4E7',
          borderRadius: '6px',
          padding: '0.35rem 0.75rem',
          fontSize: '0.8rem',
          fontWeight: '500',
          color: '#09090B',
          cursor: 'pointer'
        }}>
          <span>👤+</span>
          <span>Invite</span>
        </button>

      </div>

    </div>
  )
}
