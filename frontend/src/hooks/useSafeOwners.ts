import { safeGoerli } from '@/constants'
import { useContractRead } from 'wagmi'
import { safeAbi } from '@/abi'

export function useSafeOwners() {
  const { data: owners } = useContractRead({
    address: safeGoerli,
    abi: safeAbi,
    functionName: 'getOwners',
  })

  return {
    owners,
  }
}
