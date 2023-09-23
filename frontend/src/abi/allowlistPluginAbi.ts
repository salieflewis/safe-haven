export const allowlistPluginAbi = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'AddressNotWhiteListed',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'address', name: 'safe', type: 'address' },
      { internalType: 'address', name: 'caller', type: 'address' },
    ],
    name: 'CallerIsNotOwner',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'AddressAllowlisted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'AddressRemovedFromAllowlist',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'metadataHash',
        type: 'bytes32',
      },
      { indexed: false, internalType: 'bytes', name: 'data', type: 'bytes' },
    ],
    name: 'Metadata',
    type: 'event',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'addToAllowlist',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'address', name: '', type: 'address' },
    ],
    name: 'allowlistedAddresses',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract ISafeProtocolManager',
        name: 'manager',
        type: 'address',
      },
      { internalType: 'contract ISafe', name: 'safe', type: 'address' },
      {
        components: [
          {
            components: [
              { internalType: 'address payable', name: 'to', type: 'address' },
              { internalType: 'uint256', name: 'value', type: 'uint256' },
              { internalType: 'bytes', name: 'data', type: 'bytes' },
            ],
            internalType: 'struct SafeProtocolAction[]',
            name: 'actions',
            type: 'tuple[]',
          },
          { internalType: 'uint256', name: 'nonce', type: 'uint256' },
          { internalType: 'bytes32', name: 'metadataHash', type: 'bytes32' },
        ],
        internalType: 'struct SafeTransaction',
        name: 'safetx',
        type: 'tuple',
      },
    ],
    name: 'executeFromPlugin',
    outputs: [{ internalType: 'bytes[]', name: 'data', type: 'bytes[]' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'metadataHash',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'metadataProvider',
    outputs: [
      { internalType: 'uint256', name: 'providerType', type: 'uint256' },
      { internalType: 'bytes', name: 'location', type: 'bytes' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'removeFromAllowlist',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'requiresRootAccess',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'version',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const
