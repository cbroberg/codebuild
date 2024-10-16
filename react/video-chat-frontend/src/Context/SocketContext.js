import SocketIoClient from "socket.io-client"
import { createContext, useEffect, useReducer, useState } from "react"
import { useNavigate } from "react-router-dom"
import Peer from "peerjs"
import { v4 as UUIDv4 } from "uuid"
import { peerReducer } from "../Reducers/peerReducer"
import { addPeerAction } from "../Actions/peerAction"
const WS_Server = "http://192.168.39.140:5050"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SocketContext = createContext(null)

const socket = SocketIoClient(WS_Server, {
	withCredentials: false,
	transports: ["polling", "websocket"]
})

export const SocketProvider = ({ children }) => {
	const navigate = useNavigate() // will help to programatically handle navigation

	// state variable to store the userId
	const [user, setUser] = useState() // new peer user
	const [stream, setStream] = useState()

	const [peers, dispatch] = useReducer(peerReducer, {}) // peers->state

	const fetchParticipantList = ({ roomId, participants }) => {
		console.log("Fetched room participants")
		console.log(roomId, participants)
	}

	const fetchUserFeed = async () => {
		const stream = await navigator.mediaDevices.getUserMedia({
			video: true,
			audio: true
		})
		setStream(stream)
	}

	useEffect(() => {
		const userId = UUIDv4()
		const newPeer = new Peer(userId, {
			host: "localhost",
			port: 9000,
			path: "/myapp"
		})

		setUser(newPeer)

		fetchUserFeed()

		const enterRoom = ({ roomId }) => {
			navigate(`/room/${roomId}`)
		}

		// we will transfer the user to the room page when we collect an event of room-created from server
		socket.on("room-created", enterRoom)

		socket.on("get-users", fetchParticipantList)
	},) // removed dependency array }, [])

	useEffect(() => {
		if (!user || !stream) return

		socket.on("user-joined", ({ peerId }) => {
			const call = user.call(peerId, stream)
			console.log("Calling the new peer", peerId)
			call.on("stream", () => {
				dispatch(addPeerAction(peerId, stream))
			})
		})

		user.on("call", call => {
			// what to do when other peers on the group call you when u joined
			console.log("receiving a call")
			call.answer(stream)
			call.on("stream", () => {
				dispatch(addPeerAction(call.peer, stream))
			})
		})

		socket.emit("ready")
	}, [user, stream])

	return (
		<SocketContext.Provider value={{ socket, user, stream, peers }}>
			{children}
		</SocketContext.Provider>
	)
}
