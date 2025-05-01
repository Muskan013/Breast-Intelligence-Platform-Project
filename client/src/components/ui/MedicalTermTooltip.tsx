import React, { useState, useRef, useEffect } from 'react';
import { findTermDefinition, MedicalTermDefinition } from '@/lib/medicalTranslator';
import { BookOpen } from 'lucide-react';

/**
 * Converts medical definitions into simple patient-friendly language
 * @param termDefinition The medical term definition to simplify
 * @returns A simplified version of the definition using everyday language
 */
function getSimplifiedDefinition(termDefinition: MedicalTermDefinition): string {
  // Simple transformation patterns for medical terminology
  const simplifications: Record<string, string> = {
    carcinoma: "cancer cells",
    metastasis: "cancer spreading",
    biopsy: "tissue sample test",
    malignant: "cancerous",
    benign: "not cancerous",
    "ductal carcinoma in situ": "early-stage breast cancer",
    "invasive ductal carcinoma": "breast cancer that has spread beyond milk ducts",
    "lobular carcinoma": "cancer in milk-producing areas",
    mastectomy: "surgery to remove the breast",
    lumpectomy: "surgery to remove only the tumor",
    "radiation therapy": "treatment using special rays",
    chemotherapy: "strong medicine to kill cancer cells",
    "hormone therapy": "treatment that blocks certain hormones",
    immunotherapy: "treatment that helps your body fight cancer",
    "neoadjuvant therapy": "treatment before surgery",
    "adjuvant therapy": "treatment after surgery",
    "lymph nodes": "small filtering spots in your body",
    "mammogram": "breast X-ray",
    "ultrasound": "imaging test using sound waves",
    "MRI": "detailed body scan",
    remission: "cancer getting better or going away",
    stage: "how far cancer has developed",
    prognosis: "outlook or chance of recovery"
  };

  // Check for direct match in simplifications
  if (simplifications[termDefinition.term.toLowerCase()]) {
    return simplifications[termDefinition.term.toLowerCase()];
  }

  // If no direct match, provide a simplified version based on category
  switch (termDefinition.category) {
    case 'diagnosis':
      return `A way doctors can tell if you have breast cancer or how serious it is.`;
    case 'treatment':
      return `A method doctors use to treat breast cancer and help you get better.`;
    case 'anatomy':
      return `A part of the body related to breast cancer.`;
    case 'procedure':
      return `A medical test or operation done by healthcare providers.`;
    case 'general':
    default:
      return `Important information about your breast cancer care explained in everyday words.`;
  }
}

interface MedicalTermTooltipProps {
  term: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export default function MedicalTermTooltip({ 
  term, 
  children,
  position = 'top' 
}: MedicalTermTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [termDefinition, setTermDefinition] = useState<MedicalTermDefinition | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Look up the term definition
    const definition = findTermDefinition(term);
    setTermDefinition(definition);
  }, [term]);

  useEffect(() => {
    // Close tooltip when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (
        tooltipRef.current && 
        !tooltipRef.current.contains(event.target as Node) &&
        termRef.current &&
        !termRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  // Position classes for tooltip
  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
  };

  // Arrow classes for tooltip
  const arrowClasses = {
    top: 'bottom-[-6px] left-1/2 transform -translate-x-1/2 border-t-primary border-l-transparent border-r-transparent border-b-transparent',
    bottom: 'top-[-6px] left-1/2 transform -translate-x-1/2 border-b-primary border-l-transparent border-r-transparent border-t-transparent',
    left: 'right-[-6px] top-1/2 transform -translate-y-1/2 border-l-primary border-t-transparent border-b-transparent border-r-transparent',
    right: 'left-[-6px] top-1/2 transform -translate-y-1/2 border-r-primary border-t-transparent border-b-transparent border-l-transparent',
  };

  // Color based on category if term definition is found
  const getCategoryColor = () => {
    if (!termDefinition) return 'bg-primary/70';
    
    switch (termDefinition.category) {
      case 'diagnosis':
        return 'bg-blue-500/70';
      case 'treatment':
        return 'bg-green-500/70';
      case 'anatomy':
        return 'bg-amber-500/70';
      case 'procedure':
        return 'bg-violet-500/70';
      case 'general':
      default:
        return 'bg-primary/70';
    }
  };

  return (
    <span className="relative inline-block">
      <span
        ref={termRef}
        onClick={handleToggle}
        className="medical-term-highlight cursor-pointer px-1 rounded bg-primary/10 border-b border-dashed border-primary/50 text-white hover:bg-primary/20 hover:text-primary transition-colors"
      >
        {children}
        <span className="inline-block w-2 h-2 ml-0.5 rounded-full bg-primary/70 align-middle"></span>
      </span>
      
      {isVisible && termDefinition && (
        <div
          ref={tooltipRef}
          className={`absolute z-50 ${positionClasses[position]} w-64 md:w-72 shadow-lg`}
        >
          <div className="relative">
            {/* Arrow */}
            <div 
              className={`absolute w-0 h-0 border-[6px] ${arrowClasses[position]}`}
            ></div>
            
            {/* Tooltip content */}
            <div className={`rounded-lg overflow-hidden backdrop-blur-md border border-white/10`}>
              {/* Tooltip header */}
              <div className={`${getCategoryColor()} p-2 flex items-center justify-between`}>
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2 text-white" />
                  <h4 className="font-medium text-white text-sm">Medical Term</h4>
                </div>
                <div className="px-1.5 py-0.5 bg-black/30 rounded-sm text-white text-xs">
                  {termDefinition.category}
                </div>
              </div>
              
              {/* Tooltip body */}
              <div className="p-3 bg-gray-900/90">
                <h5 className="font-semibold text-white mb-1">{termDefinition.term}</h5>
                <div className="border-b border-white/10 mb-2 pb-2">
                  <p className="text-gray-300 text-sm">{termDefinition.definition}</p>
                </div>
                <div className="mt-2">
                  <p className="text-xs font-semibold text-primary mb-1">In simple terms:</p>
                  <p className="text-gray-300 text-xs italic">
                    {getSimplifiedDefinition(termDefinition)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </span>
  );
}