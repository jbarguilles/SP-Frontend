import React, { useRef, useEffect, useState } from 'react';
import { ArrowUpIcon } from '@heroicons/react/24/solid';

interface TeethModalProps {
  isOpen: boolean;
  onClose: () => void;
  section: {
    index: number;
    position: string;
  };
  treatmentValues: { top: number; right: number; bottom: number; left: number; center: number; };
  lesionValues: { top: number; right: number; bottom: number; left: number; center: number; };
  icdasValues: { top: number; right: number; bottom: number; left: number; center: number; };
  onTreatmentChange: (values: any) => void;
  onLesionChange: (values: any) => void;
  onICDASChange: (values: any) => void;
  savedDrawing?: string;
  onDrawingChange: (toothNumber: string, dataUrl: string) => void;
}

// BigSquare component
const BigSquare: React.FC<{
  options: string[];
  values: { top: number; right: number; bottom: number; left: number; center: number; }
  setValues: (values: { top: number; right: number; bottom: number; left: number; center: number; }) => void;
}> = ({ options, values, setValues }) => {
  const handleClick = (event: React.MouseEvent, direction: 'top' | 'right' | 'bottom' | 'left' | 'center') => {
    event.preventDefault();
    const newValues = {
      ...values,
      [direction]: (values[direction] + 1) % options.length
    };
    setValues(newValues);
  };

  return (
    <svg viewBox="0 0 240 135" id="popup-box" className="w-full max-w-[300px] mx-auto block" style={{ userSelect: 'none', cursor: 'pointer' }}>
      <g id="buttons">
        <polygon 
          id="top" 
          points="0,0 240,0 180,39 60,39" 
          fill="white" 
          stroke="black" 
          strokeWidth="1" 
          onMouseDown={(e) => e.preventDefault()}
          onClick={(e) => handleClick(e, 'top')} 
        />
        <text 
          x="120" 
          y="28" 
          textAnchor="middle" 
          fill="black" 
          fontSize="24"
          pointerEvents="none"
        >{options[values.top]}</text>
        
        <polygon 
          id="right" 
          points="240,0 180,39 180,96 240,135" 
          fill="white" 
          stroke="black" 
          strokeWidth="1" 
          onMouseDown={(e) => e.preventDefault()}
          onClick={(e) => handleClick(e, 'right')} 
        />
        <text 
          x="211" 
          y="77" 
          textAnchor="middle" 
          fill="black" 
          fontSize="24"
          pointerEvents="none"
        >{options[values.right]}</text>

        <polygon 
          id="bottom" 
          points="240,135 180,96 60,96 0,135" 
          fill="white" 
          stroke="black" 
          strokeWidth="1" 
          onMouseDown={(e) => e.preventDefault()}
          onClick={(e) => handleClick(e, 'bottom')} 
        />
        <text 
          x="120" 
          y="124" 
          textAnchor="middle" 
          fill="black" 
          fontSize="24"
          pointerEvents="none"
        >{options[values.bottom]}</text>

        <polygon 
          id="left" 
          points="0,135 60,96 60,39 0,0" 
          fill="white" 
          stroke="black" 
          strokeWidth="1" 
          onMouseDown={(e) => e.preventDefault()}
          onClick={(e) => handleClick(e, 'left')} 
        />
        <text 
          x="28" 
          y="77" 
          textAnchor="middle" 
          fill="black" 
          fontSize="24"
          pointerEvents="none"
        >{options[values.left]}</text>

        <rect 
          id="center" 
          x="60" 
          y="39" 
          height="57" 
          width="120" 
          fill="white" 
          stroke="black" 
          strokeWidth="1" 
          onMouseDown={(e) => e.preventDefault()}
          onClick={(e) => handleClick(e, 'center')}
        />
        <text 
          x="120" 
          y="77" 
          textAnchor="middle" 
          fill="black" 
          fontSize="24"
          pointerEvents="none"
        >{options[values.center]}</text>
      </g>
    </svg>
  );
};

const TeethModal: React.FC<TeethModalProps> = ({ 
  isOpen, 
  onClose, 
  section,
  treatmentValues,
  lesionValues,
  icdasValues,
  onTreatmentChange,
  onLesionChange,
  onICDASChange,
  savedDrawing,
  onDrawingChange
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingHistory, setDrawingHistory] = useState<ImageData[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [currentColor, setCurrentColor] = useState('#0000FF'); // Default blue
  const [thickness, setThickness] = useState(2); // Add thickness state
  const [showScrollButton, setShowScrollButton] = useState(false); // Add this line
  
  const treatmentPlans = [" ", "N", "T"];
  const lesionStatus = [" ", "+", "-"];
  const icdasCode = [" ", "0", "A", "B", "C"];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      // Set canvas resolution higher for better quality
      canvas.width = 900;  // 3x size
      canvas.height = 900; // 3x size

      // Enable smooth lines
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = thickness;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      // Enable antialiasing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      
      // Save initial blank canvas
      const initialState = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setDrawingHistory([initialState]);
      setCurrentStep(0);

      // Load saved drawing if available
      if (savedDrawing) {
        const img = new Image();
        img.src = savedDrawing;
        img.onload = () => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
      }
    }
  }, [isOpen, currentColor, savedDrawing, thickness]);

  useEffect(() => {
    const handleScroll = () => {
      if (modalRef.current) {
        const scrollTop = modalRef.current.scrollTop;
        setShowScrollButton(scrollTop > 200); // Show button after scrolling 200px
      }
    };

    const modalElement = modalRef.current;
    if (modalElement) {
      modalElement.addEventListener('scroll', handleScroll);
      return () => modalElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  if (!isOpen) return null;

  const getModalTitle = () => {
    const toothNumber = section.position === 'top' 
      ? [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28][section.index]
      : [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38][section.index];
    
    return `Tooth ${toothNumber} Details`;
  };

  const handleTreatmentSquareChange = (newValues: any) => {
    onTreatmentChange(newValues);
  };

  const handleLesionSquareChange = (newValues: any) => {
    onLesionChange(newValues);
  };

  const handleICDASSquareChange = (newValues: any) => {
    onICDASChange(newValues);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;
      
      ctx.beginPath();
      ctx.moveTo(x, y);
      setIsDrawing(true);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;
      
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const stopDrawing = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx && isDrawing) {
      ctx.closePath();
      setIsDrawing(false);
      
      // Save current state to history
      const currentState = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setDrawingHistory(prev => [...prev.slice(0, currentStep + 1), currentState]);
      setCurrentStep(prev => prev + 1);

      // Save drawing to parent component
      const toothNumber = section.position === 'top' 
        ? [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28][section.index]
        : [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38][section.index];
      const dataUrl = canvas.toDataURL();
      onDrawingChange(toothNumber.toString(), dataUrl);
    }
  };

  const handleUndo = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx && currentStep > 0) {
      const previousStep = currentStep - 1;
      ctx.putImageData(drawingHistory[previousStep], 0, 0);
      setCurrentStep(previousStep);
    }
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Reset history
      const blankState = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setDrawingHistory([blankState]);
      setCurrentStep(0);
    }
  };

  const scrollToTop = () => {
    modalRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const toothNumber = section.position === 'top' 
        ? [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28][section.index]
        : [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38][section.index];
      const dataUrl = canvas.toDataURL();
      onDrawingChange(toothNumber.toString(), dataUrl);
    }
  };

  const renderContent = () => {
    const toothNumber = section.position === 'top' 
      ? [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28][section.index]
      : [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38][section.index];

    return (
      <div className="flex flex-col gap-5 p-5">
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-sm text-gray-600">Click on any square section to cycle through the possible values</p>
        </div>

        <div className="border border-gray-300 p-4 rounded-lg">
          <h3 className="mb-4 text-green-700">Treatment Plan</h3>
          <p className="text-sm text-gray-500 mb-2">Values: N, T</p>
          <div className="w-full flex justify-center">
            <BigSquare 
              options={treatmentPlans}
              values={treatmentValues}
              setValues={handleTreatmentSquareChange}
            />
          </div>
        </div>

        <div className="border border-gray-300 p-4 rounded-lg">
          <h3 className="mb-4 text-green-700">Lesion Status</h3>
          <p className="text-sm text-gray-500 mb-2">Values: +, -</p>
          <div className="w-full flex justify-center">
            <BigSquare 
              options={lesionStatus}
              values={lesionValues}
              setValues={handleLesionSquareChange}
            />
          </div>
        </div>

        <div className="border border-gray-300 p-4 rounded-lg">
          <h3 className="mb-4 text-green-700">ICDAS Code</h3>
          <p className="text-sm text-gray-500 mb-2">Values: 0, A, B, C</p>
          <div className="w-full flex justify-center">
            <BigSquare 
              options={icdasCode}
              values={icdasValues}
              setValues={handleICDASSquareChange}
            />
          </div>
        </div>

        <div className="border border-gray-300 p-4 rounded-lg mb-5">
          <h3 className="mb-4 text-green-700">Tooth Illustration</h3>
          <div className="flex flex-col gap-4">
            {/* Drawing Controls */}
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 justify-between">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentColor('#0000FF');
                    }}
                    className={`w-8 h-8 rounded-full bg-blue-600 ${currentColor === '#0000FF' ? 'ring-2 ring-offset-2 ring-blue-600' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentColor('#FF0000');
                    }}
                    className={`w-8 h-8 rounded-full bg-red-600 ${currentColor === '#FF0000' ? 'ring-2 ring-offset-2 ring-red-600' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentColor('#00FF00');
                    }}
                    className={`w-8 h-8 rounded-full bg-green-600 ${currentColor === '#00FF00' ? 'ring-2 ring-offset-2 ring-green-600' : ''}`}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClear();
                    }}
                    className="px-4 py-2 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    Clear Drawing
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUndo();
                    }}
                    className="px-4 py-2 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Undo
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Thickness:</span>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={thickness}
                  onChange={(e) => setThickness(Number(e.target.value))}
                  className="w-full"
                />
                <span className="text-sm text-gray-600">{thickness}px</span>
              </div>
            </div>

            {/* Tooth Diagram */}
            <div className="tooth-diagram relative w-[300px] mx-auto border-2 border-dashed border-gray-300 p-2">
              <img 
                src={`/teeth-image/${toothNumber}.png`} 
                alt={`Tooth ${toothNumber}`}
                className="w-full object-contain"
              />
              <canvas
                ref={canvasRef}
                width={900}
                height={900}
                className="absolute top-0 left-0 w-full h-full"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                style={{ touchAction: 'none' }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div 
      className="fixed inset-0 bg-gray-500/50 flex justify-center items-center z-50"
      onClick={() => {
        saveDrawing();
        onClose();
      }}
    >
      <div 
        ref={modalRef}
        className="relative p-8 w-full max-w-2xl bg-white max-h-[90vh] overflow-y-auto rounded-lg select-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2>{getModalTitle()}</h2>
          <button 
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors cursor-pointer"
            onClick={() => {
              saveDrawing();
              onClose();
            }}
          >
            ×
          </button>
        </div>

        <div className="relative">
          {renderContent()}
          
          {showScrollButton && (
            <div className="sticky bottom-4 flex justify-end mr-[-25px]">
              <button
                onClick={scrollToTop}
                className="p-1.5 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-colors"
              >
                <ArrowUpIcon className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeethModal;
