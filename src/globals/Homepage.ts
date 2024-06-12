import { GlobalConfig } from 'payload/types'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  fields: [
    {
      name: 'background',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
