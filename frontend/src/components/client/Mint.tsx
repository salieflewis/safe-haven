import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  useContractRead,
  useAccount,
} from 'wagmi';
import { type Hex } from 'viem';
import { isArtAbi } from '@/abi';
import { isArtGoerli } from '@/constants';

function IsArt() {
  const { data: getIsArt } = useContractRead({
    address: isArtGoerli,
    abi: isArtAbi,
    functionName: 'getIsArt',
  });

  return (
    <div className='flex w-fit rounded-full px-2 bg-slate-100 uppercase text-xs font-medium items-center'>
      {JSON.stringify(getIsArt)}
    </div>
  );
}

export function Mint() {
  const { address } = useAccount();
  const { config, error } = usePrepareContractWrite({
    address: isArtGoerli,
    abi: isArtAbi,
    functionName: 'mint',
    args: [address as Hex, BigInt(2)],
  });

  const { data, write: mintArt } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <div className='flex gap-2 justify-center'>
      <IsArt />
      <button onClick={() => mintArt?.()}>Mint Art</button>
    </div>
  );
}
