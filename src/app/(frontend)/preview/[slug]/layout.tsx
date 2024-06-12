import Footer from '@/app/_components/footer'
import Header from '@/app/_components/header'

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="pt-20">{children}</main>
      <Footer />
    </>
  )
}
