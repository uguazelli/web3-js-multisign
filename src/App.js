import "./App.css";
import { StyledEngineProvider } from "@mui/material/styles";
import { UseStore } from "./UseStore";
import { Web3 } from "web3";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { ABI, CONTRACT_ADDRESS, METHODS_OPTIONS } from "./constants";
import Contract from "./components/Contract";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

function App() {
	const setWeb3 = UseStore(state => state.setWeb3);
	const setContract = UseStore(state => state.setContract);
	const accounts = UseStore(state => state.accounts);
	const setAccounts = UseStore(state => state.setAccounts);
	const setConnectedAccount = UseStore(state => state.setConnectedAccount);

	const connectMetamask = async () => {
		if (window.ethereum) {
			// instantiate Web3 with the injected provider
			const _web3 = new Web3(window.ethereum);
			//request user to connect accounts (Metamask will prompt)
			await window.ethereum.request({ method: "eth_requestAccounts" });
			//get the connected accounts, set the first connected account in the react page
			const _accounts = await _web3.eth.getAccounts();
			const _contract = new _web3.eth.Contract(ABI, CONTRACT_ADDRESS, METHODS_OPTIONS);

			setWeb3(_web3);
			setContract(_contract);
			setAccounts(_accounts);
			setConnectedAccount(_accounts[0]);
		} else {
			alert("Please install Metamask");
		}
	};

	return (
		<StyledEngineProvider injectFirst>
			{/* It allows to override Material UI's styles. */}

			<ThemeProvider theme={darkTheme}>
				<CssBaseline />
				<Container maxWidth="md" variant="body1" align="center">
					<h1 variant="h1">Luatron Multisign</h1>
					{accounts.length === 0 ? (
						<Button className="customButton" onClick={connectMetamask}>
							Connect to Metamask
						</Button>
					) : (
						<Contract />
					)}
				</Container>
			</ThemeProvider>
		</StyledEngineProvider>
	);
}

export default App;
