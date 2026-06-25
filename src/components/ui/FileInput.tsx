import React, { forwardRef, useState } from 'react';
import { LuUpload as Upload } from 'react-icons/lu';

export interface FileInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  placeholder?: string;
}

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ placeholder = 'Upload File', className, onChange, ...props }, ref) => {
    const [fileName, setFileName] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      setFileName(file ? file.name : '');
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div className={`relative w-full ${className || ''}`}>
        <label className="flex items-center justify-between w-full h-12 px-4 border rounded-sm  border-input focus-within:border-primary bg-card cursor-pointer transition-all">
          <span className={`text-[14px] truncate flex-1 pr-2 ${fileName ? 'text-foreground' : 'text-muted-foreground'}`}>
            {fileName || placeholder}
          </span>
          <Upload size={18} className="text-muted-foreground flex-shrink-0" />
          <input 
            type="file" 
            className="hidden " 
            ref={ref}
            onChange={handleChange}
            {...props}
          />
        </label>
      </div>
    );
  }
);
FileInput.displayName = 'FileInput';
