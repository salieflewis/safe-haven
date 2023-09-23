import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'

import { isArtAbi } from '@/abi'
import { isArtGoerli } from '@/constants'

export function ToggleArt() {
  const { config, error } = usePrepareContractWrite({
    address: isArtGoerli,
    abi: isArtAbi,
    functionName: 'toggle',
  })

  const { data, write: toggleArt } = useContractWrite(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  return <button onClick={() => toggleArt?.()}>Toggle Art</button>
}
