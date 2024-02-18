export const CONTRACT_ADDRESS = "0x155a7a71349cc18bb17edf180044d89794faf39f";

export const METHODS_OPTIONS = {
	defaultGasPrice: "20000000000", // default gas price in wei, 20 gwei in this case
	defaultGas: 5000000, // provide the gas limit for transactions
	//...other optional properties
};

export const ABI = [
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "id",
				type: "bytes32",
			},
			{
				indexed: false,
				internalType: "address[]",
				name: "confirmations",
				type: "address[]",
			},
		],
		name: "AgreementConfirmed",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "id",
				type: "bytes32",
			},
			{
				indexed: false,
				internalType: "address[]",
				name: "participants",
				type: "address[]",
			},
			{
				indexed: false,
				internalType: "string",
				name: "agreement",
				type: "string",
			},
		],
		name: "AgreementCreated",
		type: "event",
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "_id",
				type: "bytes32",
			},
		],
		name: "confirmContract",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address[]",
				name: "_participants",
				type: "address[]",
			},
			{
				internalType: "string",
				name: "_agreement",
				type: "string",
			},
		],
		name: "createContract",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "_id",
				type: "bytes32",
			},
		],
		name: "getDetails",
		outputs: [
			{
				components: [
					{
						internalType: "address[]",
						name: "participants",
						type: "address[]",
					},
					{
						internalType: "address[]",
						name: "confirmed",
						type: "address[]",
					},
					{
						internalType: "uint8",
						name: "contractStatus",
						type: "uint8",
					},
					{
						internalType: "uint256",
						name: "date",
						type: "uint256",
					},
					{
						internalType: "string",
						name: "agreement",
						type: "string",
					},
				],
				internalType: "struct Multisig.Details",
				name: "",
				type: "tuple",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_address",
				type: "address",
			},
		],
		name: "getIds",
		outputs: [
			{
				internalType: "bytes32[]",
				name: "",
				type: "bytes32[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
];
