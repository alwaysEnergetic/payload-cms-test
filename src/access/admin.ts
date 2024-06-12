import { Access } from 'payload/types'
import { checkRole } from './checkRole'

export const admins: Access = ({ req: { user } }) => {
  if (!user) return false
  return checkRole(['admin'], user)
}
