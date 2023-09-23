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

  return (
    <div className="flex gap-2 justify-center">
      <div className="flex w-fit rounded-full px-2 bg-slate-100 uppercase text-xs font-medium items-center">
        {isConnected && JSON.stringify(onAllowlist) === 'true'
          ? 'allowed'
          : isConnected && JSON.stringify(onAllowlist) === 'false'
          ? 'unallowed'
          : 'unknown'}
      </div>
      <button onClick={handleExecute}>Execute Txn From Plugin</button>
    </div>
  )
}
