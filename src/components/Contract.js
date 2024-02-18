import React from "react";
import { UseStore } from "../UseStore";
import Button from "@mui/material/Button";
import ContractModal from "./createContract/CreateContractModal";

const Contract = () => {
	const web3 = UseStore(state => state.web3);
	const connectedAccount = UseStore(state => state.connectedAccount);
	const balance = UseStore(state => state.balance);
	const contractId = UseStore(state => state.contractId);
	const details = UseStore(state => state.details);
	const setBalance = UseStore(state => state.setBalance);
	const setContractId = UseStore(state => state.setContractId);
	const contract = UseStore(state => state.contract);
	const setDetails = UseStore(state => state.setDetails);
	const contractLoading = UseStore(state => state.contractLoading);

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const getBalance = async () => {
		const _balance = await web3.eth.getBalance(connectedAccount);
		setBalance(String(_balance));
	};

	const getContractIdByAddress = async () => {
		const _contractId = await contract.methods.getIds(connectedAccount).call();
		setContractId(_contractId[0]);
	};

	const getDetailsById = async () => {
		const _details = await contract.methods.getDetails(contractId).call();
		setDetails(_details);
	};

	return (
		<div>
			<ContractModal open={open} handleClose={handleClose} />

			<h3>Connected Account Address</h3>
			<h3>{connectedAccount}</h3>

			<Button className="customButton" onClick={handleOpen}>
				Create Contratct
			</Button>
			<h3>{contractLoading}</h3>

			<Button className="customButton" onClick={getBalance}>
				Get Balance
			</Button>
			<h3>{balance}</h3>

			<Button className="customButton" onClick={getContractIdByAddress}>
				Get Contract ID
			</Button>
			<h3>{contractId}</h3>

			<Button className="customButton" onClick={getDetailsById}>
				Get Contract Details
			</Button>
			<h3>{details && "See details in the console"}</h3>
		</div>
	);
};

export default Contract;
