import { ExecuteFromAllowlist, Header, Mint, ToggleArt } from '@/client'

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <Header />
      <ToggleArt />
      <Mint />
      <ExecuteFromAllowlist />
    </div>
  )
}
