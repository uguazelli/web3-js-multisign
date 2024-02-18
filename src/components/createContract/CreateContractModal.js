import React, { useState } from "react";
import { UseStore } from "../../UseStore";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AddParticipant from "./AddParticipant";

const ContractModal = ({ open, handleClose }) => {
	const contract = UseStore(state => state.contract);
	const connectedAccount = UseStore(state => state.connectedAccount);
	const setContractLoading = UseStore(state => state.setContractLoading);

	const [participantsArray, setParticipantsArray] = useState([connectedAccount]);
	const [contractAgreement, setContractAgreement] = useState("");
	const handleContractAgreementChange = event => {
		setContractAgreement(event.target.value);
	};

	const createContract = async () => {
		console.log("Participants: " + participantsArray);
		console.log("Agreement: " + contractAgreement);
		setContractLoading("Creating contract ...");
		const _createContract = await contract.methods
			.createContract(participantsArray, contractAgreement)
			.send({
				from: connectedAccount,
				gas: 1000000,
				gasPrice: "10000000000",
			});

		setContractLoading("Creating created.");
		console.log(_createContract);
	};

	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 600,
		bgcolor: "background.paper",
		border: "2px solid #000",
		boxShadow: 24,
		p: 4,
	};

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="parent-modal-title"
			aria-describedby="parent-modal-description"
		>
			<Box sx={style}>
				<h2 id="parent-modal-title">Create a contract</h2>
				<AddParticipant
					participantsArray={participantsArray}
					setParticipantsArray={setParticipantsArray}
				/>

				<TextField
					id="standard-multiline-static"
					label="Contract Agreement"
					multiline
					fullWidth
					rows={4}
					color="secondary"
					focused
					value={contractAgreement}
					onChange={handleContractAgreementChange}
					style={{ marginBottom: "40px" }}
				/>
				<Button className="customButton" onClick={createContract}>
					Create Contratct
				</Button>
			</Box>
		</Modal>
	);
};

export default ContractModal;
