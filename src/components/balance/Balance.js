import React from "react";
import { UseStore } from "../../UseStore";
import Button from "@mui/material/Button";

const Balance = () => {
	const web3 = UseStore(state => state.web3);
	const connectedAccount = UseStore(state => state.connectedAccount);
	const balance = UseStore(state => state.balance);
	const setBalance = UseStore(state => state.setBalance);

	const getBalance = async () => {
		const _balance = await web3.eth.getBalance(connectedAccount);
		setBalance(String(_balance));
	};

	return (
		<div>
			<Button className="customButton" onClick={getBalance}>
				Get Balance
			</Button>
			<h3>{balance}</h3>
		</div>
	);
};

export default Balance;
