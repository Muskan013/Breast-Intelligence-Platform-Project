import { useState } from 'react';
import { findMedicalTermsInText, highlightMedicalTerms, MedicalTermDefinition, categorizeTerms } from '@/lib/medicalTranslator';
import MedicalTermTooltip from './MedicalTermTooltip';
import { Button } from './button';
import { BookOpen, X } from 'lucide-react';

interface MedicalMessageContentProps {
  content: string;
  showGlossary?: boolean;
}

export default function MedicalMessageContent({ 
  content, 
  showGlossary = true 
}: MedicalMessageContentProps) {
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  
  // Find medical terms in the message
  const medicalTerms = findMedicalTermsInText(content);
  const hasTerms = medicalTerms.length > 0;
  
  // Get highlighted content with term markup
  const highlightedContent = hasTerms ? highlightMedicalTerms(content) : content;
  
  // Categorize terms for the glossary
  const categorizedTerms = categorizeTerms(medicalTerms);
  
  // Function to render content with interactive terms
  const renderInteractiveContent = () => {
    if (!hasTerms) {
      return <p className="whitespace-pre-wrap">{content}</p>;
    }
    
    // Split by the markers added in highlightMedicalTerms
    const parts = highlightedContent.split(/<span class="medical-term" data-term="([^"]+)">([^<]+)<\/span>/);
    
    return (
      <p className="whitespace-pre-wrap">
        {parts.map((part, index) => {
          // Every 3 parts form a group: text before term, term name, term text
          if (index % 3 === 0) {
            // Regular text
            return <span key={index} dangerouslySetInnerHTML={{ __html: part }} />;
          } else if (index % 3 === 1) {
            // Term name (data-term attribute value) - we don't render this directly
            return null;
          } else {
            // Term text (the actual displayed text)
            const termName = parts[index - 1]; // Get the term name from the previous part
            return (
              <MedicalTermTooltip key={index} term={termName}>
                {part}
              </MedicalTermTooltip>
            );
          }
        })}
      </p>
    );
  };
  
  // Render a section of terms for the glossary
  const renderTermCategory = (
    category: string, 
    terms: MedicalTermDefinition[], 
    color: string
  ) => {
    if (terms.length === 0) return null;
    
    return (
      <div className="mb-4" key={category}>
        <h3 className={`text-sm font-medium mb-2 ${color}`}>
          {category.charAt(0).toUpperCase() + category.slice(1)} Terms
        </h3>
        <div className="space-y-2">
          {terms.map(term => (
            <div key={term.term} className="bg-black/30 rounded-lg border border-white/10 p-2">
              <h4 className="text-white text-sm font-medium">{term.term}</h4>
              <p className="text-gray-400 text-xs mt-1">{term.definition}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div>
      {/* Message content with interactive terms */}
      {renderInteractiveContent()}
      
      {/* Medical terms glossary */}
      {showGlossary && hasTerms && (
        <div className="mt-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsGlossaryOpen(!isGlossaryOpen)}
            className="text-xs px-3 py-1 h-auto rounded-full bg-black/30 border-white/10 text-primary hover:bg-black/50"
          >
            <BookOpen className="h-3 w-3 mr-1.5" />
            {isGlossaryOpen ? 'Hide Medical Glossary' : `View Medical Terms (${medicalTerms.length})`}
          </Button>
          
          {isGlossaryOpen && (
            <div className="mt-3 p-3 rounded-lg bg-gray-900/60 backdrop-blur-sm border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-primary text-sm font-medium flex items-center">
                  <BookOpen className="h-4 w-4 mr-1.5" />
                  Medical Terms Glossary
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsGlossaryOpen(false)}
                  className="h-6 w-6 p-0 rounded-full hover:bg-white/10"
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
              
              <div className="max-h-60 overflow-y-auto pr-1">
                {renderTermCategory('diagnosis', categorizedTerms.diagnosis, 'text-blue-500')}
                {renderTermCategory('treatment', categorizedTerms.treatment, 'text-green-500')}
                {renderTermCategory('anatomy', categorizedTerms.anatomy, 'text-amber-500')}
                {renderTermCategory('procedure', categorizedTerms.procedure, 'text-violet-500')}
                {renderTermCategory('general', categorizedTerms.general, 'text-primary')}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}