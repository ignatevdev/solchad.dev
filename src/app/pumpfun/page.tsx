'use client';

import { Socials } from '@/components/layout';
import { CashbackClaim } from '@/components/pumpfun';

const PumpFun = () => {
  return (
    <div className="mx-auto my-auto px-10">
      <main className="flex flex-col items-center gap-5">
        <img className="w-20 h-20" src="/assets/pumpfun-logo.svg" alt="Pump.fun logo" />

        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-3xl font-bold">
            Claim your Pump<span className="text-accent">.</span>Fun cashback
          </h1>

          <p className="text-gray-300 font-medium">
            Check your unclaimed yield and claim it in a few clicks
          </p>
        </div>

        <CashbackClaim />

        <Socials />
      </main>
    </div>
  );
};

export default PumpFun;
