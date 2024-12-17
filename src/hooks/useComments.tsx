import { apiClient } from "@/utils/axios";
import { useEffect, useRef, useState } from "react";

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
        const response = await apiClient.get<Comment[]>(`/comment/${taskId}`);
        setComments(response);
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

  const handleSendComment = async () => {
    if (comment.trim() || attachedFile) {
      try {
        const response = await apiClient.post<Comment>(`/comment`, {
          content: comment,
          taskId,
        });
        setComments((prevComments) => [...prevComments, response]);
        setComment("");
        setAttachedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
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
