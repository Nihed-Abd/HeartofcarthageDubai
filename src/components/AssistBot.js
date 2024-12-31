import React, { useState, useRef, useEffect } from "react";
import { FaRobot, FaTimes, FaRedo, FaUser, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
const logo = process.env.PUBLIC_URL + '/assets/img/logo.png';

const AssistBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState(null);
  const [conversation, setConversation] = useState([
    {
      sender: "bot",
      text: "Hello! Welcome to Heart of Carthage Dubai. Please select your language to proceed.",
    },
  ]);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [isLocked, setIsLocked] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    type: "",
    bedrooms: "",
    address: "",
    budget: "Any",
  });
  const [isFetching, setIsFetching] = useState(false);
  const [properties, setProperties] = useState([]);
  const chatRef = useRef(null);

  // Utility Arrays
  const addresses = [
    "Any",
    "Downtown Dubai",
    "Dubai Marina",
    "Palm Jumeirah",
    "Jumeirah Beach Residence (JBR)",
    "Business Bay",
  ];

  const priceRanges = [
    { label: "Any", value: "Any" },
    { label: "0 to 1M", value: ["0", "1000000"] },
    { label: "1M to 3M", value: ["1000000", "3000000"] },
    { label: "3M to 5M", value: ["3000000", "5000000"] },
  ];

  // Language-specific responses
  const responses = {
    English: {
      welcome: "Hello! Welcome to Heart of Carthage Dubai. Please select your language to proceed.",
      completeInfo: "Please complete your information to start the conversation.",
      thankYou: "Thank you! Let's get started. What are you looking for? Villa, Apartment, House, Townhouse, or Any?",
      bedrooms: "How many bedrooms do you prefer? 1, 2, 3, or 4+?",
      location: "Do you have a preferred location? Select or choose Any.",
      budget: "What is your budget range?",
      fetching: "Fetching properties that match your preferences...",
      noProperties: "No matching properties found. Please adjust your filters or contact our agent.",
      propertiesFound: "Here are some properties that match your preferences:",
      contactAgent: "Contact our agent",
      options: {
        type: ["Any", "Villa", "Apartment", "House", "Townhouse"],
        bedrooms: ["Any", "1", "2", "3", "4+"],
        address: addresses,
        budget: priceRanges.map(range => range.label),
      },
    },
    Arabic: {
      welcome: "مرحبًا! مرحبًا بكم في قلب قرطاج دبي. يرجى اختيار لغتك للمتابعة.",
      completeInfo: "يرجى إكمال معلوماتك لبدء المحادثة.",
      thankYou: "شكرًا لك! لنبدأ. ماذا تبحث عن؟ فيلا، شقة، منزل، تاون هاوس، أو أي شيء؟",
      bedrooms: "كم عدد غرف النوم التي تفضلها؟ 1، 2، 3، أو 4+؟",
      location: "هل لديك موقع مفضل؟ اختر أو اختر أي شيء.",
      budget: "ما هو نطاق ميزانيتك؟",
      fetching: "جارٍ جلب العقارات التي تتطابق مع تفضيلاتك...",
      noProperties: "لم يتم العثور على عقارات مطابقة. يرجى تعديل الفلاتر الخاصة بك أو الاتصال بوكيلنا.",
      propertiesFound: "إليك بعض العقارات التي تتطابق مع تفضيلاتك:",
      contactAgent: "اتصل بوكيلنا",
      options: {
        type: ["أي", "فيلا", "شقة", "منزل", "تاون هاوس"],
        bedrooms: ["أي", "1", "2", "3", "4+"],
        address: addresses,
        budget: priceRanges.map(range => range.label),
      },
    },
    French: {
      welcome: "Bonjour! Bienvenue à Heart of Carthage Dubai. Veuillez sélectionner votre langue pour continuer.",
      completeInfo: "Veuillez compléter vos informations pour commencer la conversation.",
      thankYou: "Merci! Commençons. Que cherchez-vous? Villa, Appartement, Maison, Townhouse, ou N'importe quoi?",
      bedrooms: "Combien de chambres préférez-vous? 1, 2, 3, ou 4+?",
      location: "Avez-vous un emplacement préféré? Sélectionnez ou choisissez N'importe quoi.",
      budget: "Quelle est votre gamme de budget?",
      fetching: "Recherche des propriétés correspondant à vos préférences...",
      noProperties: "Aucune propriété correspondante trouvée. Veuillez ajuster vos filtres ou contacter notre agent.",
      propertiesFound: "Voici quelques propriétés qui correspondent à vos préférences:",
      contactAgent: "Contactez notre agent",
      options: {
        type: ["N'importe quoi", "Villa", "Appartement", "Maison", "Townhouse"],
        bedrooms: ["N'importe quoi", "1", "2", "3", "4+"],
        address: addresses,
        budget: priceRanges.map(range => range.label),
      },
    },
  };

  // Toggle Bot Window
  const toggleBot = () => setIsOpen(!isOpen);

  // Reset Conversation
  const resetConversation = () => {
    setLanguage(null);
    setFormData({ name: "", email: "", phone: "" });
    setIsLocked(true);
    setCurrentQuestion(null);
    setSelectedFilters({ type: "", bedrooms: "", address: "", budget: "Any" });
    setConversation([
      {
        sender: "bot",
        text: responses[language]?.welcome || responses.English.welcome,
      },
    ]);
    setProperties([]);
  };

  // Scroll to Latest Message
  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [conversation]);

  // Handle Language Selection
  const handleLanguageSelection = (lang) => {
    setLanguage(lang);
    setConversation((prev) => [
      ...prev,
      { sender: "user", text: lang },
      {
        sender: "bot",
        text: responses[lang].completeInfo,
      },
    ]);
  };

  // Handle Input Change for Form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit Form Data
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "leads"), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      setConversation((prev) => [
        ...prev,
        {
          sender: "bot",
          text: responses[language].thankYou,
        },
      ]);
      setIsLocked(false);
      setCurrentQuestion("type");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Handle Option Selection
  const handleOptionSelection = (key, value) => {
    setSelectedFilters((prev) => ({ ...prev, [key]: value }));
    const nextQuestion = {
      type: responses[language].bedrooms,
      bedrooms: responses[language].location,
      address: responses[language].budget,
      budget: responses[language].fetching,
    };

    setConversation((prev) => [
      ...prev,
      { sender: "user", text: value },
      { sender: "bot", text: nextQuestion[key] },
    ]);

    if (key === "budget") {
      fetchProperties();
      setCurrentQuestion(null); // Reset current question after fetching properties
    } else {
      setCurrentQuestion(
        key === "type" ? "bedrooms" : key === "bedrooms" ? "address" : "budget"
      );
    }
  };

  // Fetch Properties from Firebase
  const fetchProperties = async () => {
    setIsFetching(true);
    const { type, bedrooms, address, budget } = selectedFilters;

    try {
      const propertiesRef = collection(db, "properties");
      let q = query(propertiesRef);

      if (type && type !== "Any") q = query(q, where("type", "==", type));
      if (bedrooms && bedrooms !== "Any") q = query(q, where("nbrBedRooms", "in", bedrooms.split(",")));
      if (address && address !== "Any") q = query(q, where("address", "==", address));

      if (budget !== "Any") {
        const [min, max] = budget;
        q = query(q, where("price", ">=", min), where("price", "<=", max));
      }

      const querySnapshot = await getDocs(q);
      const fetchedProperties = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        images: doc.data().images?.slice(0, 3) || [],
        price: parseInt(doc.data().price, 10),
      }));

      if (fetchedProperties.length > 0) {
        setProperties(fetchedProperties);
        setConversation((prev) => [
          ...prev,
          { sender: "bot", text: responses[language].propertiesFound },
        ]);
      } else {
        setConversation((prev) => [
          ...prev,
          { sender: "bot", text: responses[language].noProperties },
          {
            sender: "bot",
            text: (
              <a
                href="https://wa.me/yourwhatsappnumber"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#25D366", textDecoration: "none" }}
              >
                <FaWhatsapp /> {responses[language].contactAgent}
              </a>
            ),
          },
        ]);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const renderMessage = (message, index) => (
    <div
      key={index}
      style={{
        display: "flex",
        justifyContent: message.sender === "bot" ? "flex-start" : "flex-end",
        margin: "10px 0",
      }}
    >
      <div
        style={{
          backgroundColor: message.sender === "bot" ? "#133236" : "#d3d3d3",
          color: message.sender === "bot" ? "white" : "black",
          padding: "10px",
          borderRadius: "10px",
          maxWidth: "70%",
        }}
      >
        {message.text}
      </div>
    </div>
  );

  const renderProperties = () => (
    <div>
      {properties.map((property) => (
        <Link
          key={property.id}
          to={`/property/${property.id}`}
          onClick={() => {
            setIsOpen(false);
            setTimeout(() => {
              window.location.reload();
            }, 0);
          }}
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <div
            style={{
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              marginBottom: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
            }}
          >
            <h4>{property.title}</h4>
            <div style={{ display: "flex", gap: "10px", overflowX: "scroll" }}>
              {property.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Property Image ${index + 1}`}
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "5px",
                    objectFit: "cover",
                  }}
                />
              ))}
            </div>
            <p>Price: {property.price.toLocaleString()} AED</p>
          </div>
        </Link>
      ))}
      <button
        onClick={resetConversation}
        style={{
          backgroundColor: "#133236",
          color: "white",
          padding: "10px",
          margin: "15px auto",
          borderRadius: "5px",
          cursor: "pointer",
          width: "90%",
        }}
      >
        Start Again
      </button>
    </div>
  );

  return (
    <div>
      {/* Chatbot Toggle */}
      <div style={{ position: "fixed", bottom: "125px", right: "30px", zIndex: 1000 }}>
  {/* Bot Toggle with Message */}
  <div
    style={{
      display: "flex",
      alignItems: "center",
      position: "relative",
    }}
  >
    {/* Message */}
    <div
      style={{
        backgroundColor: "#ffffff",
        color: "#133236",
        padding: "10px 15px",
        borderRadius: "20px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        fontSize: "14px",
        fontWeight: "bold",
        position: "absolute",
        right: "80px", // Adjusted position to appear behind the toggle button
        whiteSpace: "nowrap",
      }}
    >
      How can I assist you?
    </div>

    {/* Toggle Button */}
    <button
      onClick={toggleBot}
      style={{
        backgroundColor: "#133236",
        color: "white",
        border: "none",
        borderRadius: "50%",
        width: "70px",
        height: "70px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
        animation: "pulse 1.5s infinite",
      }}
    >
      <FaRobot size={28} />
    </button>
  </div>

  {/* Styles */}
  <style jsx>{`
    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
      }
    }
  `}</style>
</div>


      {/* Chat Dialog */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: "55%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            width: "500px",
            height: "600px",
            zIndex: 1001,
            display: "flex",
            flexDirection: "column",
            animation: "fadeIn 0.5s ease-in-out",
          }}
        >
          {/* Header */}
          <div
      style={{
        backgroundColor: "#133236",
        color: "white",
        padding: "15px",
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <img src={logo} alt="Heart of Carthage" style={{ height: "50px", marginRight: "10px" }} />
      <span style={{ fontWeight: "bold" }}>Heart of Carthage</span>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={resetConversation}
          style={{
            background: "none",
            border: "none",
            color: "white",
            cursor: "pointer",
            fontSize: "18px",
            padding: "5px",
          }}
        >
          <FaRedo size={24} />
        </button>
        <button
          onClick={toggleBot}
          style={{
            background: "none",
            border: "none",
            color: "white",
            cursor: "pointer",
            fontSize: "18px",
            padding: "5px",
          }}
        >
          <FaTimes size={24} />
        </button>
      </div>
    </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: "15px",
              overflowY: "auto",
              animation: "slideIn 0.5s ease-in-out",
            }}
            ref={chatRef}
          >
            {conversation.map(renderMessage)}

            {isFetching && (
              <div style={{ color: "#133236", fontStyle: "italic" }}>{responses[language].fetching}</div>
            )}

            {properties.length > 0 && renderProperties()}

            {!isLocked && currentQuestion && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                {currentQuestion === "type" &&
                  responses[language].options.type.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionSelection("type", responses.English.options.type[index])}
                      style={{
                        backgroundColor: "#d3d3d3",
                        margin: "5px",
                        padding: "10px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        width: "90%",
                        animation: "popUp 0.5s ease-in-out",
                      }}
                    >
                      {option}
                    </button>
                  ))}

                {currentQuestion === "bedrooms" &&
                  responses[language].options.bedrooms.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionSelection("bedrooms", responses.English.options.bedrooms[index])}
                      style={{
                        backgroundColor: "#d3d3d3",
                        margin: "5px",
                        padding: "10px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        width: "90%",
                        animation: "popUp 0.5s ease-in-out",
                      }}
                    >
                      {option}
                    </button>
                  ))}

                {currentQuestion === "address" &&
                  responses[language].options.address.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionSelection("address", responses.English.options.address[index])}
                      style={{
                        backgroundColor: "#d3d3d3",
                        margin: "5px",
                        padding: "10px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        width: "90%",
                        animation: "popUp 0.5s ease-in-out",
                      }}
                    >
                      {option}
                    </button>
                  ))}

                {currentQuestion === "budget" &&
                  responses[language].options.budget.map((range, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionSelection("budget", responses.English.options.budget[index])}
                      style={{
                        backgroundColor: "#d3d3d3",
                        margin: "5px",
                        padding: "10px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        width: "90%",
                        animation: "popUp 0.5s ease-in-out",
                      }}
                    >
                      {range}
                    </button>
                  ))}
              </div>
            )}

            {language === null && (
              <div style={{ display: "flex", justifyContent: "center" }}>
                {["English", "Arabic", "French"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageSelection(lang)}
                    style={{
                      backgroundColor: "#d3d3d3",
                      margin: "5px",
                      padding: "10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      width: "30%",
                      animation: "fadeIn 0.5s ease-in-out",
                    }}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}

            {language && isLocked && (
              <form onSubmit={handleFormSubmit} style={{ textAlign: "center" }}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={{
                    width: "90%",
                    margin: "10px auto",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "2px solid #133236",
                  }}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={{
                    width: "90%",
                    margin: "10px auto",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "2px solid #133236",
                  }}
                  required
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Your Phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={{
                    width: "90%",
                    margin: "10px auto",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "2px solid #133236",
                  }}
                  required
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#133236",
                    color: "white",
                    margin: "10px auto",
                    padding: "10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    width: "90%",
                    animation: "popUp 0.5s ease-in-out",
                  }}
                >
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AssistBot;
