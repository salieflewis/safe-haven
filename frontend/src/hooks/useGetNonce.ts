import { safeGoerli } from '@/constants'
import { useContractRead } from 'wagmi'
import { safeAbi } from '@/abi'

export function useGetNonce() {
  const { data: nonce } = useContractRead({
    address: safeGoerli,
    abi: safeAbi,
    functionName: 'nonce',
  })

  return {
    nonce,
  }
}
