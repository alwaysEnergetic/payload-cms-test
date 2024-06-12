import { admins } from '@/access/admin'
import type { CollectionConfig } from 'payload/types'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    forgotPassword: {
      generateEmailHTML: (props) => {
        if (!props) return ''

        const { token } = props

        const resetPasswordURL = `${process.env.PAYLOAD_PUBLIC_NEXT_URL}/reset-password?token=${token}`

        return `
          <!doctype html>
          <html>
            <body>
              <h1>Hi there</h1>
              <p>Click below to reset your password.</p>
              <p>
                <a href="${resetPasswordURL}">${resetPasswordURL}</a>
              </p>
            </body>
          </html>
        `
      },
    },
  },
  admin: {
    useAsTitle: 'email',
  },
  access: {
    create: () => true,
    update: () => true,
    read: () => true,
    delete: admins,
  },
  fields: [
    {
      type: 'text',
      name: 'firstName',
      label: 'First name',
      required: true,
      saveToJWT: true,
    },
    {
      type: 'text',
      name: 'lastName',
      label: 'Last name',
      required: true,
      saveToJWT: true,
    },
    {
      type: 'relationship',
      name: 'locations',
      relationTo: 'locations',
      hasMany: true,
    },
    {
      type: 'select',
      name: 'roles',
      admin: {
        position: 'sidebar',
      },
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Staff',
          value: 'staff',
        },
      ],
      defaultValue: ['staff'],
      hasMany: true,
    },
  ],
}
