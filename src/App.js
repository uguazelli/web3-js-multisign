import "./App.css";
import { useState } from "react";
import { Web3 } from "web3";

import { ABI, MY_WALLET, PARTICIPANTS, CONTRACT_ADDRESS } from "./constants";

function App() {
	const [web3, setWeb3] = useState(null);
	const [connectedAccount, setConnectedAccount] = useState(null);
	const [balance, setBalance] = useState(null);
	const [contractResult, setContractResult] = useState(null);
	const [contractId, setContractId] = useState(null);
	const [details, setDetails] = useState(null);

	const connectMetamask = async () => {
		if (window.ethereum) {
			// instantiate Web3 with the injected provider
			const _web3 = new Web3(window.ethereum);
			setWeb3(_web3);
			//request user to connect accounts (Metamask will prompt)
			await window.ethereum.request({ method: "eth_requestAccounts" });
			//get the connected accounts
			const accounts = await _web3.eth.getAccounts();
			//show the first connected account in the react page
			setConnectedAccount(accounts[0]);
		} else {
			alert("Please install Metamask");
		}
	};

	const getBalance = async () => {
		const _balance = await web3.eth.getBalance(connectedAccount);
		setBalance(String(_balance));
	};

	const doTheContract = async () => {
		const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS, {
			defaultGasPrice: "20000000000", // default gas price in wei, 20 gwei in this case
			defaultGas: 5000000, // provide the gas limit for transactions
			//...other optional properties
		});

		// Get the current value of my number
		// const _createContract = await contract.methods.myNumber().call();
		// console.log('my number value: ' + myNumber);

		// Increment my number

		const _createContract = await contract.methods.createContract(PARTICIPANTS, "ABC TEST").send({
			from: MY_WALLET,
			gas: 1000000,
			gasPrice: "10000000000",
		});
		console.log("Transaction Hash: " + _createContract);
		setContractResult(_createContract);
	};

	const getContractIdByAddress = async () => {
		const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS, {
			defaultGasPrice: "20000000000", // default gas price in wei, 20 gwei in this case
			defaultGas: 5000000, // provide the gas limit for transactions
			//...other optional properties
		});
		const _contractId = await contract.methods.getIds(connectedAccount).call();
		console.log(_contractId);
		setContractId(_contractId);
	};

	const getDetailsById = async () => {
		const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS, {
			defaultGasPrice: "20000000000", // default gas price in wei, 20 gwei in this case
			defaultGas: 5000000, // provide the gas limit for transactions
			//...other optional properties
		});
		const _details = await contract.methods
			.getDetails("0xd2725b5b73f9927229fd5e231b8adaf2e21bd55d613df3727f90aa9b4bea780d")
			.call();
		console.log(_details);
		setDetails(_details);
	};

	return (
		<div className="main">
			<button onClick={connectMetamask}>Connect to Metamask</button>
			<h2>{connectedAccount}</h2>

			<button onClick={getBalance}>Get Balance</button>
			<h2>{balance}</h2>

			<button onClick={doTheContract}>Create Contratct</button>
			<h2>{contractResult}</h2>

			<button onClick={getContractIdByAddress}>Get Contract ID</button>
			<h2>{contractId}</h2>

			<button onClick={getDetailsById}>Get Contract ID</button>
			<h2>See details in the console</h2>
		</div>
	);
}

export default App;
