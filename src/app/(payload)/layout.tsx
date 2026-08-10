import config from '@payload-config'
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import { importMap } from './admin/importMap'
import React from 'react'
import '@payloadcms/next/css'
import './custom.css'

export const dynamic = 'force-dynamic'

type Args = {
  children: React.ReactNode
}

const ServerLayout = async ({ children }: Args) => {
  return (
    <RootLayout
      config={config}
      importMap={importMap}
      serverFunction={async (args) => {
        'use server'
        return handleServerFunctions({
          ...args,
          config,
          importMap,
        })
      }}
    >
      {children}
    </RootLayout>
  )
}

export default ServerLayout
