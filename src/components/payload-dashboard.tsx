'use client'

import React, { useState } from 'react'

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'reports' | 'notifications'>('overview')
  const [searchTerm, setSearchTerm] = useState('')

  const stats = [
    { title: 'Total Revenue', value: '$45,231.89', sub: '+20.1% from last month', icon: '$' },
    { title: 'Subscriptions', value: '+2350', sub: '+180.1% from last month', icon: '👤' },
    { title: 'Sales', value: '+12,234', sub: '+19% from last month', icon: '💳' },
    { title: 'Active Now', value: '+573', sub: '+201 from last month', icon: '⚡' },
  ]

  const quickLinks = [
    { title: 'Hero Section', href: '/admin/globals/hero-section', desc: 'Title, subtitle and CTA buttons', category: 'Global' },
    { title: 'About (Bento Grid)', href: '/admin/globals/about-section', desc: 'Bento cards and success metrics', category: 'Global' },
    { title: 'Services Config', href: '/admin/globals/services-section', desc: 'Services overview and header', category: 'Global' },
    { title: 'Projects Config', href: '/admin/globals/projects-section', desc: 'Portfolio intro and showcase', category: 'Global' },
    { title: 'FAQ Section', href: '/admin/globals/faq-section', desc: 'FAQ module header and text', category: 'Global' },
    { title: 'Contact Info', href: '/admin/globals/contact-info', desc: 'Email, WhatsApp, phones & social links', category: 'Global' },
    { title: 'Services List', href: '/admin/collections/services', desc: 'Manage services items and details', category: 'Collection' },
    { title: 'Projects List', href: '/admin/collections/projects', desc: 'Manage portfolio project items', category: 'Collection' },
    { title: 'FAQs List', href: '/admin/collections/faqs', desc: 'Manage questions and answers', category: 'Collection' },
    { title: 'Users List', href: '/admin/collections/users', desc: 'Manage admin users and permissions', category: 'Collection' },
  ]

  const filteredLinks = quickLinks.filter(l => 
    l.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.desc.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const barData = [
    { month: 'Jan', height: '65%' },
    { month: 'Feb', height: '45%' },
    { month: 'Mar', height: '25%' },
    { month: 'Apr', height: '50%' },
    { month: 'May', height: '95%' },
    { month: 'Jun', height: '50%' },
    { month: 'Jul', height: '35%' },
    { month: 'Aug', height: '60%' },
    { month: 'Sep', height: '20%' },
    { month: 'Oct', height: '20%' },
    { month: 'Nov', height: '70%' },
    { month: 'Dec', height: '35%' },
  ]

  const leads = [
    { name: 'Lead', count: '286', pct: '83%', width: '83%' },
    { name: 'Qualified', count: '286', pct: '83%', width: '83%' },
    { name: 'Proposal', count: '286', pct: '83%', width: '45%' },
    { name: 'Negotiation', count: '286', pct: '83%', width: '60%' },
  ]

  return (
    <div style={{ width: '100%', boxSizing: 'border-box', color: '#09090B', backgroundColor: '#FAFAFA', paddingBottom: '3rem' }}>
      
      {/* Top Header Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: '700', color: '#09090B', margin: 0, letterSpacing: '-0.03em' }}>
            Dashboard
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Date Picker Button Pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E4E4E7',
            borderRadius: '6px',
            padding: '0.45rem 0.85rem',
            fontSize: '0.825rem',
            fontWeight: '500',
            color: '#09090B',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)'
          }}>
            <span>📅</span>
            <span>Oct 17, 2024 - Nov 6, 2024</span>
          </div>

          {/* Download Button */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: '#09090B',
              color: '#FFFFFF',
              fontWeight: '500',
              padding: '0.45rem 1rem',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '0.85rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              transition: 'background-color 0.15s ease',
            }}
          >
            Download
          </a>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        backgroundColor: '#F4F4F5',
        padding: '3px',
        borderRadius: '8px',
        marginBottom: '1.5rem',
        gap: '2px'
      }}>
        {(['overview', 'analytics', 'reports', 'notifications'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              backgroundColor: activeTab === tab ? '#FFFFFF' : 'transparent',
              color: activeTab === tab ? '#09090B' : '#71717A',
              border: 'none',
              borderRadius: '6px',
              padding: '0.4rem 0.9rem',
              fontSize: '0.85rem',
              fontWeight: activeTab === tab ? '600' : '500',
              cursor: 'pointer',
              boxShadow: activeTab === tab ? '0 1px 2px rgba(0,0,0,0.04)' : 'none',
              transition: 'all 0.15s ease',
              textTransform: 'capitalize',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 4 Top Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {stats.map((st) => (
          <div
            key={st.title}
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E4E4E7',
              borderRadius: '12px',
              padding: '1.25rem 1.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.825rem', color: '#71717A', fontWeight: '500' }}>{st.title}</span>
              <span style={{ fontSize: '0.95rem', color: '#A1A1AA' }}>{st.icon}</span>
            </div>
            <div style={{ fontSize: '1.65rem', fontWeight: '700', color: '#09090B', lineHeight: 1.2, marginBottom: '0.25rem', letterSpacing: '-0.02em' }}>
              {st.value}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#71717A', fontWeight: '400' }}>
              {st.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Middle Grid: Overview Bar Chart & Right Side Widgets */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        
        {/* Overview Bar Chart Card */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E4E4E7',
          borderRadius: '12px',
          padding: '1.5rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '340px'
        }}>
          <h2 style={{ fontSize: '1.05rem', fontWeight: '600', color: '#09090B', margin: '0 0 1.5rem 0' }}>Overview</h2>

          {/* Bar chart representation */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '200px', gap: '0.5rem', paddingBottom: '0.5rem' }}>
            {barData.map((d) => (
              <div key={d.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                <div style={{
                  width: '100%',
                  maxWidth: '32px',
                  height: d.height,
                  backgroundColor: '#09090B',
                  borderRadius: '6px 6px 4px 4px',
                  transition: 'height 0.3s ease',
                }} />
                <span style={{ fontSize: '0.7rem', color: '#71717A', marginTop: '0.5rem', fontWeight: '500' }}>{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Leads-to-clients & To-do lists */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Leads-to-clients Card */}
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E4E4E7',
            borderRadius: '12px',
            padding: '1.25rem 1.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: '600', color: '#09090B', margin: 0 }}>Leads-to-clients</h3>
              <button style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E4E4E7',
                borderRadius: '6px',
                padding: '0.2rem 0.6rem',
                fontSize: '0.75rem',
                fontWeight: '500',
                color: '#09090B',
                cursor: 'pointer'
              }}>
                Visit all
              </button>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#71717A', margin: '0 0 1rem 0' }}>Deploy your new project in one-click.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {leads.map((item) => (
                <div key={item.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.775rem', fontWeight: '500', marginBottom: '0.25rem' }}>
                    <span style={{ color: '#09090B' }}>{item.name}</span>
                    <span style={{ color: '#71717A' }}>{item.count} <strong style={{ color: '#09090B' }}>({item.pct})</strong></span>
                  </div>
                  <div style={{ width: '100%', height: '6px', backgroundColor: '#F4F4F5', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: item.width, height: '100%', backgroundColor: '#09090B', borderRadius: '3px' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* To-do lists Card */}
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E4E4E7',
            borderRadius: '12px',
            padding: '1.25rem 1.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
          }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: '600', color: '#09090B', margin: '0 0 0.25rem 0' }}>To-do lists</h3>
            <p style={{ fontSize: '0.75rem', color: '#71717A', margin: '0 0 1rem 0' }}>Manage your todays works here.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                { title: 'Strictly Necessary', desc: 'These cookies are essential in order to use the website.' },
                { title: 'Functional Cookies', desc: 'These cookies allow the website to provide personalized functionality.' },
                { title: 'Performance Cookies', desc: 'These cookies help to improve the performance of the website.' },
              ].map((sw, i) => (
                <div key={sw.title} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#09090B' }}>{sw.title}</div>
                    <div style={{ fontSize: '0.7rem', color: '#71717A', lineHeight: 1.3 }}>{sw.desc}</div>
                  </div>
                  {/* Switch Pill representation */}
                  <div style={{
                    width: '36px',
                    height: '20px',
                    backgroundColor: i < 2 ? '#09090B' : '#E4E4E7',
                    borderRadius: '10px',
                    position: 'relative',
                    cursor: 'pointer',
                    flexShrink: 0
                  }}>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '50%',
                      position: 'absolute',
                      top: '2px',
                      left: i < 2 ? '18px' : '2px',
                      transition: 'all 0.2s ease'
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Section: Quick Access to Content Globals & Collections */}
      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E4E4E7', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
        
        {/* Controls & Filter Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.05rem', fontWeight: '600', color: '#09090B', margin: 0 }}>Content Sections & Modules</h2>
            <p style={{ fontSize: '0.8rem', color: '#71717A', margin: '0.2rem 0 0 0' }}>Select any global config or collection to manage content</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Filter Projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E4E4E7',
                borderRadius: '6px',
                padding: '0.4rem 0.75rem',
                color: '#09090B',
                fontSize: '0.825rem',
                outline: 'none',
                minWidth: '200px',
              }}
            />

            <button style={{ backgroundColor: '#FFFFFF', border: '1px solid #E4E4E7', borderRadius: '6px', padding: '0.4rem 0.75rem', fontSize: '0.8rem', fontWeight: '500', color: '#09090B', cursor: 'pointer' }}>
              + Status
            </button>
            <button style={{ backgroundColor: '#FFFFFF', border: '1px solid #E4E4E7', borderRadius: '6px', padding: '0.4rem 0.75rem', fontSize: '0.8rem', fontWeight: '500', color: '#09090B', cursor: 'pointer' }}>
              + Priority
            </button>
            <button style={{ backgroundColor: '#FFFFFF', border: '1px solid #E4E4E7', borderRadius: '6px', padding: '0.4rem 0.75rem', fontSize: '0.8rem', fontWeight: '500', color: '#09090B', cursor: 'pointer' }}>
              View
            </button>
          </div>
        </div>

        {/* Links Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.85rem' }}>
          {filteredLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                backgroundColor: '#FAFAFA',
                border: '1px solid #E4E4E7',
                borderRadius: '8px',
                padding: '1rem 1.15rem',
                textDecoration: 'none',
                transition: 'all 0.15s ease',
                display: 'block',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <span style={{ color: '#09090B', fontWeight: '600', fontSize: '0.875rem' }}>{link.title}</span>
                <span style={{
                  fontSize: '0.675rem',
                  fontWeight: '600',
                  color: link.category === 'Global' ? '#09090B' : '#52525B',
                  backgroundColor: link.category === 'Global' ? '#E4E4E7' : '#F4F4F5',
                  padding: '0.15rem 0.45rem',
                  borderRadius: '4px'
                }}>
                  {link.category}
                </span>
              </div>
              <p style={{ color: '#71717A', fontSize: '0.775rem', margin: 0, lineHeight: 1.4 }}>{link.desc}</p>
            </a>
          ))}
        </div>

      </div>

    </div>
  )
}
