import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export interface Comment {
  id: string;
  author: {
    name: string;
  };
  content: string;
  createdAt: string;
  files?: string[];
}

const useComments = (taskId: string | undefined, isOpen: boolean) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState<string>("");
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Fetch comments when the modal is open
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://${process.env.BASE_URL}/comment/${taskId}`,
          {
            headers: {
              Authorization: "Bearer " + Cookies.get("access_token"),
            },
          }
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    if (isOpen && taskId) {
      fetchComments();
    }
  }, [isOpen, taskId]);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachedFile(e.target.files[0]);
    }
  };

  // Submit a new comment
  const handleSendComment = async () => {
    if (comment.trim() || attachedFile) {
      try {
        const response = await axios.post(
          `http://${process.env.BASE_URL}/comment`,
          {
            content: comment,
            taskId,
          },
          {
            headers: {
              Authorization: "Bearer " + Cookies.get("access_token"),
            },
          }
        );

        // Update comments state with the newly added comment
        setComments((prevComments) => [...prevComments, response.data]);
        setComment(""); // Clear the comment input
        setAttachedFile(null); // Clear the attached file
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Reset file input
        }
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    } else {
      alert("Please write a comment or attach a file before sending.");
    }
  };

  return {
    comments,
    comment,
    attachedFile,
    setComment,
    handleFileChange,
    handleSendComment,
    fileInputRef,
  };
};

export default useComments;
