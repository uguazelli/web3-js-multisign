import "./App.css";

import { useState, createContext } from "react";
import { Web3 } from "web3";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";

import { ABI, MY_WALLET, PARTICIPANTS, CONTRACT_ADDRESS, METHODS_OPTIONS } from "./constants";
import Contract from "./contract/Contract";

const Web3Context = createContext(null);
const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

function App() {
	const [web3, setWeb3] = useState({ accounts: [], contractAddress: CONTRACT_ADDRESS });
	const connectMetamask = async () => {
		if (window.ethereum) {
			// instantiate Web3 with the injected provider
			const _web3 = new Web3(window.ethereum);
			//request user to connect accounts (Metamask will prompt)
			await window.ethereum.request({ method: "eth_requestAccounts" });
			//get the connected accounts, set the first connected account in the react page
			const _accounts = await _web3.eth.getAccounts();
			const _contract = new _web3.eth.Contract(ABI, web3.contractAddress, METHODS_OPTIONS);
			setWeb3({
				...web3,
				web3: _web3,
				contract: _contract,
				accounts: _accounts,
				connectedAccount: _accounts[0],
			});
		} else {
			alert("Please install Metamask");
		}
	};

	const getBalance = async () => {
		const _balance = await web3.web3.eth.getBalance(web3.connectedAccount);
		setWeb3({ ...web3, balance: String(_balance) });
	};

	const doTheContract = async () => {
		setWeb3({ ...web3, contractResult: "Creating contract ..." });
		const contract = web3.contract;
		const _createContract = await contract.methods.createContract(PARTICIPANTS, "ABC TEST").send({
			from: MY_WALLET,
			gas: 1000000,
			gasPrice: "10000000000",
		});
		console.log(_createContract);
		setWeb3({ ...web3, contractResult: "Contract created." });
	};

	const getContractIdByAddress = async () => {
		const contract = web3.contract;
		const _contractId = await contract.methods.getIds(web3.connectedAccount).call();
		setWeb3({ ...web3, contractId: _contractId[0] });
	};

	const getDetailsById = async () => {
		const contract = web3.contract;
		const _details = await contract.methods
			.getDetails("0xd2725b5b73f9927229fd5e231b8adaf2e21bd55d613df3727f90aa9b4bea780d")
			.call();
		console.log(_details);

		setWeb3({ ...web3, details: _details });
	};

	const styles = {
		button: {
			backgroundColor: "#9c27b0",
			color: "white",
			minWidth: "250px",
			maxWidth: "350px",
		},
	};

	return (
		<Web3Context.Provider value={null}>
			<ThemeProvider theme={darkTheme}>
				<CssBaseline />
				<Container maxWidth="md" variant="body1" align="center">
					<h1 variant="h1">Luatron Multisign</h1>
					{web3.accounts.length == 0 ? (
						<Button style={styles.button} onClick={connectMetamask}>
							Connect to Metamask
						</Button>
					) : (
						<Contract
							connectMetamask={connectMetamask}
							connectedAccount={web3.connectedAccount}
							getBalance={getBalance}
							balance={web3.balance}
							doTheContract={doTheContract}
							contractResult={web3.contractResult}
							getContractIdByAddress={getContractIdByAddress}
							contractId={web3.contractId}
							getDetailsById={getDetailsById}
							details={web3.details}
						/>
					)}
				</Container>
			</ThemeProvider>
		</Web3Context.Provider>
	);
}

export default App;
