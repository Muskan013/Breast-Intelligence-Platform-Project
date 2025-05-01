import React, { useState, useRef, useEffect } from 'react';
import { findTermDefinition, MedicalTermDefinition } from '@/lib/medicalTranslator';
import { BookOpen } from 'lucide-react';

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
        className="medical-term-highlight cursor-pointer border-b border-dashed border-primary/50 text-white hover:text-primary transition-colors"
      >
        {children}
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
                <p className="text-gray-300 text-sm">{termDefinition.definition}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </span>
  );
}