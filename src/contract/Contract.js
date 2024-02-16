import React from "react";
import Button from "@mui/material/Button";

const Contract = props => {
	const styles = {
		button: {
			backgroundColor: "#9c27b0",
			color: "white",
			minWidth: "250px",
			maxWidth: "350px",
		},
	};
	return (
		<>
			<h2>Connected Account Address</h2>
			<h3>{props.connectedAccount}</h3>
			<Button style={styles.button} onClick={props.getBalance}>
				Get Balance
			</Button>
			<h2>{props.balance}</h2>
			<Button style={styles.button} onClick={props.doTheContract}>
				Create Contratct
			</Button>
			<h2>{props.contractResult}</h2>
			<Button style={styles.button} onClick={props.getContractIdByAddress}>
				Get Contract ID
			</Button>
			<h2>{props.contractId}</h2>
			<Button style={styles.button} onClick={props.getDetailsById}>
				Get Contract ID
			</Button>
			{props.details && "<h2>See details in the console</h2>"}
		</>
	);
};

export default Contract;
