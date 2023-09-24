import {
  ExecuteFromAllowlist,
  Header,
  Mint,
  ToggleArt,
  AddToAllowlist,
} from '@/client';

function Hero() {
  return (
    <div className='flex gap-8 justify-center my-auto'>
      <AddToAllowlist />
      <ExecuteFromAllowlist />
    </div>
  );
}

function Footer() {
  return <div className='text-gray-100 font-normal'>Coming Soon</div>;
}

export default function Home() {
  return (
    <div className='flex flex-col h-screen w-screen'>
      <Header />
      <Hero />
    </div>
  );
}
