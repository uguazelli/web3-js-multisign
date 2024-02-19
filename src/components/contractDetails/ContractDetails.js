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
	};

	return (
		<div>
			<Button className="customButton" onClick={getDetailsById}>
				Get Contract Details
			</Button>
			{details && (
				<div>
					<h3>{`Adresses in this contract: ${details.participants}`}</h3>
					<h3> {`Address that already confirmed: ${details.confirmed}`} </h3>
					<h3> {`Contract Status: ${details.contractStatus}`} </h3>
					<h3> {`Contract Agreement: ${details.agreement}`} </h3>
				</div>
			)}
		</div>
	);
};

export default ContractDetails;
