import { ADD_PEER, REMOVE_PEER } from "../Actions/peerAction"

export const peerReducer = (state, action) => {
	switch (action.type) {
		case ADD_PEER:
			return {
				...state,
				[action.payload.peerId]: {
					stream: action.payload.stream
				}
			}
		case REMOVE_PEER:
			// removing a peer
			// TODO: you can try to write ogic to remove a peer
			return { ...state }
		default:
			return { ...state }
	}
}
