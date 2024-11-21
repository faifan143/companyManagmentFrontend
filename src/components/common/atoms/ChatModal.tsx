import React, { useState, useRef, useEffect } from "react";
import Modal from "react-modal";
import { PaperClipIcon } from "@/assets";
import { PaperPlaneIcon } from "@/assets";
import { socket } from "@/socket"; // Import your socket instance
import { useRedux } from "@/hooks/useRedux";
import axios from "axios";
import Cookies from "js-cookie";
import { useFileUpload } from "@/hooks/useFileUpload";
import { ChatMessage, ChatModalProps } from "@/types/Chat.type";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import useLanguage from "@/hooks/useLanguage";
import useCustomTheme from "@/hooks/useCustomTheme";
const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { t } = useTranslation();
  const { isLightMode } = useCustomTheme();
  const {
    selectedFiles,
    handleFileChange: handleImageChange,
    uploadFiles,
  } = useFileUpload(`http://${process.env.BASE_URL}/upload`);
  const { selector } = useRedux((state) => state.user);

  const { getDir } = useLanguage();
  useEffect(() => {
    const handleReceiveCommunication = (newMessage: ChatMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    socket.on("receiveCommunication", handleReceiveCommunication);

    if (isOpen) {
      fetchInitialMessages();
    }

    return () => {
      socket.off("receiveCommunication", handleReceiveCommunication);
    };
  }, [isOpen]);

  const fetchInitialMessages = async () => {
    try {
      const response = await axios.get(
        `http://${process.env.BASE_URL}/internal-communications/chats`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        }
      );

      console.log(response);

      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching initial messages:", error);
    }
  };

  const handleSendMessage = async () => {
    if (newComment.trim() || selectedFiles.length > 0) {
      let fileURLs = [];

      if (selectedFiles.length > 0) {
        fileURLs = await uploadFiles();
      }

      const newMessage: ChatMessage = {
        emp: "ME",
        sender_Id: selector.userInfo!.id,
        department: selector.userInfo!.department.name,
        message: newComment,
        date: new Date(),
        files: fileURLs,
      };

      socket.emit("send-message", newMessage);

      setNewComment("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else {
      alert("Please write a comment or attach a file before sending.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      className="fixed right-0 top-0 flex items-center justify-center w-[450px] p-4 h-full border-none outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-20"
    >
      {selector.userInfo && selector.userInfo.department && (
        <div className="bg-droppable-fade p-6 rounded-lg shadow-lg w-full relative h-full ">
          <h2 className="text-xl text-twhite  font-bold mb-4" dir={getDir()}>
            {t("chat")} {selector.userInfo?.department.name}
          </h2>
          <div
            className="overflow-y-auto pb-10"
            style={{
              maxHeight: "90%",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {messages.map((message, index) => (
              <div key={index} className="flex mb-4">
                <div className="flex-shrink-0 w-10 h-10 bg-yellow-500 text-twhite rounded-full flex items-center justify-center mr-4">
                  {message.emp.charAt(0)}
                </div>
                <div>
                  <p className="text-tdark font-semibold">{message.emp}</p>
                  <p className="text-xs mb-1 text-tmid">
                    {new Date(message.date).toLocaleTimeString()}
                  </p>
                  <p className="text-sm bg-gray-100 p-2 rounded-md shadow-md">
                    {message.message}
                  </p>
                  {message.files && message.files.length > 0 && (
                    <div className="mt-2">
                      {message.files.map((file, idx) => (
                        <div
                          key={idx}
                          className="bg-gray-200 text-tblack p-1 px-2 rounded-md inline-block mr-2 my-1"
                        >
                          {file}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div
            className="bg-dark  flex items-center my-4 space-x-3 absolute bottom-0 w-[90%] p-2 border-none outline-none text-twhite rounded-md resize-none focus:outline-none"
            dir={getDir()}
          >
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={t("Write a comment...")}
              className="w-[100%] resize-none focus:outline-none bg-transparent"
            />

            <label
              htmlFor="file-upload"
              className={` ${
                isLightMode ? "bg-darkest" : " bg-main"
              } p-2 rounded-md cursor-pointer`}
            >
              {/* <FaPaperclip className="text-tmid hover:text-tblack" /> */}
              <Image
                src={PaperClipIcon}
                alt="paperclip icon"
                width={16}
                height={16}
              />
            </label>
            <input
              id="file-upload"
              ref={fileInputRef}
              type="file"
              onChange={(e) =>
                handleImageChange(
                  selectedFiles.length,
                  e.target.files ? e.target.files[0] : null
                )
              }
              className="hidden"
            />

            <button
              onClick={handleSendMessage}
              className={` ${
                isLightMode ? "bg-darkest" : " bg-main"
              } p-2 rounded-md text-twhite`}
            >
              {/* <FaPaperPlane /> */}
              <Image
                src={PaperPlaneIcon}
                alt="paper plane icon"
                width={16}
                height={16}
              />
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ChatModal;
