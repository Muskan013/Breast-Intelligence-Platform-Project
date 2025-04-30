import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, Check, FileImage, FileText, FileScan, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type AcceptedFileType = 'image/*' | '.csv' | '.xls' | '.xlsx' | '.json' | 'application/json' | 'text/csv' | 'application/vnd.ms-excel' | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  onClearFile: () => void;
  acceptedTypes?: AcceptedFileType[];
  maxSize?: number; // in MB
  className?: string;
  uploadedFile: File | null;
  isLoading?: boolean;
}

export default function FileUpload({
  onFileUpload,
  onClearFile,
  acceptedTypes = ['image/*'],
  maxSize = 5, // Default max size: 5MB
  className,
  uploadedFile,
  isLoading = false
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateFile = (file: File): boolean => {
    // Size validation
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File is too large. Maximum size is ${maxSize}MB.`);
      return false;
    }

    // Type validation
    const fileType = file.type;
    
    // Check if the file type matches any of the accepted types
    const isAccepted = acceptedTypes.some(type => {
      if (type === 'image/*' && fileType.startsWith('image/')) {
        return true;
      }
      
      if (type === '.csv' && (fileType === 'text/csv' || file.name.endsWith('.csv'))) {
        return true;
      }
      
      if ((type === '.xls' || type === '.xlsx') && 
          (fileType === 'application/vnd.ms-excel' || 
           fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
           file.name.endsWith('.xls') ||
           file.name.endsWith('.xlsx'))) {
        return true;
      }
      
      if ((type === '.json' || type === 'application/json') && 
          (fileType === 'application/json' || file.name.endsWith('.json'))) {
        return true;
      }
      
      return fileType === type;
    });

    if (!isAccepted) {
      setError(`Invalid file type. Accepted: ${acceptedTypes.join(', ')}`);
      return false;
    }

    setError(null);
    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0] && !isLoading) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        onFileUpload(file);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0] && !isLoading) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        onFileUpload(file);
      }
    }
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className={cn("w-full", className)}>
      {!uploadedFile ? (
        <div
          className={`relative flex flex-col items-center justify-center h-40 border-2 border-dashed rounded-lg transition-all duration-300 ${
            dragActive 
              ? 'border-primary/80 bg-primary/5' 
              : 'border-white/10 bg-black/30 hover:border-white/30'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={handleChange}
            accept={acceptedTypes.join(',')}
            disabled={isLoading}
          />
          
          <div className="flex flex-col items-center gap-2 p-4 text-center">
            <div className="p-3 rounded-full bg-black/40 text-primary border border-primary/20 backdrop-blur-sm">
              <Upload className="h-6 w-6" />
            </div>
            <p className="text-gray-300 font-medium">Drag & drop file here or</p>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleButtonClick}
              className="text-sm bg-black/50 border-white/20 hover:bg-primary/10 hover:text-white hover:border-primary/40"
              disabled={isLoading}
            >
              Browse Files
            </Button>
            <p className="text-xs text-gray-500 mt-1">
              {acceptedTypes.includes('image/*') 
                ? 'Medical images (JPEG, PNG, DICOM)'
                : acceptedTypes.join(', ')} 
              {` - Max size: ${maxSize}MB`}
            </p>
          </div>
        </div>
      ) : (
        <div className="relative p-4 border border-white/10 rounded-lg bg-black/30 backdrop-blur-sm">
          <div className="flex items-center">
            {uploadedFile.type.startsWith('image/') ? (
              <div className="flex-shrink-0 h-16 w-16 mr-4">
                <img 
                  src={URL.createObjectURL(uploadedFile)} 
                  alt="Preview" 
                  className="h-full w-full object-cover rounded-lg" 
                />
              </div>
            ) : (
              <div className="flex-shrink-0 h-16 w-16 mr-4 bg-black/40 rounded-lg flex items-center justify-center">
                {uploadedFile.name.endsWith('.csv') || uploadedFile.type === 'text/csv' ? (
                  <FileText className="h-8 w-8 text-blue-400" />
                ) : uploadedFile.name.endsWith('.json') || uploadedFile.type === 'application/json' ? (
                  <FileText className="h-8 w-8 text-amber-400" />
                ) : (
                  <FileScan className="h-8 w-8 text-gray-400" />
                )}
              </div>
            )}
            
            <div className="flex-grow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium truncate max-w-xs">{uploadedFile.name}</p>
                  <p className="text-gray-400 text-xs">
                    {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB - {uploadedFile.type || 'Unknown type'}
                  </p>
                </div>
                
                <div className="flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClearFile}
                    className="h-8 w-8 text-gray-400 hover:text-white hover:bg-red-500/10"
                    disabled={isLoading}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="mt-2 flex items-center">
                <div className="h-1 flex-grow bg-black/50 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-accent w-full"></div>
                </div>
                <Check className="ml-2 h-4 w-4 text-green-500" />
              </div>
            </div>
          </div>
        </div>
      )}
      
      {error && (
        <div className="mt-2 text-red-500 text-sm flex items-center gap-1.5">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}