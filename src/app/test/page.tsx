"use client";

import { socket } from "@/socket";
import React, { useEffect, useState, useRef } from "react";

interface SocketEvent {
  message: string;
  files?: string[];
}

const Page = () => {
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
  const [chatEvents, setChatEvents] = useState<SocketEvent[]>([]);
  const [newMessage, setNewMessage] = useState<string>(""); // State to hold the new message
  const hasInitialized = useRef(false); // To ensure initialization happens only once

  useEffect(() => {
    if (hasInitialized.current) return; // Skip if already initialized
    hasInitialized.current = true; // Mark as initialized

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onChatEvent(value: SocketEvent) {
      setChatEvents((previous) => [...previous, value]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("receiveCommunication", onChatEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("receiveCommunication", onChatEvent);
    };
  }, []);

  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }

  function sendMessage() {
    if (newMessage.trim()) {
      // Emit the message to the 'send-message' event
      socket.emit("send-message", { message: newMessage });

      // Clear the input field
      setNewMessage("");
    }
  }

  return (
    <div>
      <div>State: {" " + (isConnected ? "Connected" : "Disconnected")}</div>

      <ul>
        {chatEvents.map((event, index) => (
          <li key={index}>{event.message}</li>
        ))}
      </ul>

      <div className="flex space-x-2 mt-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="border p-2 rounded-md"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Send
        </button>
      </div>

      <button
        onClick={connect}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md"
      >
        Connect
      </button>
      <button
        onClick={disconnect}
        className="ml-2 mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
      >
        Disconnect
      </button>
    </div>
  );
};

export default Page;
