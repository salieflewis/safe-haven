import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  useContractRead,
  useAccount,
} from 'wagmi';
import { type Hex, type Hash, zeroAddress, concat } from 'viem';
import { allowlistPluginAbi } from '@/abi';
import {
  isArtGoerli,
  safeGoerli,
  safeProtocolManagerGoerli,
  zeroHash,
  allowlistPlugin,
} from '@/constants';
import { useGetNonce, useOnAllowlist } from 'src/hooks';
import { useSafeOwners } from 'src/hooks/useSafeOwners';
import { useState } from 'react';
import { ActionContainer } from './ActionContainer';

export function AddToAllowlist() {
  const [addressesToAllow, setAddressesToAllow] = useState<Hex[]>();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // @ts-ignore
    setAddressesToAllow(e.target.value);
  };

  const { config, error } = usePrepareContractWrite({
    address: allowlistPlugin,
    abi: allowlistPluginAbi,
    functionName: 'addToAllowlist',
    // args: addressesToAllow as Hex[],
  });

  const { data, write: allowAddresses } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <ActionContainer>
      <h1>Permission a group of Ethereum users access to your safe</h1>
      <textarea
        value={addressesToAllow}
        onChange={handleChange}
        placeholder='Enter an Ethereum address...'
        className='border border-gray-100 rounded placeholder:text-sm placeholder:text-black/80 w-full p-1'
      />

      <button onClick={() => allowAddresses}>Allow Addresses</button>
    </ActionContainer>
  );
}

{
  /* <div className='flex w-fit rounded-full px-3 py-1 bg-slate-100 uppercase text-xs font-medium items-center'>
  Function must be called from your safe
</div>; */
}
