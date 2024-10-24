import { useState, useRef, useCallback } from "react";
import Tesseract from "tesseract.js";
import { saveAs } from "file-saver";
import Webcam from "react-webcam";

function BusinessCardScanner() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    position: "",
    email: "",
    website: "",
  });
  const [image, setImage] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState("");
  const [useCamera, setUseCamera] = useState(false);

  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);

  // Fonction pour capturer une image depuis la webcam
  const captureImageFromCamera = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    processImage(imageSrc); // Lancer l'OCR après la capture
  }, [webcamRef]);

  // Fonction pour traiter l'image et lancer l'OCR
  const processImage = (imageSrc) => {
    setScanning(true); // Démarre le processus de scan

    // Convertir base64 en fichier Blob pour l'OCR
    fetch(imageSrc)
      .then((res) => res.blob())
      .then((blob) => {
        Tesseract.recognize(blob, "eng", {
          logger: (m) => console.log(m), // Voir la progression de l'OCR
        })
          .then(({ data: { text } }) => {
            console.log("Texte extrait:", text);
            setScanResult(text);
            const extractedData = parseText(text);
            setFormData(extractedData);
          })
          .finally(() => setScanning(false)) // Scan terminé
          .catch((err) => console.error(err));
      });
  };

  // Fonction pour traiter l'upload d'image ou un dépôt de fichier
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      processImage(reader.result); // Lancer l'OCR sur l'image uploadée
    };
    reader.readAsDataURL(file);
  };

  // Fonction pour gérer le dépôt de fichier (drag & drop)
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      processImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Extraire les informations pertinentes
  const parseText = (text) => {
    const lines = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "");
    return {
      firstName: lines[0] || "John",
      lastName: lines[1] || "Doe",
      company: lines[2] || "Example Corp",
      position: lines[3] || "Software Engineer",
      email: lines.find((line) => line.includes("@")) || "john.doe@example.com",
      website: lines.find((line) => line.includes("www")) || "www.example.com",
    };
  };

  // Fonction pour gérer la modification des champs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Fonction pour exporter les données au format CSV
  const exportToCSV = () => {
    const csvData = [
      ["First Name", "Last Name", "Company", "Position", "Email", "Website"],
      [
        formData.firstName,
        formData.lastName,
        formData.company,
        formData.position,
        formData.email,
        formData.website,
      ],
    ];
    const csvContent = csvData.map((e) => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "business-card.csv"); // Utilisation de FileSaver pour télécharger le fichier CSV
  };

  return (
    <div>
      <h1>Business Card Scanner</h1>

      {/* Zone pour déposer une image ou cliquer pour en sélectionner une */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          border: "2px dashed #ccc",
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
        }}
        onClick={() => fileInputRef.current.click()}>
        {image ? (
          <img src={image} alt="Uploaded Business Card" width="300" />
        ) : (
          <p>Drop an image here or click to select one</p>
        )}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>

      {/* Bouton pour activer la caméra */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => {
            setUseCamera(!useCamera);
          }}>
          {useCamera ? "Close Camera" : "Open Camera"}
        </button>
        {useCamera && (
          <div>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width="300"
            />
            <button onClick={captureImageFromCamera}>Capture Image</button>
          </div>
        )}
      </div>

      {/* Formulaire pour la saisie manuelle */}
      <form style={{ marginTop: "20px" }}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Company:
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Position:
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Website:
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
          />
        </label>
        <br />
      </form>

      {/* Bouton pour exporter en CSV */}
      <button onClick={exportToCSV} style={{ marginTop: "20px" }}>
        Export to CSV
      </button>

      {/* Affichage d'un message lorsque le scan est en cours */}
      {scanning && <p>Scanning in progress...</p>}

      {/* Afficher le texte brut de l'OCR pour référence */}
      {scanResult && (
        <div style={{ marginTop: "20px" }}>
          <h3>OCR Result:</h3>
          <pre>{scanResult}</pre>
        </div>
      )}
    </div>
  );
}

export default BusinessCardScanner;
