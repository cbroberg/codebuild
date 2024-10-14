/* export default interface IRoomParams {
    roomId: string;
    peerId: string;
} */

// No direct equivalent in JavaScript for interfaces, but you can use a function to create an object that adheres to the structure.
function createRoomParams(roomId, peerId) {
	return {
		roomId: roomId,
		peerId: peerId
	};
}

