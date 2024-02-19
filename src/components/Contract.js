import React from "react";
import { UseStore } from "../UseStore";
import Button from "@mui/material/Button";
import ContractModal from "./createContract/CreateContractModal";
import Balance from "./balance/Balance";
import ContractId from "./contractId/ContractId";
import ContractDetails from "./contractDetails/ContractDetails";
import DeleteContract from "./deleteContract/DeleteContract";

const Contract = () => {
	const connectedAccount = UseStore(state => state.connectedAccount);
	const contractLoading = UseStore(state => state.contractLoading);

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<div>
			<ContractModal open={open} handleClose={handleClose} />

			<h3>Connected Account Address</h3>
			<h3>{connectedAccount}</h3>

			<Button className="customButton" onClick={handleOpen}>
				Create Contratct
			</Button>
			<h3>{contractLoading}</h3>

			<Balance />
			<ContractId />
			<DeleteContract />
			<ContractDetails />
		</div>
	);
};

export default Contract;
