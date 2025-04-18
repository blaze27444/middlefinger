import { useMemo, useState } from 'react';
import viteLogo from '/vite.svg';
import { Button } from '@/components/ui/button';
import { pingPongAbi } from '@/abi/pingPongAbi';
import { useReadContract } from 'wagmi';
import { pingPongContractAddress } from '@/constants';
import { PingPongLogWithChainId, usePingPongLogs } from '@/indexer/usePingPongLogs';

function App() {
  const [count, setCount] = useState(0);

  const logs = usePingPongLogs();

  const { data: ball } = useReadContract({
    address: pingPongContractAddress,
    abi: pingPongAbi,
    functionName: 'ball',
  });

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <Button onClick={() => setCount(count => count + 1)}>count is {count}</Button>
      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

const SentLog = ({ log }: { log: Extract<PingPongLogWithChainId, { eventName: 'BallSent' }> }) => {
  return <div>{log.chainId}</div>;
};

const ReceivedLog = ({
  log,
}: {
  log: Extract<PingPongLogWithChainId, { eventName: 'BallReceived' }>;
}) => {
  return <div>{log.chainId}</div>;
};

const Logs = () => {
  const logs = usePingPongLogs();

  return (
    <div>
      {logs.map(log => (
        <div key={log.chainId}>{log.eventName}</div>
      ))}
    </div>
  );
};
export default App;
