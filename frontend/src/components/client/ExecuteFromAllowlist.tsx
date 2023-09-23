import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  useContractRead,
  useAccount,
} from 'wagmi'
import { type Hex, type Hash, zeroAddress } from 'viem'
import { allowlistPluginAbi } from '@/abi'
import { safeGoerli, safeProtocolManagerGoerli } from '@/constants'
import { useGetNonce } from 'src/hooks'
import { useState, useEffect } from 'react'

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
  const { address } = useAccount()
  const { nonce } = useGetNonce()

  const safeTx: SafeTransaction = {
    actions: [
      {
        to: address as Hex,
        value: BigInt(0),
        data: zeroAddress,
      },
    ],
    nonce: nonce as bigint,
    metadataHash: zeroAddress,
  }

  const { config, error } = usePrepareContractWrite({
    address: safeProtocolManagerGoerli,
    abi: allowlistPluginAbi,
    functionName: 'executeFromPlugin',
    args: [safeProtocolManagerGoerli, safeGoerli, safeTx],
  })

  const { data, write: mintArt } = useContractWrite(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  return (
    <div className="flex flex-col">
      <button
        onClick={() => mintArt?.()}
        className="border border-black border-dashed p-2"
      >
        Execute Plugin
      </button>
    </div>
  )
}
