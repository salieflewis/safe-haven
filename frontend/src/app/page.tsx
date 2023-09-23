import { ExecuteFromAllowlist, Header, Mint } from '@/client'

export default function Home() {
  return (
    <div className="flex flex-col justify-between">
      <Header />
      <Mint />
      <ExecuteFromAllowlist />
    </div>
  )
}
