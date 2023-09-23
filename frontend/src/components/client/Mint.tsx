import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { isArtAbi } from '@/abi';
import { isArtGoerli } from '@/constants';

export function Mint() {
  const { config } = usePrepareContractWrite({
    address: isArtGoerli,
    abi: isArtAbi,
    functionName: 'mint',
  });

  const { data, write: mintArt } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });
  return <button onClick={() => mintArt?.()}>Mint Art</button>;
}
