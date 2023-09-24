import { ConnectKitButton } from 'connectkit'
import { SafeHaven } from '@/server'

export function Header() {
  return (
    <div className="flex justify-between items-center p-4">
      <SafeHaven />
      <ConnectKitButton />
    </div>
  )
}
