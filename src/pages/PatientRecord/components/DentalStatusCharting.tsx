import React, { useState } from 'react';

// Import teeth images
import teeth18 from '/teeth-image/18.png';
import teeth17 from '/teeth-image/17.png';
import teeth16 from '/teeth-image/16.png';
import teeth15 from '/teeth-image/15.png';
import teeth14 from '/teeth-image/14.png';
import teeth13 from '/teeth-image/13.png';
import teeth12 from '/teeth-image/12.png';
import teeth11 from '/teeth-image/11.png';
import teeth21 from '/teeth-image/21.png';
import teeth22 from '/teeth-image/22.png';
import teeth23 from '/teeth-image/23.png';
import teeth24 from '/teeth-image/24.png';
import teeth25 from '/teeth-image/25.png';
import teeth26 from '/teeth-image/26.png';
import teeth27 from '/teeth-image/27.png';
import teeth28 from '/teeth-image/28.png';

import teeth48 from '/teeth-image/48.png';
import teeth47 from '/teeth-image/47.png';
import teeth46 from '/teeth-image/46.png';
import teeth45 from '/teeth-image/45.png';
import teeth44 from '/teeth-image/44.png';
import teeth43 from '/teeth-image/43.png';
import teeth42 from '/teeth-image/42.png';
import teeth41 from '/teeth-image/41.png';
import teeth31 from '/teeth-image/31.png';
import teeth32 from '/teeth-image/32.png';
import teeth33 from '/teeth-image/33.png';
import teeth34 from '/teeth-image/34.png';
import teeth35 from '/teeth-image/35.png';
import teeth36 from '/teeth-image/36.png';
import teeth37 from '/teeth-image/37.png';
import teeth38 from '/teeth-image/38.png';

import ECBG from '/init_EC.png';

interface Props {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

// Square component
const Square: React.FC<{
  options: string[];
  onclick: () => void;
  values: { top: number; right: number; bottom: number; left: number; center: number; }
}> = ({ options, onclick, values }) => {
  return (
    <svg viewBox="0 0 80 45">
      <g id="buttons">
        <polygon id="top" points="0,0 80,0 60,13 20,13" fill="white" stroke="black" strokeWidth="1"/>
        <text x="40" y="10" textAnchor="middle" fill="black" fontSize="10">{options[values.top]}</text>

        <polygon id="right" points="80,0 60,13 60,32 80,45" fill="white" stroke="black" strokeWidth="1"/>
        <text x="70" y="26" textAnchor="middle" fill="black" fontSize="10">{options[values.right]}</text>

        <polygon id="bottom" points="80,45 60,32 20,32 0,45" fill="white" stroke="black" strokeWidth="1"/>
        <text x="40" y="42" textAnchor="middle" fill="black" fontSize="10">{options[values.bottom]}</text>

        <polygon id="left" points="0,45 20,32 20,13 0,0" fill="white" stroke="black" strokeWidth="1"/>
        <text x="10" y="26" textAnchor="middle" fill="black" fontSize="10">{options[values.left]}</text>

        <rect id="center" x="20" y="13" height="19" width="40" fill="white" stroke="black" strokeWidth="1"/>
        <text x="40" y="26" textAnchor="middle" fill="black" fontSize="10">{options[values.center]}</text>
        
        <rect id="whole" x="0" y="0" height="45" width="80" fillOpacity="0" onClick={onclick}/>
      </g>
    </svg>
  );
};

// BigSquare component
const BigSquare: React.FC<{
  options: string[];
  values: { top: number; right: number; bottom: number; left: number; center: number; }
  setValues: React.Dispatch<React.SetStateAction<any>>;
  index: number;
  setValuesArray: React.Dispatch<React.SetStateAction<any[]>>;
}> = ({ options, values, index, setValuesArray }) => {
  const handleClick = (direction: string) => {
    setValuesArray((prevValuesArray) => {
      const updatedValuesArray = [...prevValuesArray];
      updatedValuesArray[index] = {
        ...prevValuesArray[index],
        [direction]: (prevValuesArray[index][direction] + 1) % options.length,
      };
      return updatedValuesArray;
    });
  };

  return (
    <svg viewBox="0 0 240 135" id="popup-box">
      <g id="buttons">
        <polygon id="top" points="0,0 240,0 180,39 60,39" fill="white" stroke="black" strokeWidth="1" onClick={() => handleClick('top')} />
        <text x="120" y="28" textAnchor="middle" fill="black" fontSize="24">{options[values.top]}</text>
        
        <polygon id="right" points="240,0 180,39 180,96 240,135" fill="white" stroke="black" strokeWidth="1" onClick={() => handleClick('right')} />
        <text x="211" y="77" textAnchor="middle" fill="black" fontSize="24">{options[values.right]}</text>

        <polygon id="bottom" points="240,135 180,96 60,96 0,135" fill="white" stroke="black" strokeWidth="1" onClick={() => handleClick('bottom')} />
        <text x="120" y="124" textAnchor="middle" fill="black" fontSize="24">{options[values.bottom]}</text>

        <polygon id="left" points="0,135 60,96 60,39 0,0" fill="white" stroke="black" strokeWidth="1" onClick={() => handleClick('left')} />
        <text x="28" y="77" textAnchor="middle" fill="black" fontSize="24">{options[values.left]}</text>

        <rect id="center" x="60" y="39" height="57" width="120" fill="white" stroke="black" strokeWidth="1" onClick={() => handleClick('center')}/>
        <text x="120" y="77" textAnchor="middle" fill="black" fontSize="24">{options[values.center]}</text>
      </g>
    </svg>
  );
};

const DentalStatusCharting: React.FC<Props> = () => {
  const treatmentPlans = [" ", "N", "T"];
  const lesionStatus = [" ", "+", "-"];
  const icdasCode = [" ", "0", "A", "B", "C"];
  
  const [buttonPopup, setButtonPopup] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [boxType, setBoxType] = useState("");

  // Add treatment plan state
  const [treatmentPlanValuesArrayTop, setTreatmentPlanValuesArrayTop] = useState(
    Array(16).fill({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      center: 0
    })
  );

  const [treatmentPlanValuesArrayBottom, setTreatmentPlanValuesArrayBottom] = useState(
    Array(16).fill({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      center: 0
    })
  );

  // Add lesion status state
  const [lesionStatusValuesArrayTop, setLesionStatusValuesArrayTop] = useState(
    Array(16).fill({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      center: 0
    })
  );

  const [lesionStatusValuesArrayBottom, setLesionStatusValuesArrayBottom] = useState(
    Array(16).fill({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      center: 0
    })
  );

  // Add ICDAS code state
  const [icdasValuesArrayTop, setIcdasValuesArrayTop] = useState(
    Array(16).fill({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      center: 0
    })
  );

  const [icdasValuesArrayBottom, setIcdasValuesArrayBottom] = useState(
    Array(16).fill({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      center: 0
    })
  );

  const [existingConditionTop, setExistingConditionTop] = useState(
    Array(16).fill(ECBG)
  );

  const [existingConditionBottom, setExistingConditionBottom] = useState(
    Array(16).fill(ECBG)
  );

  const [upperTeeth, setUpperTeeth] = useState([
    teeth18, teeth17, teeth16, teeth15, teeth14, teeth13, teeth12, teeth11,
    teeth21, teeth22, teeth23, teeth24, teeth25, teeth26, teeth27, teeth28
  ]);

  const [lowerTeeth, setLowerTeeth] = useState([
    teeth48, teeth47, teeth46, teeth45, teeth44, teeth43, teeth42, teeth41,
    teeth31, teeth32, teeth33, teeth34, teeth35, teeth36, teeth37, teeth38
  ]);

  const handleSquareClick = (index: number, position: string) => {
    if (position === 'top') {
      setTreatmentPlanValuesArrayTop((prevValuesArray) => {
        const updatedValuesArray = [...prevValuesArray];
        updatedValuesArray[index] = {
          ...prevValuesArray[index],
          center: (prevValuesArray[index].center + 1) % treatmentPlans.length,
        };
        return updatedValuesArray;
      });
    } else if (position === 'bottom') {
      setTreatmentPlanValuesArrayBottom((prevValuesArray) => {
        const updatedValuesArray = [...prevValuesArray];
        updatedValuesArray[index] = {
          ...prevValuesArray[index],
          center: (prevValuesArray[index].center + 1) % treatmentPlans.length,
        };
        return updatedValuesArray;
      });
    }
  };

  return (
    <fieldset className="mb-6 p-4 rounded-lg border border-green-800 flex justify-center items-center">
      <legend className="text-lg font-semibold text-green-800">Dental Status Chart</legend>
      
      <div className="chart-container w-full overflow-x-auto flex justify-center">
        <div id="container-wrapper" className="flex flex-col min-w-fit">
          {/* Top Treatment Plan Row */}
          <div className="container flex items-center">
            <div className="flex-shrink-0" style={{ width: '96px' }}>
              <svg viewBox="0 0 120 45" preserveAspectRatio="xMinYMid meet" style={{ display: 'block' }}>
                <g>
                  <polygon points="0,0 120,0 120,45 0,45" fill="white" stroke="black" strokeWidth="1"/>
                  <text x="10" y="20" textAnchor="start" fill="black" fontSize="12">Treatment Plan:</text>
                  <text x="10" y="35" textAnchor="start" fill="black" fontSize="12">NOC or TPOC</text>
                </g>
              </svg>
            </div>

            <div className="flex">
              {[...Array(16)].map((_, index) => (
                <div key={index} className="w-16">
                  <Square 
                    options={treatmentPlans} 
                    onclick={() => handleSquareClick(index, 'top')} 
                    values={treatmentPlanValuesArrayTop[index]}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Top Lesion Status Row */}
          <div className="container flex items-center">
            <div className="flex-shrink-0" style={{ width: '96px' }}>
              <svg viewBox="0 0 120 45" preserveAspectRatio="xMinYMid meet" style={{ display: 'block' }}>
                <g>
                  <polygon points="0,0 120,0 120,45 0,45" fill="white" stroke="black" strokeWidth="1"/>
                  <text x="10" y="20" textAnchor="start" fill="black" fontSize="12">Lesion Status:</text>
                  <text x="10" y="35" textAnchor="start" fill="black" fontSize="12">(+) or (-)</text>
                </g>
              </svg>
            </div>

            <div className="flex">
              {[...Array(16)].map((_, index) => (
                <div key={index} className="w-16">
                  <Square 
                    options={lesionStatus} 
                    onclick={() => handleSquareClick(index, 'top')} 
                    values={lesionStatusValuesArrayTop[index]}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Top ICDAS Code Row */}
          <div className="container flex items-center">
            <div className="flex-shrink-0" style={{ width: '96px' }}>
              <svg viewBox="0 0 120 45" preserveAspectRatio="xMinYMid meet" style={{ display: 'block' }}>
                <g>
                  <polygon points="0,0 120,0 120,45 0,45" fill="white" stroke="black" strokeWidth="1"/>
                  <text x="10" y="20" textAnchor="start" fill="black" fontSize="12">ICDAS Code:</text>
                  <text x="10" y="35" textAnchor="start" fill="black" fontSize="10">0, A, B, C, Restoration</text>
                </g>
              </svg>
            </div>

            <div className="flex">
              {[...Array(16)].map((_, index) => (
                <div key={index} className="w-16">
                  <Square 
                    options={icdasCode} 
                    onclick={() => handleSquareClick(index, 'top')} 
                    values={icdasValuesArrayTop[index]}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Top Existing Condition Row */}
          <div className="existingCondition-container">
            <div id="existing-condition" className="flex items-center">
              <div className="flex-shrink-0" style={{ width: '96px', height: '36px' }}>
                <svg viewBox="0 0 120 45" preserveAspectRatio="xMinYMid meet" style={{ display: 'block' }}>
                  <g>
                    <polygon points="0,0 120,0 120,45 0,45" fill="white" stroke="black" strokeWidth="1"/>
                    <text x="10" y="28" textAnchor="start" fill="black" fontSize="12">Existing Condition</text>
                  </g>
                </svg>
              </div>

              <div className="flex">
                {[...Array(16)].map((_, index) => (
                  <div key={index} style={{ width: '64px', height: '36px' }} onClick={() => handleSquareClick(index, 'top')}>
                    <svg viewBox="0 0 80 45">
                      <g>
                        <polygon points="0,0 80,0 80,45 0,45" fill="white" stroke="black" strokeWidth="1"/>
                      </g>
                      <image href={existingConditionTop[index]} x="2" y="2" width="76" height="41" />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Teeth Diagrams Top Row */}
          <div className="teeth-container">
            <div id="teeth" className="flex items-center">
              <div className="flex-shrink-0" style={{ width: '96px' }}>
                <svg viewBox="0 0 120 160" preserveAspectRatio="xMinYMid meet" style={{ display: 'block' }}>
                  <g>
                    <polygon points="0,0 120,0 120,160 0,160" fill="white" stroke="black" strokeWidth="1"/>
                    <text x="10" y="50" textAnchor="start" fill="black" fontSize="12">Facial</text>
                    <text x="10" y="90" textAnchor="start" fill="black" fontSize="12">Occlusal</text>
                    <text x="10" y="130" textAnchor="start" fill="black" fontSize="12">Palatal</text>
                  </g>
                </svg>
              </div>

              <div className="flex">
                {upperTeeth.map((tooth, index) => (
                  <div key={index} style={{ width: '64px' }} onClick={() => handleSquareClick(index, 'top')}>
                    <svg viewBox="0 0 80 160" className="upperTeeth">
                      <g>
                        <polygon points="0,0 80,0 80,160 0,160" fill="white" stroke="black" strokeWidth="1"/>
                        <line x1="0" y1="159" x2="80" y2="159" stroke="black" strokeWidth="1"/>
                        {index === 7 && <line x1="79" y1="0" x2="79" y2="160" stroke="black" strokeWidth="1"/>}
                        {index === 8 && <line x1="1" y1="0" x2="1" y2="160" stroke="black" strokeWidth="1"/>}
                      </g>
                      <image href={tooth} x="2.5" y="5" width="75" height="150"/>
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Teeth Diagrams Bottom Row */}
          <div className="teeth-container">
            <div id="teeth" className="flex items-center">
              <div className="flex-shrink-0" style={{ width: '96px' }}>
                <svg viewBox="0 0 120 160" preserveAspectRatio="xMinYMid meet" style={{ display: 'block' }}>
                  <g>
                    <polygon points="0,0 120,0 120,160 0,160" fill="white" stroke="black" strokeWidth="1"/>
                    <text x="10" y="50" textAnchor="start" fill="black" fontSize="12">Facial</text>
                    <text x="10" y="90" textAnchor="start" fill="black" fontSize="12">Occlusal</text>
                    <text x="10" y="130" textAnchor="start" fill="black" fontSize="12">Lingual</text>
                  </g>
                </svg>
              </div>

              <div className="flex">
                {lowerTeeth.map((tooth, index) => (
                  <div key={index} style={{ width: '64px' }} onClick={() => handleSquareClick(index, 'bottom')}>
                    <svg viewBox="0 0 80 160" className="lowerTeeth">
                      <g>
                        <polygon points="0,0 80,0 80,160 0,160" fill="white" stroke="black" strokeWidth="1"/>
                        <line x1="0" y1="1" x2="80" y2="1" stroke="black" strokeWidth="1"/>
                        {index === 7 && <line x1="79" y1="0" x2="79" y2="160" stroke="black" strokeWidth="1"/>}
                        {index === 8 && <line x1="1" y1="0" x2="1" y2="160" stroke="black" strokeWidth="1"/>}
                      </g>
                      <image href={tooth} x="2.5" y="5" width="75" height="150"/>
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Existing Condition Row */}
          <div className="existingCondition-container">
            <div id="existing-condition" className="flex items-center">
              <div className="flex-shrink-0" style={{ width: '96px', height: '36px' }}>
                <svg viewBox="0 0 120 45" preserveAspectRatio="xMinYMid meet" style={{ display: 'block' }}>
                  <g>
                    <polygon points="0,0 120,0 120,45 0,45" fill="white" stroke="black" strokeWidth="1"/>
                    <text x="10" y="28" textAnchor="start" fill="black" fontSize="12">Existing Condition</text>
                  </g>
                </svg>
              </div>

              <div className="flex">
                {[...Array(16)].map((_, index) => (
                  <div key={index} style={{ width: '64px', height: '36px' }} onClick={() => handleSquareClick(index, 'bottom')}>
                    <svg viewBox="0 0 80 45">
                      <g>
                        <polygon points="0,0 80,0 80,45 0,45" fill="white" stroke="black" strokeWidth="1"/>
                      </g>
                      <image href={existingConditionBottom[index]} x="2" y="2" width="76" height="41" />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom ICDAS Code Row */}
          <div className="container flex items-center">
            <div className="flex-shrink-0" style={{ width: '96px' }}>
              <svg viewBox="0 0 120 45" preserveAspectRatio="xMinYMid meet" style={{ display: 'block' }}>
                <g>
                  <polygon points="0,0 120,0 120,45 0,45" fill="white" stroke="black" strokeWidth="1"/>
                  <text x="10" y="20" textAnchor="start" fill="black" fontSize="12">ICDAS Code:</text>
                  <text x="10" y="35" textAnchor="start" fill="black" fontSize="10">0, A, B, C, Restoration</text>
                </g>
              </svg>
            </div>

            <div className="flex">
              {[...Array(16)].map((_, index) => (
                <div key={index} className="w-16">
                  <Square 
                    options={icdasCode} 
                    onclick={() => handleSquareClick(index, 'bottom')} 
                    values={icdasValuesArrayBottom[index]}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Lesion Status Row */}
          <div className="container flex items-center">
            <div className="flex-shrink-0" style={{ width: '96px' }}>
              <svg viewBox="0 0 120 45" preserveAspectRatio="xMinYMid meet" style={{ display: 'block' }}>
                <g>
                  <polygon points="0,0 120,0 120,45 0,45" fill="white" stroke="black" strokeWidth="1"/>
                  <text x="10" y="20" textAnchor="start" fill="black" fontSize="12">Lesion Status:</text>
                  <text x="10" y="35" textAnchor="start" fill="black" fontSize="12">(+) or (-)</text>
                </g>
              </svg>
            </div>

            <div className="flex">
              {[...Array(16)].map((_, index) => (
                <div key={index} className="w-16">
                  <Square 
                    options={lesionStatus} 
                    onclick={() => handleSquareClick(index, 'bottom')} 
                    values={lesionStatusValuesArrayBottom[index]}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Treatment Plan Row */}
          <div className="container flex items-center">
            <div className="flex-shrink-0" style={{ width: '96px' }}>
              <svg viewBox="0 0 120 45" preserveAspectRatio="xMinYMid meet" style={{ display: 'block' }}>
                <g>
                  <polygon points="0,0 120,0 120,45 0,45" fill="white" stroke="black" strokeWidth="1"/>
                  <text x="10" y="20" textAnchor="start" fill="black" fontSize="12">Treatment Plan:</text>
                  <text x="10" y="35" textAnchor="start" fill="black" fontSize="12">NOC or TPOC</text>
                </g>
              </svg>
            </div>

            <div className="flex">
              {[...Array(16)].map((_, index) => (
                <div key={index} className="w-16">
                  <Square 
                    options={treatmentPlans} 
                    onclick={() => handleSquareClick(index, 'bottom')} 
                    values={treatmentPlanValuesArrayBottom[index]}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </fieldset>
  );
};

export default DentalStatusCharting;
