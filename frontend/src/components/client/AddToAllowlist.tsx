import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  useContractRead,
  useAccount,
} from 'wagmi'
import { type Hex, type Hash, zeroAddress, concat } from 'viem'
import { allowlistPluginAbi } from '@/abi'
import {
  isArtGoerli,
  safeGoerli,
  safeProtocolManagerGoerli,
  zeroHash,
  allowlistPlugin,
} from '@/constants'
import { useGetNonce, useOnAllowlist } from 'src/hooks'
import { useSafeOwners } from 'src/hooks/useSafeOwners'
import { useState } from 'react'
import { ActionContainer } from './ActionContainer'

export function AddToAllowlist() {
  const [addressToAllow, setAddressToAllow] = useState<Hex>()

  const handleChange = (e: any) => {
    setAddressToAllow(e.target.value)
  }

  const { config, error } = usePrepareContractWrite({
    address: allowlistPlugin,
    abi: allowlistPluginAbi,
    functionName: 'addToAllowlist',
    args: [addressToAllow as Hex],
  })

  const { data, write: allowAddresses } = useContractWrite(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  return (
    <div className="flex flex-col gap-3 items-center">
      <ActionContainer>
        <h1 className="text-center">
          Permission an Ethereum user granular access to your safe
        </h1>
        <textarea
          value={addressToAllow}
          onChange={handleChange}
          placeholder="Enter an Ethereum address..."
          className="border border-gray-100 rounded placeholder:text-sm placeholder:text-black/80 w-full p-1 focus:outline-[#3E9D2D]"
        />
        <button
          onClick={() => allowAddresses}
          className="border-2 border-[#3E9D2D] hover:bg-[#3E9D2D]/10 p-2 rounded-full text-[#3E9D2D] transition-all"
        >
          Allow Addresses
        </button>
      </ActionContainer>
      <div className="flex w-fit rounded-full px-3 py-1 bg-[#3E9D2D]/10 uppercase text-[#3E9D2D] text-xs font-medium items-center font-mono">
        Must be called from your safe
      </div>
    </div>
  )
}
