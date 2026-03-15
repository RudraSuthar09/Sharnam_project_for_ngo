export const sendFormSubmissionEmail = async (req, res) => {
  const { email, formName = "Form", name = "" } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.EMAIL_FROM || "no-reply@sharanam.org";

  if (!resendApiKey) {
    return res.status(503).json({
      success: false,
      message: "Email service is not configured",
    });
  }

  const safeName = name || "there";

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [email],
        subject: `${formName} submitted successfully`,
        text: `Hi ${safeName},\n\nYour ${formName} has been submitted successfully. We will contact you soon.\n\n- Sharanam Team`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #1f2937;">
            <p>Hi <strong>${safeName}</strong>,</p>
            <p>Your <strong>${formName}</strong> has been submitted successfully.</p>
            <p>We will contact you soon.</p>
            <p style="margin-top: 18px;">- Sharanam Team</p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      return res.status(500).json({
        success: false,
        message: "Failed to send acknowledgement email",
        error: errorBody,
      });
    }

    return res.json({ success: true, message: "Acknowledgement email sent" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to send acknowledgement email",
      error: error.message,
    });
  }
};
