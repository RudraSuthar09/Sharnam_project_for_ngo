import axios from "axios";
import emailjs from "@emailjs/browser";   // ✅ ADD THIS LINE

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_VOLUNTEER;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const sendFormSubmissionEmail = async (data) => {
  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        user_name: data.name,
        user_email: data.email,
        user_phone: data.phone,
        user_city: data.city,
      },
      PUBLIC_KEY
    );
  } catch (error) {
    console.log("Email error", error);
  }
};