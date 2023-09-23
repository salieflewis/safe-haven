import { safeGoerli, allowlistPlugin } from '@/constants'
import { useContractRead } from 'wagmi'
import { allowlistPluginAbi } from '@/abi'
import { type Hex } from 'viem'

export function useOnAllowlist({ address }: { address: Hex }) {
  const { data: onAllowlist } = useContractRead({
    address: allowlistPlugin,
    abi: allowlistPluginAbi,
    functionName: 'allowlistedAddresses',
    args: [safeGoerli, address],
  })

  return {
    onAllowlist,
  }
}
