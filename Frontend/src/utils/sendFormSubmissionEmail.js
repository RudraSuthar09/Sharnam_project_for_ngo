import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export const sendFormSubmissionEmail = async ({ email, formName, name = "" }) => {
  if (!email) return;

  try {
    await axios.post(`${API_BASE_URL}/api/notifications/form-submission`, {
      email,
      formName,
      name,
    });
  } catch (error) {
    console.warn("Form acknowledgement email failed:", error?.response?.data || error.message);
  }
};
