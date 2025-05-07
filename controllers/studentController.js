const { generatePDF } = require('../utils/pdfGenerator');
const { encryptData, decryptData } = require('../utils/encryptor');
const { uploadToIPFS } = require('../utils/ipfsClient');
const axios = require('axios');

// ✅ Upload PDF, Encrypt & Push to IPFS
const uploadStudentData = async (req, res) => {
  try {
    const studentData = req.body;

    // 1. Generate PDF
    const pdfBuffer = await generatePDF(studentData);

    // 2. Encrypt PDF
    const encryptedPDF = encryptData(pdfBuffer);

    // 3. Upload to IPFS
    const ipfsResult = await uploadToIPFS(encryptedPDF);

    res.status(200).json({ ipfsHash: ipfsResult.path });
  } catch (error) {
    res.status(500).json({ message: 'Upload Failed', error: error.message });
  }
};

// ✅ View/Decrypt PDF from IPFS
const viewStudentData = async (req, res) => {
  try {
    const { ipfsHash } = req.params;
    const url = `http://localhost:8080/ipfs/${ipfsHash}`; // or your IPFS gateway
    const response = await axios.get(url, { responseType: 'arraybuffer' });

    const decryptedPDF = decryptData(Buffer.from(response.data));
    res.setHeader('Content-Type', 'application/pdf');
    res.send(decryptedPDF);
  } catch (error) {
    res.status(500).json({ message: 'View Failed', error: error.message });
  }
};

// ✅ Export both functions
module.exports = {
  uploadStudentData,
  viewStudentData,
};
