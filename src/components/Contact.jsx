import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const Contact = ({ currentStep }) => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSending, setIsSending] = useState(false); // State to track if the message is being sent

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const changeStep = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSending(true); // Set sending state to true

    if (!name || !email || !subject || !message) {
      setError(t("All fields are required."));
      setIsSending(false); // Reset sending state
      return;
    }

    if (!isValidEmail(email)) {
      setError(t("Please enter a valid email address."));
      setIsSending(false); // Reset sending state
      return;
    }

    try {
      const response = await fetch("https://egan-api.vercel.app/gowt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: `${name}: ${subject}`,
          message: `From: ${email}\n\n${message}`,
        }),
      });

      if (!response.ok) {
        throw new Error(t("Failed to send message. Please try again."));
      }

      setTimeout(() => {
        window.location.href = "#form";
      }, 2);

      setSuccess(
        t(
          "Message sent successfully! We have received your email and will get back to you shortly."
        )
      );
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      setError(err.message || t("An unexpected error occurred."));
    } finally {
      setIsSending(false); // Reset sending state after API response
    }
  };

  return (
    <div className="form" id="form">
      <div className="form-container">
        <form onSubmit={changeStep}>
          <h1 className="suc-head">{t("Send us a message")}</h1>
          <br />
          {success && (
            <div className="success">
              <p className="success">{success}</p>
            </div>
          )}
          <br />
          <div className="form-group">
            <label htmlFor="name">{t("Name")}</label>
            <input
              type="text"
              className="card-field"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="email">{t("Email Address")}</label>
            <input
              type="email"
              className="card-field"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="subject">{t("Subject")}</label>
            <input
              type="text"
              className="card-field"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="message">{t("Message")}</label>
            <textarea
              className="card-field contact-field"
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button className="look" type="submit" disabled={isSending}>
            {isSending ? t("Sending...") : t("Send Message")}
          </button>
        </form>
        <br />
        <br />
        {/* Display success or error messages */}
      </div>
    </div>
  );
};

export default Contact;
