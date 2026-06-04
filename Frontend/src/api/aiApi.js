import axios from "axios";

export const askProjectAI = async (
  projectId,
  message
) => {
  return axios.post(
    `/api/ai/chat/${projectId}`,
    {
      message,
    }
  );
};