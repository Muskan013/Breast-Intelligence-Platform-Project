import PDFDocument from "pdfkit";
import { PredictionResult, PredictionParams } from "../shared/schema";
import { Request, Response } from "express";
import fs from "fs";
import path from "path";

/**
 * Generates a PDF report for a breast cancer prediction
 */
export async function generatePredictionReport(
  res: Response,
  params: PredictionParams,
  result: PredictionResult,
  patientName: string = "Anonymous",
  doctorName: string = "Healthcare Professional"
): Promise<void> {
  // Create a new PDF document
  const doc = new PDFDocument({
    size: "A4",
    margins: {
      top: 50,
      bottom: 50,
      left: 72,
      right: 72
    },
    info: {
      Title: "BreastCare Predict - Breast Cancer Prediction Report",
      Author: "BreastCare Predict AI Assistant",
      Subject: "Medical Prediction Report",
      Keywords: "breast cancer, prediction, medical report",
      CreationDate: new Date()
    }
  });

  // Pipe the PDF document to the response
  doc.pipe(res);

  // Load and embed logo
  const logoPath = path.join(__dirname, "../assets/logo.png");
  try {
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, 72, 50, { width: 150 });
    }
  } catch (error) {
    console.error("Error loading logo:", error);
  }

  // Title
  doc.fontSize(24)
     .font("Helvetica-Bold")
     .text("BreastCare Predict", 250, 60)
     .fontSize(16)
     .font("Helvetica")
     .text("Breast Cancer Prediction Report", 250, 90);

  // Date and Reference
  doc.fontSize(10)
     .text(`Date: ${new Date().toLocaleDateString()}`, 72, 150)
     .text(`Reference: BCR-${Date.now().toString().slice(-8)}`, 72, 165)
     .text(`Patient: ${patientName}`, 72, 180)
     .text(`Doctor: ${doctorName}`, 72, 195);

  // Report header
  doc.moveDown(2)
     .fontSize(14)
     .font("Helvetica-Bold")
     .text("PREDICTION RESULTS", { align: "center" })
     .moveDown(1);

  // Results box
  const resultBoxY = doc.y;
  // Draw box background based on result
  if (result.classification === "Benign") {
    doc.rect(72, resultBoxY, 451, 60).fill("#e6f7ea"); // light green for benign
  } else {
    doc.rect(72, resultBoxY, 451, 60).fill("#fbe9e7"); // light red for malignant
  }
  
  // Result headline with result icon
  doc.fillColor("#000000")
     .fontSize(16)
     .font("Helvetica-Bold")
     .text(
       `Prediction: ${result.classification} (${Math.round(result.classification === "Benign" ? result.benignProbability * 100 : result.malignantProbability * 100)}% probability)`,
       100,
       resultBoxY + 20
     );
  
  // Confidence level
  doc.fontSize(12)
     .font("Helvetica")
     .text(`Confidence Level: ${result.confidenceLevel}`, 100, resultBoxY + 40);

  // Detailed probabilities
  doc.moveDown(2)
     .fontSize(14)
     .font("Helvetica-Bold")
     .text("Detailed Analysis", { underline: true })
     .moveDown(1);

  // Create a table for probability details
  doc.fontSize(12)
     .font("Helvetica")
     .text("Benign Probability:", 72, doc.y, { continued: true, width: 200 })
     .text(`${(result.benignProbability * 100).toFixed(2)}%`, { align: "right" })
     .moveDown(0.5)
     .text("Malignant Probability:", { continued: true, width: 200 })
     .text(`${(result.malignantProbability * 100).toFixed(2)}%`, { align: "right" })
     .moveDown(1.5);

  // Input Parameters
  doc.fontSize(14)
     .font("Helvetica-Bold")
     .text("Input Parameters", { underline: true })
     .moveDown(1);

  // Create a table for input parameters
  const tableTop = doc.y;
  const tableLeft = 72;
  const columnWidth = 220;
  const rowHeight = 20;
  
  // Table header
  doc.fontSize(12)
     .font("Helvetica-Bold")
     .rect(tableLeft, tableTop, columnWidth, rowHeight).stroke()
     .text("Parameter", tableLeft + 5, tableTop + 5)
     .rect(tableLeft + columnWidth, tableTop, columnWidth, rowHeight).stroke()
     .text("Value", tableLeft + columnWidth + 5, tableTop + 5);
  
  // Table rows
  let rowY = tableTop + rowHeight;
  const parameters = [
    { name: "Cell Size", value: params.cellSize.toFixed(2) },
    { name: "Cell Shape", value: params.cellShape.toFixed(2) },
    { name: "Marginal Adhesion", value: params.marginalAdhesion.toFixed(2) },
    { name: "Epithelial Size", value: params.epithelialSize.toFixed(2) },
    { name: "Bare Nuclei", value: params.bareNuclei.toFixed(2) },
    { name: "Bland Chromatin", value: params.blandChromatin.toFixed(2) },
    { name: "Normal Nucleoli", value: params.normalNucleoli.toFixed(2) },
    { name: "Mitoses", value: params.mitoses.toFixed(2) }
  ];
  
  doc.font("Helvetica");
  parameters.forEach((param, i) => {
    const fillColor = i % 2 === 0 ? "#f5f5f5" : "#ffffff";
    doc.rect(tableLeft, rowY, columnWidth, rowHeight).fill(fillColor);
    doc.rect(tableLeft, rowY, columnWidth, rowHeight).stroke();
    doc.text(param.name, tableLeft + 5, rowY + 5);
    
    doc.rect(tableLeft + columnWidth, rowY, columnWidth, rowHeight).fill(fillColor);
    doc.rect(tableLeft + columnWidth, rowY, columnWidth, rowHeight).stroke();
    doc.text(param.value, tableLeft + columnWidth + 5, rowY + 5);
    
    rowY += rowHeight;
  });

  // Analysis notes
  doc.moveDown(2)
     .fontSize(14)
     .font("Helvetica-Bold")
     .text("Analysis Notes", { underline: true })
     .moveDown(1);

  doc.fontSize(12)
     .font("Helvetica")
     .text("This prediction is based on a machine learning model trained on the Wisconsin Breast Cancer Diagnostic dataset. The model analyzes cell nucleus characteristics to predict whether a breast mass is benign or malignant.");

  doc.moveDown()
     .text("The prediction provides a probability assessment and is intended to assist healthcare professionals in the diagnostic process. It should not be used as the sole basis for medical decisions.");

  // Recommendations
  doc.moveDown(2)
     .fontSize(14)
     .font("Helvetica-Bold")
     .text("Recommendations", { underline: true })
     .moveDown(1);

  doc.fontSize(12)
     .font("Helvetica")
     .text("• Correlate these findings with clinical examination and imaging studies.");

  doc.moveDown(0.5)
     .text("• Consider additional diagnostic procedures as clinically indicated.");

  doc.moveDown(0.5)
     .text("• Consult with relevant specialists as needed for comprehensive care.");

  // Disclaimer
  doc.moveDown(2)
     .fontSize(10)
     .font("Helvetica-Oblique")
     .fillColor("#666666")
     .text("DISCLAIMER: This report is generated by an AI-based system and is intended for use by healthcare professionals only. The predictions should be considered as supplementary information and not as a replacement for clinical judgment. Always correlate with clinical findings and other diagnostic modalities.");

  // Footer with page numbers
  const totalPages = doc.bufferedPageRange().count;
  for (let i = 0; i < totalPages; i++) {
    doc.switchToPage(i);
    
    // Add footer line
    doc.moveTo(72, 760)
       .lineTo(523, 760)
       .stroke();
       
    // Add page number
    doc.fontSize(10)
       .text(
         `Page ${i + 1} of ${totalPages}`,
         72,
         770,
         { align: "center", width: 451 }
       );
       
    // Add copyright text
    doc.fontSize(8)
       .text(
         `© ${new Date().getFullYear()} BreastCare Predict. All rights reserved.`,
         72,
         785,
         { align: "center", width: 451 }
       );
  }

  // Finalize the PDF and end the stream
  doc.end();
}

/**
 * Generates a PDF report for medical information about breast cancer
 */
export async function generateMedicalInfoReport(
  res: Response,
  topic: string = "general",
  patientName: string = "Anonymous",
  doctorName: string = "Healthcare Professional"
): Promise<void> {
  // Create a new PDF document
  const doc = new PDFDocument({
    size: "A4",
    margins: {
      top: 50,
      bottom: 50,
      left: 72,
      right: 72
    },
    info: {
      Title: `BreastCare Predict - ${topic.charAt(0).toUpperCase() + topic.slice(1)} Information Report`,
      Author: "BreastCare Predict AI Assistant",
      Subject: "Medical Information Report",
      Keywords: "breast cancer, medical information, education",
      CreationDate: new Date()
    }
  });

  // Pipe the PDF document to the response
  doc.pipe(res);

  // Load and embed logo
  const logoPath = path.join(__dirname, "../assets/logo.png");
  try {
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, 72, 50, { width: 150 });
    }
  } catch (error) {
    console.error("Error loading logo:", error);
  }

  // Title
  doc.fontSize(24)
     .font("Helvetica-Bold")
     .text("BreastCare Predict", 250, 60)
     .fontSize(16)
     .font("Helvetica")
     .text("Medical Information Report", 250, 90);

  // Date and Reference
  doc.fontSize(10)
     .text(`Date: ${new Date().toLocaleDateString()}`, 72, 150)
     .text(`Reference: MIR-${Date.now().toString().slice(-8)}`, 72, 165)
     .text(`Patient: ${patientName}`, 72, 180)
     .text(`Doctor: ${doctorName}`, 72, 195);

  // Content based on topic
  let title, content;
  
  switch (topic.toLowerCase()) {
    case "symptoms":
      title = "Breast Cancer Symptoms";
      content = getSymptomInformation();
      break;
    case "screening":
      title = "Breast Cancer Screening";
      content = getScreeningInformation();
      break;
    case "treatment":
      title = "Breast Cancer Treatment Options";
      content = getTreatmentInformation();
      break;
    case "prevention":
      title = "Breast Cancer Prevention";
      content = getPreventionInformation();
      break;
    default:
      title = "General Breast Cancer Information";
      content = getGeneralInformation();
  }

  // Report header
  doc.moveDown(2)
     .fontSize(16)
     .font("Helvetica-Bold")
     .fillColor("#1E88E5")
     .text(title.toUpperCase(), { align: "center" })
     .moveDown(1)
     .fillColor("#000000");

  // Content sections
  content.forEach((section, index) => {
    // Add section title
    doc.fontSize(14)
       .font("Helvetica-Bold")
       .text(section.title, { underline: true })
       .moveDown(0.5);
    
    // Add section content
    doc.fontSize(12)
       .font("Helvetica")
       .text(section.content, { align: "justify" })
       .moveDown(1);
    
    // Add bullet points if present
    if (section.bullets && section.bullets.length > 0) {
      section.bullets.forEach(bullet => {
        doc.text(`• ${bullet}`, { indent: 20 })
           .moveDown(0.5);
      });
      doc.moveDown(0.5);
    }
    
    // Add a separator between sections (except for the last one)
    if (index < content.length - 1) {
      doc.moveTo(72, doc.y)
         .lineTo(523, doc.y)
         .stroke()
         .moveDown(1);
    }
  });

  // References
  doc.moveDown(1)
     .fontSize(14)
     .font("Helvetica-Bold")
     .text("References", { underline: true })
     .moveDown(0.5);
     
  doc.fontSize(10)
     .font("Helvetica")
     .text("1. American Cancer Society. (2024). Breast Cancer Facts & Figures.")
     .moveDown(0.3)
     .text("2. National Cancer Institute. (2024). Breast Cancer Treatment (PDQ®)–Patient Version.")
     .moveDown(0.3)
     .text("3. World Health Organization. (2024). Breast cancer: prevention and control.")
     .moveDown(0.3);

  // Disclaimer
  doc.moveDown(1)
     .fontSize(10)
     .font("Helvetica-Oblique")
     .fillColor("#666666")
     .text("DISCLAIMER: This report is generated by an AI-based system and is intended for informational purposes only. It does not substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.");

  // Footer with page numbers
  const totalPages = doc.bufferedPageRange().count;
  for (let i = 0; i < totalPages; i++) {
    doc.switchToPage(i);
    
    // Add footer line
    doc.moveTo(72, 760)
       .lineTo(523, 760)
       .stroke();
       
    // Add page number
    doc.fontSize(10)
       .text(
         `Page ${i + 1} of ${totalPages}`,
         72,
         770,
         { align: "center", width: 451 }
       );
       
    // Add copyright text
    doc.fontSize(8)
       .text(
         `© ${new Date().getFullYear()} BreastCare Predict. All rights reserved.`,
         72,
         785,
         { align: "center", width: 451 }
       );
  }

  // Finalize the PDF and end the stream
  doc.end();
}

// Utility functions for medical information content

function getSymptomInformation() {
  return [
    {
      title: "Common Symptoms of Breast Cancer",
      content: "Being aware of breast cancer symptoms can help with early detection. While these symptoms can be caused by conditions other than cancer, it is important to have them evaluated by a healthcare provider.",
      bullets: [
        "A new lump in the breast or underarm (armpit)",
        "Thickening or swelling of part of the breast",
        "Irritation or dimpling of breast skin (sometimes called orange peel texture)",
        "Redness or flaky skin in the nipple area or the breast",
        "Pulling in of the nipple or pain in the nipple area",
        "Nipple discharge other than breast milk, including blood",
        "Any change in the size or the shape of the breast",
        "Pain in any area of the breast"
      ]
    },
    {
      title: "When Symptoms May Appear",
      content: "Breast cancer symptoms may differ for each person. Some people have no signs or symptoms at all. It is important to remember that many of these symptoms can happen with other conditions that are not cancer.",
      bullets: []
    },
    {
      title: "What to Do If You Notice Symptoms",
      content: "If you notice any changes in your breast, it is important to:",
      bullets: [
        "See a doctor promptly for evaluation",
        "Do not panic – most breast changes are not cancer",
        "Be prepared to describe any changes in detail, including when you first noticed them",
        "Continue with routine screening mammograms and clinical breast exams as recommended by your healthcare provider"
      ]
    }
  ];
}

function getScreeningInformation() {
  return [
    {
      title: "Screening Methods",
      content: "Early detection of breast cancer through screening can lead to more effective treatment options and improved outcomes. Common screening methods include:",
      bullets: [
        "Mammography: X-ray examination of the breast, considered the most effective screening tool",
        "Clinical Breast Examination (CBE): Physical examination by a healthcare professional",
        "Breast Self-Examination (BSE): Regular self-checks to identify any changes",
        "Breast MRI: Recommended for women at high risk, used in addition to mammography",
        "Breast Ultrasound: Often used as a follow-up to mammography or for women with dense breast tissue"
      ]
    },
    {
      title: "Screening Recommendations",
      content: "Screening guidelines vary between different medical organizations and may be influenced by individual risk factors. Generally:",
      bullets: [
        "Women aged 40-44: Have the option to start annual mammograms",
        "Women aged 45-54: Annual mammograms recommended",
        "Women 55 and older: Can switch to mammograms every 2 years or continue annually",
        "High-risk women: May start screening earlier and may need additional tests such as MRI",
        "Clinical breast exams are recommended every 1-3 years for women in their 20s and 30s, and annually for women 40 and older"
      ]
    },
    {
      title: "Screening Benefits and Limitations",
      content: "Understanding the benefits and limitations of breast cancer screening is important for making informed decisions:",
      bullets: [
        "Benefits: Early detection, better treatment options, improved survival rates",
        "Limitations: Possibility of false positives leading to unnecessary tests or anxiety",
        "Overdiagnosis: Some cancers found by screening may never have caused problems",
        "False negatives: Not all cancers will be detected through screening"
      ]
    }
  ];
}

function getTreatmentInformation() {
  return [
    {
      title: "Treatment Approaches",
      content: "Breast cancer treatment is highly individualized based on several factors including cancer stage, type, and patient preferences. Treatment often involves a combination of different approaches:",
      bullets: [
        "Surgery: Removal of the cancer through lumpectomy (breast-conserving) or mastectomy (removal of the breast)",
        "Radiation Therapy: Uses high-energy rays to kill cancer cells after surgery",
        "Chemotherapy: Uses drugs to kill cancer cells throughout the body",
        "Hormone Therapy: Blocks hormones that fuel cancer growth in hormone-receptor-positive cancers",
        "Targeted Therapy: Attacks specific cancer cell features",
        "Immunotherapy: Helps the immune system recognize and attack cancer cells"
      ]
    },
    {
      title: "Treatment Planning",
      content: "Treatment plans are developed by a multidisciplinary team and take into account:",
      bullets: [
        "Cancer stage and biological characteristics",
        "Patient's age, overall health, and menopausal status",
        "Genomic testing results that may predict benefit from specific treatments",
        "Patient preferences and quality of life considerations"
      ]
    },
    {
      title: "Side Effects Management",
      content: "All breast cancer treatments can have side effects, which vary depending on the treatment type, duration, and individual factors. Modern approaches focus on minimizing side effects while maximizing treatment effectiveness.",
      bullets: [
        "Surgery: Pain, swelling, limited arm movement, potential need for reconstruction",
        "Radiation: Skin changes, fatigue, breast swelling",
        "Chemotherapy: Hair loss, nausea, fatigue, increased infection risk",
        "Hormone therapy: Hot flashes, joint pain, bone density loss",
        "Targeted therapies: Heart problems, skin issues, digestive problems"
      ]
    }
  ];
}

function getPreventionInformation() {
  return [
    {
      title: "Risk Reduction Strategies",
      content: "While there is no guaranteed way to prevent breast cancer, there are steps that can help reduce risk or detect cancer at an earlier, more treatable stage:",
      bullets: [
        "Maintain a healthy weight, especially after menopause",
        "Exercise regularly (at least 150 minutes of moderate activity per week)",
        "Limit alcohol consumption (less than 1 drink per day)",
        "Avoid or limit hormone replacement therapy",
        "Consider breastfeeding if possible (breastfeeding for a total of one year or more)",
        "Avoid exposure to unnecessary radiation and environmental pollution"
      ]
    },
    {
      title: "Preventive Medications",
      content: "For women at higher risk, preventive medications (chemoprevention) may be considered:",
      bullets: [
        "Selective estrogen receptor modulators (SERMs) such as tamoxifen and raloxifene",
        "Aromatase inhibitors such as exemestane and anastrozole",
        "These medications can reduce risk by 40-65% in high-risk women",
        "Decision should be made in consultation with healthcare providers, weighing benefits against potential side effects"
      ]
    },
    {
      title: "High-Risk Interventions",
      content: "For women at very high risk due to genetic factors or family history:",
      bullets: [
        "Genetic counseling and testing for BRCA1/2 and other mutations",
        "More frequent and/or earlier screening with mammography and MRI",
        "Preventive (prophylactic) surgery – mastectomy and/or oophorectomy (removal of ovaries)",
        "Regular clinical breast exams"
      ]
    }
  ];
}

function getGeneralInformation() {
  return [
    {
      title: "Understanding Breast Cancer",
      content: "Breast cancer is a disease in which cells in the breast grow out of control. It can begin in different parts of the breast, most commonly in the ducts that carry milk to the nipple or the glands that make breast milk. Breast cancer can spread outside the breast through blood vessels and lymph vessels to other parts of the body.",
      bullets: []
    },
    {
      title: "Types of Breast Cancer",
      content: "There are several types of breast cancer, each with different characteristics:",
      bullets: [
        "Ductal Carcinoma In Situ (DCIS): Cancer cells are only in the lining of the milk ducts and have not spread to other tissues",
        "Invasive Ductal Carcinoma (IDC): Cancer cells have broken through the ducts and invaded surrounding breast tissue",
        "Invasive Lobular Carcinoma (ILC): Cancer begins in the milk-producing glands and can spread to other parts of the body",
        "Inflammatory Breast Cancer: A rare, aggressive form that causes the breast to become red, swollen, and warm",
        "Triple-Negative Breast Cancer: Cancer cells that do not have estrogen or progesterone receptors and do not make too much HER2 protein",
        "HER2-Positive Breast Cancer: Cancer cells that make too much of a protein called HER2"
      ]
    },
    {
      title: "Risk Factors",
      content: "Various factors can influence breast cancer risk. Some cannot be changed, while others can be modified:",
      bullets: [
        "Non-modifiable factors: Being female, aging, genetic mutations (BRCA1, BRCA2), family history, personal history, dense breast tissue, early menstruation or late menopause",
        "Lifestyle factors: Physical inactivity, alcohol consumption, obesity (especially after menopause), hormone therapy",
        "Environmental factors: Radiation exposure, certain workplace exposures"
      ]
    },
    {
      title: "Breast Cancer Statistics",
      content: "Breast cancer is the most common cancer among women worldwide, affecting millions of women each year. However, advances in detection and treatment have significantly improved outcomes:",
      bullets: [
        "One in eight women will develop breast cancer in her lifetime",
        "It is the second leading cause of cancer death in women",
        "There are over 3.8 million breast cancer survivors in the United States alone",
        "The 5-year survival rate for localized breast cancer is 99%",
        "Men can also develop breast cancer, although it is rare (about 1% of all breast cancer cases)"
      ]
    }
  ];
}