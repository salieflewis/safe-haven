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
} from '@/constants'
import { useGetNonce, useOnAllowlist } from 'src/hooks'
import { useSafeOwners } from 'src/hooks/useSafeOwners'
import { ActionContainer } from './ActionContainer'
import { useState } from 'react'

interface SafeProtocolAction {
  to: Hex
  value: bigint
  data: Hash
}

interface SafeTransaction {
  actions: SafeProtocolAction[]
  nonce: bigint
  metadataHash: Hash
}

// TODO: add `buildSafetx` fn

export function ExecuteFromAllowlist() {
  const { address, isConnected } = useAccount()
  const { nonce } = useGetNonce()
  const { onAllowlist } = useOnAllowlist({ address: address as Hex })
  const { owners } = useSafeOwners()

  const [calldata, setCalldata] = useState<Hash>()

  console.log('Owners', owners) // client side log

  const mintIsArtCalldata = concat([
    '0x40c10f19', // mint function
    '0x000000000000000000000000f2365a26f766109b5322b0f90d71c21bf32bda04', // address to mint to
    '0x0000000000000000000000000000000000000000000000000000000000000004', // number of tokens to mint
  ])

  const toggleCalldata = '0x40a3d246' as Hash

  const safeTx: SafeTransaction = {
    actions: [
      {
        to: isArtGoerli,
        value: BigInt(0),
        data: toggleCalldata,
        // data: mintIsArtCalldata as Hash,
      },
    ],
    nonce: nonce as bigint,
    metadataHash: zeroHash,
  }

  const { config, error } = usePrepareContractWrite({
    address: safeProtocolManagerGoerli,
    abi: allowlistPluginAbi,
    functionName: 'executeFromPlugin',
    args: [safeProtocolManagerGoerli, safeGoerli, safeTx],
  })

  const { data, write } = useContractWrite(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  const handleExecute = () => {
    console.log('Attempting to execute transaction from plugin') // client side log
    write?.()
  }

  const handleChange = (e: any) => {
    setCalldata(e.target.value)
  }

  return (
    <div className="flex flex-col gap-3 items-center">
      <ActionContainer>
        <h1 className="text-center">
          Execute arbitrary calldata on behalf of a permissioned address
        </h1>
        <textarea
          value={calldata}
          onChange={handleChange}
          placeholder="Enter calldata..."
          className="border border-gray-100 rounded placeholder:text-sm placeholder:text-black/80 w-full p-1 focus:outline-[#F25E24]"
        />
        <button
          onClick={handleExecute}
          className="border-2 border-[#F25E24] hover:bg-[#F25E24]/10 p-2 rounded-full text-[#F25E24] transition-all"
        >
          Handle Execution
        </button>
      </ActionContainer>
      <div className="flex w-fit rounded-full px-3 py-1 bg-[#F25E24]/10 uppercase text-[#F25E24] text-xs font-medium items-center font-mono">
        {isConnected && JSON.stringify(onAllowlist) === 'true'
          ? 'connected address is on allowlist'
          : isConnected && JSON.stringify(onAllowlist) === 'false'
          ? 'connected address is not on allowlist'
          : 'connect to determine execution permissions'}
      </div>
    </div>
  )
}
