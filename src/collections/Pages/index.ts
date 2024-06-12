import { CollectionConfig } from 'payload/types'
import formatSlug from './hooks/formatSlug'
import { loggedIn } from './access/loggedIn'
import WithBackgroundImage from './blocks/WithBackgroundImage'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    read: () => true,
    create: loggedIn,
    update: loggedIn,
    delete: loggedIn,
  },
  versions: {
    drafts: true,
  },
  admin: {
    useAsTitle: 'title',
    livePreview: {
      url: ({ data }) => `${process.env.PAYLOAD_PUBLIC_NEXT_URL}/preview/${data.slug}`,
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
      localized: true,
    },
    {
      type: 'blocks',
      name: 'blocks',
      localized: true,
      minRows: 1,
      blocks: [
        {
          slug: 'richtext',
          fields: [
            {
              name: 'body',
              type: 'richText',
              required: true,
            },
          ],
        },
        WithBackgroundImage,
      ],
    },
    {
      name: 'slug',
      type: 'text',
      index: true,
      label: 'Slug',
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [formatSlug('title')],
      },
    },
  ],
}
