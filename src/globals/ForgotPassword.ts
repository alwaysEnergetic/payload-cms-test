import { GlobalConfig } from 'payload/types'

export const ForgotPassword: GlobalConfig = {
  slug: 'forgotPassword',
  admin: {
    group: 'Account',
  },
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
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      localized: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
