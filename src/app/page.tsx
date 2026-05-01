'use client';

import { Socials } from '@/components/layout';
import { Card } from '@heroui/react';

const Home = () => {
  return (
    <div className="mx-auto my-auto px-10">
      <div className="flex flex-col items-center gap-5">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold text-center">
            A set of utilities for Solana&nbsp;projects
          </h1>

          <p className="text-gray-300 font-medium text-center">Fully opensource, no hidden fees</p>
        </div>

        <div>
          <a href="/pumpfun">
            <Card className="flex flex-row gap-4 px-5 hover:opacity-90 transition-opacity">
              <div className="py-1">
                <img alt="PumpFun" src="/assets/pumpfun-logo.svg" className="w-10 h-10" />
              </div>

              <div className="flex flex-col">
                <h3 className="text-md font-bold">
                  Pump<span className="text-accent">.</span>Fun cashback
                </h3>

                <p className="text-gray-300 font-medium">Claim your yield from cashback tokens</p>
              </div>
            </Card>
          </a>
        </div>

        <Socials />
      </div>
    </div>
  );
};

export default Home;
