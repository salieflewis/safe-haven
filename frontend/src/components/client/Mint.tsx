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

  return <>{JSON.stringify(getIsArt)}</>;
}

export function Mint() {
  const { address } = useAccount();
  const { config, error } = usePrepareContractWrite({
    address: isArtGoerli,
    abi: isArtAbi,
    functionName: 'mint',
    args: [address as Hex, BigInt(1)],
  });

  const { data, write: mintArt } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <div className='flex flex-col'>
      <IsArt />
      <button onClick={() => mintArt?.()}>Mint Art</button>
    </div>
  );
}
