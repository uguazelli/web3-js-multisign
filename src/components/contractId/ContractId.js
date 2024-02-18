import React from "react";
import { UseStore } from "../../UseStore";
import Button from "@mui/material/Button";

const ContractId = () => {
	const connectedAccount = UseStore(state => state.connectedAccount);
	const setContractId = UseStore(state => state.setContractId);
	const contract = UseStore(state => state.contract);
	const contractId = UseStore(state => state.contractId);

	const getContractIdByAddress = async () => {
		const _contractId = await contract.methods.getIds(connectedAccount).call();
		setContractId(_contractId[0]);
	};

	return (
		<div>
			<Button className="customButton" onClick={getContractIdByAddress}>
				Get Contract ID
			</Button>
			<h3>{contractId}</h3>
		</div>
	);
};

export default ContractId;
