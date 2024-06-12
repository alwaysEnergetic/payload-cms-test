type Props = {
  className?: string
  content: any
}

const RichText: React.FC<Props> = ({ className, content }) => {
  if (!content) {
    return null
  }

  return (
    <code className={`${className} whitespace-pre-wrap`}>{JSON.stringify(content, null, 2)}</code>
  )
}

export default RichText
