import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  useContractRead,
  useAccount,
} from 'wagmi';
import { type Hex, type Hash, zeroAddress } from 'viem';
import { allowlistPluginAbi } from '@/abi';
import { isArtGoerli, safeGoerli, safeProtocolManagerGoerli } from '@/constants';
import { useGetNonce } from 'src/hooks';
import { useState, useEffect } from 'react';

interface SafeProtocolAction {
  to: Hex;
  value: bigint;
  data: Hash;
}

interface SafeTransaction {
  actions: SafeProtocolAction[];
  nonce: bigint;
  metadataHash: Hash;
}

// TODO: add `buildSafetx` fn

export function ExecuteFromAllowlist() {
  const { address } = useAccount();
  const { nonce } = useGetNonce();

  const safeTx: SafeTransaction = {
    actions: [
      {
        to: isArtGoerli,
        value: BigInt(0),
        data: '40C10F190000000000000000000000000309DC203F12F2155857651B7301D1365F619B3D0000000000000000000000000000000000000000000000000000000000000001' as Hash,
      },
    ],
    nonce: nonce as bigint,
    metadataHash: zeroAddress,
  };

  const { config, error } = usePrepareContractWrite({
    address: safeProtocolManagerGoerli,
    abi: allowlistPluginAbi,
    functionName: 'executeFromPlugin',
    args: [safeProtocolManagerGoerli, safeGoerli, safeTx],
  });

  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <div className='flex flex-col'>
      <button
        onClick={() => write?.()}
        className='border border-black border-dashed p-2'
      >
        Execute Txn From Plugin
      </button>
    </div>
  );
}
