export const pingPongAbi = [
  {
    type: 'constructor',
    inputs: [{ name: '_serverChainId', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'ball',
    inputs: [],
    outputs: [
      { name: 'rallyCount', type: 'uint256', internalType: 'uint256' },
      { name: 'lastHitterChainId', type: 'uint256', internalType: 'uint256' },
      { name: 'lastHitterAddress', type: 'address', internalType: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'hitBallTo',
    inputs: [{ name: '_toChainId', type: 'uint256', internalType: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'receiveBall',
    inputs: [
      {
        name: '_ball',
        type: 'tuple',
        internalType: 'struct PingPongBall',
        components: [
          { name: 'rallyCount', type: 'uint256', internalType: 'uint256' },
          { name: 'lastHitterChainId', type: 'uint256', internalType: 'uint256' },
          { name: 'lastHitterAddress', type: 'address', internalType: 'address' },
        ],
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    name: 'BallReceived',
    inputs: [
      { name: 'fromChainId', type: 'uint256', indexed: true, internalType: 'uint256' },
      { name: 'toChainId', type: 'uint256', indexed: true, internalType: 'uint256' },
      {
        name: 'ball',
        type: 'tuple',
        indexed: false,
        internalType: 'struct PingPongBall',
        components: [
          { name: 'rallyCount', type: 'uint256', internalType: 'uint256' },
          { name: 'lastHitterChainId', type: 'uint256', internalType: 'uint256' },
          { name: 'lastHitterAddress', type: 'address', internalType: 'address' },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'BallSent',
    inputs: [
      { name: 'fromChainId', type: 'uint256', indexed: true, internalType: 'uint256' },
      { name: 'toChainId', type: 'uint256', indexed: true, internalType: 'uint256' },
      {
        name: 'ball',
        type: 'tuple',
        indexed: false,
        internalType: 'struct PingPongBall',
        components: [
          { name: 'rallyCount', type: 'uint256', internalType: 'uint256' },
          { name: 'lastHitterChainId', type: 'uint256', internalType: 'uint256' },
          { name: 'lastHitterAddress', type: 'address', internalType: 'address' },
        ],
      },
    ],
    anonymous: false,
  },
  { type: 'error', name: 'BallNotPresent', inputs: [] },
  { type: 'error', name: 'CallerNotL2ToL2CrossDomainMessenger', inputs: [] },
  { type: 'error', name: 'InvalidCrossDomainSender', inputs: [] },
  { type: 'error', name: 'InvalidDestination', inputs: [] },
] as const;
