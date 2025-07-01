import { useHead } from '@vueuse/head'

import type { ISeoOptions } from './types'

export function useSeo(options: ISeoOptions = {}) {
  const {
    title = 'Vue.js Application',
    description = 'Modern web application built with Vue 3, TypeScript, and Tailwind CSS',
    keywords = 'Vue.js, TypeScript, Tailwind CSS, Web Application',
    image = '/og-image.jpg',
    url = 'https://freddy-vue-1-jul.vercel.app',
    type = 'website',
    author = 'Your Name',
  } = options

  useHead({
    title,
    meta: [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { name: 'author', content: author },
      { name: 'robots', content: 'index, follow' },

      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:url', content: url },
      { property: 'og:type', content: type },

      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
      { name: 'twitter:url', content: url },
    ],
    link: [{ rel: 'canonical', href: url }],
  })
}
