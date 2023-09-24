import {
  ExecuteFromAllowlist,
  Header,
  Mint,
  ToggleArt,
  AddToAllowlist,
} from '@/client'

function Hero() {
  return (
    <div className="flex flex-col md:flex-row gap-8 justify-center my-auto mx-auto">
      <AddToAllowlist />
      <ExecuteFromAllowlist />
    </div>
  )
}

export default function Home() {
  return (
    <div
      className="flex flex-col w-screen"
      style={{ height: 'calc(100vh - 72px)' }}
    >
      <Header />
      <Hero />
    </div>
  )
}
