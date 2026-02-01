import { useRef, useEffect, useState } from 'react';
import FieldWrapper from '../shared/FieldWrapper';
import ValidationMessage from '../shared/ValidationMessage';

function SignatureField({
  name,
  value = '',
  onChange,
  onBlur,
  label,
  required = false,
  showError = false,
  errorMessage = 'Signature is required',
  disabled = false,
  className = ''
}) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = 150;

    // Load existing signature if present
    if (value) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        setHasSignature(true);
      };
      img.src = value;
    } else {
      // Clear canvas and set background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, [value]);

  const startDrawing = (e) => {
    if (disabled) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(
      e.clientX - rect.left,
      e.clientY - rect.top
    );
  };

  const draw = (e) => {
    if (!isDrawing || disabled) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    ctx.lineTo(
      e.clientX - rect.left,
      e.clientY - rect.top
    );
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    
    setIsDrawing(false);
    setHasSignature(true);
    
    // Save signature as data URL
    const canvas = canvasRef.current;
    const signatureData = canvas.toDataURL('image/png');
    
    // Create synthetic event
    const syntheticEvent = {
      target: {
        name: name,
        value: signatureData
      }
    };
    
    onChange(syntheticEvent);
    
    if (onBlur) {
      onBlur(name);
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    setHasSignature(false);
    
    // Clear the value
    const syntheticEvent = {
      target: {
        name: name,
        value: ''
      }
    };
    
    onChange(syntheticEvent);
  };

  return (
    <FieldWrapper label={label} required={required} name={name}>
      <div className={`signature-field ${className}`}>
        <div className={`border-2 rounded-lg overflow-hidden ${
          showError ? 'border-red-500' : 'border-gray-300'
        } ${disabled ? 'opacity-50' : ''}`}>
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className="w-full cursor-crosshair bg-white"
            style={{ touchAction: 'none' }}
          />
        </div>
        
        <div className="flex justify-between items-center mt-2">
          <button
            type="button"
            onClick={clearSignature}
            disabled={disabled || !hasSignature}
            className="text-sm text-red-600 hover:text-red-700 disabled:text-gray-400 disabled:cursor-not-allowed font-medium"
          >
            Clear Signature
          </button>
          <span className="text-xs text-gray-500">
            {hasSignature ? 'Signature captured' : 'Sign above'}
          </span>
        </div>
      </div>
      
      {showError && <ValidationMessage message={errorMessage} type="error" />}
    </FieldWrapper>
  );
}

export default SignatureField;
