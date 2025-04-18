import { pingPongAbi } from '@/abi/pingPongAbi';
import { pingPongContractAddress } from '@/constants';
import { useState } from 'react';
import { useWatchContractEvent } from 'wagmi';
import { Log } from 'viem';
import { ExtractAbiEvent, ExtractAbiEvents } from 'abitype';
import { supersimL2A, supersimL2B } from '@eth-optimism/viem/chains';

type PingPongLog = Log<bigint, number, false, ExtractAbiEvents<typeof pingPongAbi>>;

type PingPongBallReceivedLog = Log<
  bigint,
  number,
  false,
  ExtractAbiEvent<typeof pingPongAbi, 'BallReceived'>
>;

export type PingPongLogWithChainId = PingPongLog & {
  chainId: number;
};

export const usePingPongLogs = () => {
  const [logs, setLogs] = useState<PingPongLogWithChainId[]>([]);

  usePingPongLogsForChain({
    chainId: supersimL2A.id,
    onLogs: logs => {
      setLogs(prev => [...prev, ...logs]);
    },
  });

  usePingPongLogsForChain({
    chainId: supersimL2B.id,
    onLogs: logs => {
      setLogs(prev => [...prev, ...logs]);
    },
  });

  return logs;
};

const usePingPongLogsForChain = ({
  chainId,
  onLogs,
}: {
  chainId: number;
  onLogs: (logs: PingPongLogWithChainId[]) => void;
}) => {
  useWatchContractEvent({
    address: pingPongContractAddress,
    abi: pingPongAbi,
    eventName: 'BallSent',
    chainId,
    onLogs: logs => {
      onLogs(logs.map(log => ({ ...log, chainId })));
    },
  });

  useWatchContractEvent({
    address: pingPongContractAddress,
    abi: pingPongAbi,
    eventName: 'BallReceived',
    chainId,
    onLogs: logs => {
      onLogs(logs.map(log => ({ ...log, chainId })));
    },
  });
};
