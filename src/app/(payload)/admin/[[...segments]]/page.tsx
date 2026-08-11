import config from '@payload-config'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap'

export const dynamic = 'force-dynamic'

type Args = {
  params?: Promise<{
    segments?: string[]
  }>
  searchParams?: Promise<{
    [key: string]: string | string[]
  }>
}

export const generateMetadata = async ({ params, searchParams }: Args) => {
  const resolvedParams = (await params) || {}
  const resolvedSearchParams = (await searchParams) || {}

  const filtered = resolvedParams.segments?.filter((s) => Boolean(s) && s !== 'admin')
  const safeParams = Promise.resolve({
    segments: filtered && filtered.length > 0 ? filtered : undefined,
  }) as Promise<{ segments: string[] }>
  const safeSearchParams = Promise.resolve(resolvedSearchParams)

  return generatePageMetadata({ config, params: safeParams, searchParams: safeSearchParams })
}

const Page = async ({ params, searchParams }: Args) => {
  const resolvedParams = (await params) || {}
  const resolvedSearchParams = (await searchParams) || {}

  const filtered = resolvedParams.segments?.filter((s) => Boolean(s) && s !== 'admin')
  const safeParams = Promise.resolve({
    segments: filtered && filtered.length > 0 ? filtered : undefined,
  }) as Promise<{ segments: string[] }>
  const safeSearchParams = Promise.resolve(resolvedSearchParams)

  return RootPage({ config, params: safeParams, searchParams: safeSearchParams, importMap })
}

export default Page
