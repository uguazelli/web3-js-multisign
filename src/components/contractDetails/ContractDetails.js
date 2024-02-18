import React from "react";
import { UseStore } from "../../UseStore";
import Button from "@mui/material/Button";

const ContractDetails = () => {
	const contract = UseStore(state => state.contract);
	const contractId = UseStore(state => state.contractId);
	const setDetails = UseStore(state => state.setDetails);
	const details = UseStore(state => state.details);

	const getDetailsById = async () => {
		const _details = await contract.methods.getDetails(contractId).call();
		setDetails(_details);
		console.log(_details);
	};

	return (
		<div>
			<Button className="customButton" onClick={getDetailsById}>
				Get Contract Details
			</Button>
			<h3>{details && "See details in the console"}</h3>
		</div>
	);
};

export default ContractDetails;
