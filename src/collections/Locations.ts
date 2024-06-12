import type { CollectionConfig } from 'payload/types'

export const Locations: CollectionConfig = {
  slug: 'locations',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'type',
      label: 'Type',
      type: 'relationship',
      relationTo: 'locationTypes',
    },
    {
      name: 'page',
      label: 'Default page',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      relationTo: 'pages',
      required: true,
    },
  ],
}
