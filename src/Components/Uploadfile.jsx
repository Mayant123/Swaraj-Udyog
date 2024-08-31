import '@react-pdf-viewer/core/lib/styles/index.css';
import { PDFDocument } from 'pdf-lib';
import React, { useState } from 'react';
import stamp from "../../src/assets/stamp_sign.png";

const PdfUploader = ({ ppdfData,setPdfData,pdfUrl,setPdfUrl }) => {
  const [pdfFile, setPdfFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = async () => {
        const arrayBuffer = reader.result;
        setPdfFile(arrayBuffer);
        setPdfData(arrayBuffer);

        // Convert ArrayBuffer to Blob and then to Object URL
        const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      };
    } else {
      alert('Please upload a valid PDF file.');
    }
  };

  const handleEdit = async () => {
    if (pdfFile) {
      const pdfDoc = await PDFDocument.load(pdfFile);

      // Load the signature image
      const signatureImageBytes = await fetch(stamp).then(res => res.arrayBuffer());
      const signatureImage = await pdfDoc.embedPng(signatureImageBytes);

      // Get all pages and add the image to the bottom
      const pages = pdfDoc.getPages();
      pages.forEach(page => {
        const { width, height } = page.getSize();
        const imageWidth = 100; // Adjust width as needed
        const imageHeight = 50; // Adjust height as needed

        // Center the image horizontally
        const x = (width - imageWidth) / 2;
        const y = 30; // Adjust y as needed

        page.drawImage(signatureImage, {
          x: x,
          y: y,
          width: imageWidth,
          height: imageHeight,
        });
      });

      const pdfBytes = await pdfDoc.save();
      setPdfData(pdfBytes);

      // Update the Blob URL with the edited PDF
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    }
  };

  return (
    <div>
      <input type="file" accept="application/pdf" onChange={handleFileUpload} />
      {pdfUrl && (
        <div style={{ marginTop: '10px' }}>
          <button 
            onClick={handleEdit} 
            style={{
              backgroundColor: '#007BFF',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              padding: '10px 20px',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            Apply Signature
          </button>
      </div>
      )}
    </div>
  );
};

export default PdfUploader;
