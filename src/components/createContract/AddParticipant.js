import React, { useState } from "react";
import { UseStore } from "../../UseStore";
import TextField from "@mui/material/TextField";
import ClearIcon from "@mui/icons-material/Clear";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const AddParticipant = ({ participantsArray, setParticipantsArray }) => {
	const [participant, setParticipant] = useState("");
	const [isValidEthereumAddress, setValidEthereumAddress] = useState(false);

	const handleParticipantsChange = event => {
		setParticipant(event.target.value);
		handleAddressForm(event.target.value);
	};

	const addParticipants = () => {
		setParticipantsArray([...participantsArray, participant]);
	};
	const removeParticipants = itemToRemove => {
		const filteredArray = participantsArray.filter(item => item !== itemToRemove);
		setParticipantsArray(filteredArray);
	};

	function handleAddressForm(address) {
		const regex = /^0x[a-fA-F0-9]{40}$/;
		const isValid = regex.test(address);
		setValidEthereumAddress(isValid);
		console.log(isValidEthereumAddress);
	}

	return (
		<div>
			{participantsArray.map((item, index) => (
				<div key={item} className="createContractAddress">
					<TextField
						id="standard-basic"
						label={index === 0 ? "My wallet address" : `Participant ${index} wallet`}
						variant="standard"
						defaultValue={item}
						disabled
						style={{ flex: 6 }}
					/>
					{index > 0 && (
						<ClearIcon onClick={() => removeParticipants(item)} style={{ flex: 1, color: "red" }} />
					)}
				</div>
			))}

			<div className="createContractAddress" style={{ marginTop: "40px", marginBottom: "40px" }}>
				<TextField
					id="standard-static"
					label="Partner Address"
					color={isValidEthereumAddress ? "success" : "secondary"}
					error={!isValidEthereumAddress}
					focused
					style={{ flex: 6 }}
					value={participant}
					onChange={handleParticipantsChange}
				/>
				<AddCircleIcon onClick={addParticipants} style={{ flex: 1 }} />
			</div>
		</div>
	);
};

export default AddParticipant;
