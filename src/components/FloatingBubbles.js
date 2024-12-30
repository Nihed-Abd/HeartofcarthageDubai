import React, { useState } from "react";
import { FaWhatsapp, FaEnvelope, FaLanguage, FaTimes } from "react-icons/fa";
import { db } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Swal from "sweetalert2";

const FloatingBubbles = () => {
  const [activeDialog, setActiveDialog] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleDialog = (type) => {
    setActiveDialog(activeDialog === type ? null : type);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await addDoc(collection(db, "emails"), {
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        timestamp: serverTimestamp(),
      });

      Swal.fire({
        icon: "success",
        title: "Email Sent!",
        text: "Your email has been sent successfully.",
        confirmButtonText: "OK",
      });

      setFormData({ email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error:", error);

      Swal.fire({
        icon: "error",
        title: "Failed to Send Email",
        text: "There was an issue sending your email. Please try again.",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Floating Bubbles */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          right: "0",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 1000,
        }}
      >
        {/* Language Bubble */}
        <button
          style={{
            backgroundColor: "#133236",
            color: "white",
            border: "none",
            height: "60px",
            width: "60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "10px",
            cursor: "pointer",
          }}
          onClick={() => handleToggleDialog("translate")}
          title="Select Language"
        >
          <FaLanguage size={24} />
        </button>

        {/* WhatsApp Bubble */}
        <button
          style={{
            backgroundColor: "#84a2a6",
            color: "white",
            border: "none",
            height: "60px",
            width: "60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "10px",
            cursor: "pointer",
          }}
          onClick={() => window.open("https://wa.me/+971555892201", "_blank")}
          title="Chat on WhatsApp"
        >
          <FaWhatsapp size={24} />
        </button>

        {/* Email Bubble */}
        <button
          style={{
            backgroundColor: "#133236",
            color: "white",
            border: "none",
            height: "60px",
            width: "60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => handleToggleDialog("email")}
          title="Send Email"
        >
          <FaEnvelope size={24} />
        </button>
      </div>

      {/* Dialogs */}
      {activeDialog === "email" && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            padding: "20px",
            width: "90%",
            maxWidth: "400px",
            zIndex: 1001,
          }}
        >
          <FaTimes
            onClick={() => setActiveDialog(null)}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              cursor: "pointer",
              fontSize: "16px",
              color: "#333",
            }}
          />
          <h4 style={{ marginBottom: "15px", textAlign: "center" }}>Send Email</h4>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              style={{
                width: "100%",
                marginBottom: "10px",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              style={{
                width: "100%",
                marginBottom: "10px",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleInputChange}
              required
              style={{
                width: "100%",
                marginBottom: "10px",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            ></textarea>
            <button
              type="submit"
              style={{
                padding: "10px",
                width: "100%",
                backgroundColor: "#fb412a",
                color: "white",
                border: "none",
                borderRadius: "5px",
              }}
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      )}

      {activeDialog === "translate" && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            padding: "20px",
            width: "90%",
            maxWidth: "300px",
            zIndex: 1001,
          }}
        >
          <FaTimes
            onClick={() => setActiveDialog(null)}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              cursor: "pointer",
              fontSize: "16px",
              color: "#333",
            }}
          />
          <h4 style={{ marginBottom: "15px", textAlign: "center" }}>Select Language</h4>
          <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
            <li
              style={{
                cursor: "pointer",
                padding: "10px",
                backgroundColor: "#84a2a6",
                color: "white",
                borderRadius: "5px",
                marginBottom: "10px",
                textAlign: "center",
              }}
              onClick={() => alert("Language selected: Arabic")}
            >
              Arabic
            </li>
            <li
              style={{
                cursor: "pointer",
                padding: "10px",
                backgroundColor: "#84a2a6",
                color: "white",
                borderRadius: "5px",
                marginBottom: "10px",
                textAlign: "center",
              }}
              onClick={() => alert("Language selected: French")}
            >
              French
            </li>
            <li
              style={{
                cursor: "pointer",
                padding: "10px",
                backgroundColor: "#84a2a6",
                color: "white",
                borderRadius: "5px",
                textAlign: "center",
              }}
              onClick={() => alert("Language selected: English")}
            >
              English
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default FloatingBubbles;
