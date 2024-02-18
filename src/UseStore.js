import { create } from "zustand";

export const UseStore = create(set => ({
	web3: null,
	contract: null,
	accounts: [],
	connectedAccount: null,
	details: null,
	balance: null,
	contractLoading: null,
	contractId: null,
	contractText: null,

	setWeb3: _web3 => set(() => ({ web3: _web3 })),
	setContract: _contract => set(() => ({ contract: _contract })),
	setAccounts: _accounts => set(() => ({ accounts: _accounts })),
	setConnectedAccount: _connectedAccount => set(() => ({ connectedAccount: _connectedAccount })),
	setDetails: _details => set(() => ({ details: _details })),
	setBalance: _balance => set(() => ({ balance: _balance })),
	setContractLoading: _contractLoading => set(() => ({ contractLoading: _contractLoading })),
	setContractId: _contractId => set(() => ({ contractId: _contractId })),
	setContractText: _contractText => set(() => ({ contractText: _contractText })),
}));
