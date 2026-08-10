import config from '@payload-config'
import { NotFoundPage, generatePageMetadata } from '@payloadcms/next/views'
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

export const generateMetadata = ({ params, searchParams }: Args) => {
  const safeParams = params || Promise.resolve({ segments: [] })
  const safeSearchParams = searchParams || Promise.resolve({})
  return generatePageMetadata({ config, params: safeParams, searchParams: safeSearchParams })
}

const NotFound = async ({ params, searchParams }: Args) => {
  const resolvedParams = (await params) || {}
  const resolvedSearchParams = (await searchParams) || {}

  const safeParams = Promise.resolve({
    segments: resolvedParams.segments || [],
  })
  const safeSearchParams = Promise.resolve(resolvedSearchParams)

  return NotFoundPage({ config, params: safeParams, searchParams: safeSearchParams, importMap })
}

export default NotFound
