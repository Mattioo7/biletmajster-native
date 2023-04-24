import { atom } from 'recoil';

export type QRData = {
	coreData: string,
	title: string | undefined,
	description: string | undefined
}

const qrDataState = atom<QRData>({
	key: 'qrDataState',
	default: {
		coreData: "Empty code",
		title: "Empty code",
		description: "This code is empty."
	}
});

export default qrDataState;
