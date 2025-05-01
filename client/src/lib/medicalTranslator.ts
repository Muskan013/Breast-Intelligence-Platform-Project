// Medical Jargon Translation Utility
// This utility helps translate complex medical terminology into patient-friendly language

/**
 * Medical term definition interface
 */
export interface MedicalTermDefinition {
  term: string;
  definition: string;
  category: 'diagnosis' | 'treatment' | 'anatomy' | 'procedure' | 'general';
}

/**
 * Common breast cancer medical terms with patient-friendly definitions
 */
export const medicalTerms: MedicalTermDefinition[] = [
  // Diagnosis terms
  { 
    term: "carcinoma", 
    definition: "A type of cancer that starts in cells that make up the skin or the tissue lining organs, such as the breast.",
    category: "diagnosis" 
  },
  { 
    term: "metastasis", 
    definition: "When cancer spreads from where it started to another part of the body.",
    category: "diagnosis" 
  },
  { 
    term: "biopsy", 
    definition: "A procedure to remove a small piece of tissue that is then examined under a microscope to check for cancer cells.",
    category: "diagnosis" 
  },
  { 
    term: "malignant", 
    definition: "Cancerous cells that can invade nearby tissue and spread to other parts of the body.",
    category: "diagnosis" 
  },
  { 
    term: "benign", 
    definition: "Not cancerous. Benign tumors may grow larger but do not spread to other parts of the body.",
    category: "diagnosis" 
  },
  { 
    term: "ductal carcinoma in situ", 
    definition: "Cancer cells that are only in the lining of the milk ducts and have not spread to other tissues.",
    category: "diagnosis" 
  },
  { 
    term: "invasive ductal carcinoma", 
    definition: "Cancer that started in a milk duct and has spread to the surrounding breast tissue.",
    category: "diagnosis" 
  },
  { 
    term: "lobular carcinoma", 
    definition: "Cancer that begins in the milk-producing glands (lobules) of the breast.",
    category: "diagnosis" 
  },
  
  // Treatment terms
  { 
    term: "mastectomy", 
    definition: "Surgery to remove the entire breast.",
    category: "treatment" 
  },
  { 
    term: "lumpectomy", 
    definition: "Surgery to remove only the tumor and some surrounding tissue, while leaving the rest of the breast intact.",
    category: "treatment" 
  },
  { 
    term: "radiation therapy", 
    definition: "Treatment that uses high-energy rays to kill cancer cells.",
    category: "treatment" 
  },
  { 
    term: "chemotherapy", 
    definition: "Treatment with drugs that kill cancer cells throughout the body.",
    category: "treatment" 
  },
  { 
    term: "hormone therapy", 
    definition: "Treatment that blocks the body's natural hormones, which can stimulate some breast cancers to grow.",
    category: "treatment" 
  },
  { 
    term: "immunotherapy", 
    definition: "Treatment that helps the immune system fight cancer.",
    category: "treatment" 
  },
  { 
    term: "neoadjuvant therapy", 
    definition: "Treatment given before surgery to shrink the tumor.",
    category: "treatment" 
  },
  { 
    term: "adjuvant therapy", 
    definition: "Treatment given after surgery to reduce the risk of cancer coming back.",
    category: "treatment" 
  },
  
  // Anatomy terms
  { 
    term: "lymph nodes", 
    definition: "Small bean-shaped structures that are part of the body's immune system. Cancer can spread to them.",
    category: "anatomy" 
  },
  { 
    term: "axillary lymph nodes", 
    definition: "Lymph nodes located in the armpit area, often checked during breast cancer surgery.",
    category: "anatomy" 
  },
  { 
    term: "mammary ducts", 
    definition: "Tiny tubes that carry milk from the milk-producing glands to the nipple.",
    category: "anatomy" 
  },
  
  // Procedure terms
  { 
    term: "mammogram", 
    definition: "An X-ray of the breast used to look for early signs of breast cancer.",
    category: "procedure" 
  },
  { 
    term: "ultrasound", 
    definition: "A test that uses sound waves to create a picture of the inside of the breast.",
    category: "procedure" 
  },
  { 
    term: "MRI", 
    definition: "A test that uses magnetic fields to create detailed images of the inside of the breast.",
    category: "procedure" 
  },
  { 
    term: "sentinel lymph node biopsy", 
    definition: "A procedure to remove and examine the first lymph node(s) to which cancer is likely to spread.",
    category: "procedure" 
  },
  
  // General terms
  { 
    term: "remission", 
    definition: "When signs and symptoms of cancer are reduced or gone.",
    category: "general" 
  },
  { 
    term: "stage", 
    definition: "A way to describe the size of a cancer and how far it has spread.",
    category: "general" 
  },
  { 
    term: "prognosis", 
    definition: "The likely outcome or course of a disease; the chance of recovery.",
    category: "general" 
  },
  { 
    term: "recurrence", 
    definition: "When cancer comes back after treatment.",
    category: "general" 
  },
  { 
    term: "metastatic", 
    definition: "Cancer that has spread from where it started to other parts of the body.",
    category: "general" 
  },
  { 
    term: "BRCA1/BRCA2", 
    definition: "Genes that, when mutated, increase the risk of breast and ovarian cancer.",
    category: "general" 
  },
  { 
    term: "estrogen receptor positive", 
    definition: "Cancer cells that have receptors for the hormone estrogen, which can promote their growth.",
    category: "general" 
  },
  { 
    term: "HER2 positive", 
    definition: "Cancer cells that have high levels of a protein called HER2, which can make cancer grow more quickly.",
    category: "general" 
  },
  { 
    term: "triple negative", 
    definition: "Breast cancer cells that don't have estrogen or progesterone receptors and don't make too much HER2 protein.",
    category: "general" 
  }
];

/**
 * Finds a medical term definition by term
 * @param term - The medical term to translate
 * @returns The term definition or null if not found
 */
export function findTermDefinition(term: string): MedicalTermDefinition | null {
  const lowerTerm = term.toLowerCase().trim();
  return medicalTerms.find(item => item.term.toLowerCase() === lowerTerm) || null;
}

/**
 * Searches for medical terms within a text
 * @param text - The text to search for medical terms
 * @returns An array of found medical terms
 */
export function findMedicalTermsInText(text: string): MedicalTermDefinition[] {
  const results: MedicalTermDefinition[] = [];
  const lowerText = text.toLowerCase();
  
  medicalTerms.forEach(term => {
    if (lowerText.includes(term.term.toLowerCase())) {
      if (!results.includes(term)) {
        results.push(term);
      }
    }
  });
  
  return results;
}

/**
 * Categorizes medical terms by their category
 * @param terms - The medical terms to categorize
 * @returns Object with terms categorized by type
 */
export function categorizeTerms(terms: MedicalTermDefinition[]): Record<string, MedicalTermDefinition[]> {
  const categorized: Record<string, MedicalTermDefinition[]> = {
    diagnosis: [],
    treatment: [],
    anatomy: [],
    procedure: [],
    general: []
  };
  
  terms.forEach(term => {
    if (categorized[term.category]) {
      categorized[term.category].push(term);
    }
  });
  
  return categorized;
}

/**
 * Highlight medical terms in text
 * @param text - The text to process
 * @returns Text with medical terms highlighted with HTML markup
 */
export function highlightMedicalTerms(text: string): string {
  let processedText = text;
  
  // Sort terms by length (longest first) to prevent partial matches
  const sortedTerms = [...medicalTerms].sort((a, b) => 
    b.term.length - a.term.length
  );
  
  sortedTerms.forEach(termObj => {
    const term = termObj.term;
    // Case insensitive global replace with word boundary check
    const regex = new RegExp(`\\b${term}\\b`, 'gi');
    processedText = processedText.replace(regex, 
      `<span class="medical-term" data-term="${term.toLowerCase()}">$&</span>`
    );
  });
  
  return processedText;
}