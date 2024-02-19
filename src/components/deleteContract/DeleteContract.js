import React, { useState } from "react";
import { UseStore } from "../../UseStore";
import Button from "@mui/material/Button";

const DeleteContract = () => {
	const contract = UseStore(state => state.contract);
	const connectedAccount = UseStore(state => state.connectedAccount);
	const setContractId = UseStore(state => state.setContractId);
	const contractId = UseStore(state => state.contractId);
	const [loading, setLoading] = useState("");

	const deleteById = async () => {
		setLoading("Deleting...");
		console.log("contractId", contractId);

		const result = await contract.methods.deleteContract(contractId).send({
			from: connectedAccount,
			gas: 1000000,
			gasPrice: "10000000000",
		});

		console.log(result);
		setContractId(null);
		setLoading(null);
	};

	return (
		<div>
			<Button className="customButton" onClick={deleteById}>
				DeleteContract
			</Button>
			<h3>{loading && contractId != null}</h3>
		</div>
	);
};

export default DeleteContract;
