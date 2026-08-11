import { getPayload } from 'payload'
import config from '@payload-config'

export async function getHeroData() {
  try {
    const payload = await getPayload({ config })
    const data = await payload.findGlobal({ slug: 'hero-section' })
    return data
  } catch (error) {
    console.error('Error fetching Hero section:', error)
    return null
  }
}

export async function getAboutData() {
  try {
    const payload = await getPayload({ config })
    const data = await payload.findGlobal({ slug: 'about-section' })
    return data
  } catch (error) {
    console.error('Error fetching About section:', error)
    return null
  }
}

export async function getContactData() {
  try {
    const payload = await getPayload({ config })
    const data = await payload.findGlobal({ slug: 'contact-info' })
    return data
  } catch (error) {
    console.error('Error fetching Contact info:', error)
    return null
  }
}

export async function getServicesData() {
  try {
    const payload = await getPayload({ config })
    const res = await payload.find({
      collection: 'services',
      limit: 100,
      overrideAccess: true,
    })
    return res.docs
  } catch (error) {
    console.error('Error fetching Services collection:', error)
    return []
  }
}

export async function getProjectsData() {
  try {
    const payload = await getPayload({ config })
    const res = await payload.find({
      collection: 'projects',
      limit: 100,
      overrideAccess: true,
    })
    return res.docs
  } catch (error) {
    console.error('Error fetching Projects collection:', error)
    return []
  }
}

export async function getFaqsData() {
  try {
    const payload = await getPayload({ config })
    const res = await payload.find({
      collection: 'faqs',
      sort: 'order',
      limit: 100,
      overrideAccess: true,
    })
    return res.docs
  } catch (error) {
    console.error('Error fetching FAQs collection:', error)
    return []
  }
}
