import { CollectionConfig } from 'payload/types'

export const LocationTypes: CollectionConfig = {
  slug: 'locationTypes',
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
  ],
}
