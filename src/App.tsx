import { useMemo, useState } from 'react';
import { usePingPongLogs } from '@/indexer/usePingPongLogs';
import { Button } from '@/components/ui/button';
import { useWriteContract } from 'wagmi';
import { pingPongAbi } from '@/abi/pingPongAbi';
import { pingPongContractAddress } from '@/constants';
import { supersimL2A, supersimL2B } from '@eth-optimism/viem/chains';
import { privateKeyToAccount } from 'viem/accounts';
import { sortBy } from '@/lib/utils';
import { hexToBigInt } from 'viem';

function App() {
  const logs = usePingPongLogs();

  const { writeContract: hitBallOnL2A, data, error } = useWriteContract();

  const { writeContract: hitBallOnL2B } = useWriteContract();

  console.log(error);

  return (
    <div className="flex">
      <Button
        onClick={() => {
          hitBallOnL2A({
            address: pingPongContractAddress,
            abi: pingPongAbi,
            functionName: 'hitBallTo',
            args: [BigInt(supersimL2B.id)],
            account: privateKeyToAccount(
              '0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a'
            ),
            chainId: supersimL2A.id,
          });
        }}
      >
        Hit ball on L2A
      </Button>
      <Button
        onClick={() => {
          hitBallOnL2B({
            address: pingPongContractAddress,
            abi: pingPongAbi,
            functionName: 'hitBallTo',
            args: [BigInt(supersimL2A.id)],
            account: privateKeyToAccount(
              '0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a'
            ),
            chainId: supersimL2B.id,
          });
        }}
      >
        Hit ball on L2B
      </Button>
      <Logs />
    </div>
  );
}

const Logs = () => {
  const logs = usePingPongLogs();

  console.log(logs);

  const sortedLogs = useMemo(() => {
    return sortBy(
      logs,
      log => hexToBigInt(log.blockTimestamp!),
      log => log.chainId,
      log => log.logIndex
    );
  }, [logs]);

  return (
    <div>
      {sortedLogs.map(log => (
        <div key={`${log.transactionHash}-${log.logIndex}`} className="flex">
          <div>{log.chainId}</div>
          <div>{log.eventName}</div>
          <div>{log.args.ball?.rallyCount.toString()}</div>
        </div>
      ))}
    </div>
  );
};
export default App;
