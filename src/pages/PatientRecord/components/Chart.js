import './Chart.css';
import Popup from './components/Popup';
import { useState, useEffect, useRef } from 'react';
import teeth18 from './teeth-image/18.png';
import teeth17 from './teeth-image/17.png';
import teeth16 from './teeth-image/16.png';
import teeth15 from './teeth-image/15.png';
import teeth14 from './teeth-image/14.png';
import teeth13 from './teeth-image/13.png';
import teeth12 from './teeth-image/12.png';
import teeth11 from './teeth-image/11.png';
import teeth21 from './teeth-image/21.png';
import teeth22 from './teeth-image/22.png';
import teeth23 from './teeth-image/23.png';
import teeth24 from './teeth-image/24.png';
import teeth25 from './teeth-image/25.png';
import teeth26 from './teeth-image/26.png';
import teeth27 from './teeth-image/27.png';
import teeth28 from './teeth-image/28.png';

import teeth48 from './teeth-image/48.png';
import teeth47 from './teeth-image/47.png';
import teeth46 from './teeth-image/46.png';
import teeth45 from './teeth-image/45.png';
import teeth44 from './teeth-image/44.png';
import teeth43 from './teeth-image/43.png';
import teeth42 from './teeth-image/42.png';
import teeth41 from './teeth-image/41.png';
import teeth31 from './teeth-image/31.png';
import teeth32 from './teeth-image/32.png';
import teeth33 from './teeth-image/33.png';
import teeth34 from './teeth-image/34.png';
import teeth35 from './teeth-image/35.png';
import teeth36 from './teeth-image/36.png';
import teeth37 from './teeth-image/37.png';
import teeth38 from './teeth-image/38.png';

import ECBG from './init_EC.png';
import {useCookies} from "react-cookie";

function Square({options, onclick, values}) {

  return (
    <svg viewBox="0 0 80 45">
      <g id="buttons" >
        
        <polygon id="top" points="0,0 80,0 60,13 20,13" />
        <text x="40" y="10" textAnchor="middle" fill="black" fontSize="10" >{options[values.top]}</text>

        <polygon id="right" points="80,0 60,13 60,32 80,45" />
        <text x="70" y="26" textAnchor="middle" fill="black" fontSize="10" >{options[values.right]}</text>

        <polygon id="bottom" points="80,45 60,32 20,32 0,45" />
        <text x="40" y="42" textAnchor="middle" fill="black" fontSize="10" >{options[values.bottom]}</text>

        <polygon id="left" points="0,45 20,32 20,13 0,0" />
        <text x="10" y="26" textAnchor="middle" fill="black" fontSize="10" >{options[values.left]}</text>

        <rect id="center" x="20" y="13" height="19" width="40" />
        <text x="40" y="26" textAnchor="middle" fill="black" fontSize="10" >{options[values.center]}</text>
        
        <rect id="whole" x="0" y="0" height="45" width="80"  onClick={onclick}/>

      </g>
    </svg>
  );
}

function BigSquare({options, values, setValues, index, setValuesArray}) {

  const handleClick = (direction) => {

    // Update positionsArray with the updated positions
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

        <polygon id="top" points="0,0 240,0 180,39 60,39" onClick={() => handleClick('top')} />
        <text x="120" y="28" textAnchor="middle" fill="black" fontSize="24" >{options[values.top]}</text>
        
        <polygon id="right" points="240,0 180,39 180,96 240,135" onClick={() => handleClick('right')} />
        <text x="211" y="77" textAnchor="middle" fill="black" fontSize="24" >{options[values.right]}</text>

        <polygon id="bottom" points="240,135 180,96 60,96 0,135" onClick={() => handleClick('bottom')} />
        <text x="120" y="124" textAnchor="middle" fill="black" fontSize="24" >{options[values.bottom]}</text>

        <polygon id="left" points="0,135 60,96 60,39 0,0" onClick={() => handleClick('left')} />
        <text x="28" y="77" textAnchor="middle" fill="black" fontSize="24" >{options[values.left]}</text>

        <rect id="center" x="60" y="39" height="57" width="120" onClick={() => handleClick('center')}/>
        <text x="120" y="77" textAnchor="middle" fill="black" fontSize="24" >{options[values.center]}</text>
        

      </g>
    </svg>
  );
}

function ExistingConditionSquare({ECArray, setECArray, index, canvasRef}) {

    const [isDrawing, setIsDrawing] = useState(false);
    const [strokeColor, setStrokeColor] = useState('#f54242'); // Default stroke color
    const [brushWidth, setBrushWidth] = useState(8);
    const [image, setImage] = useState(null);

    let dataUrl = '';
    useEffect(() => {
      // Load image when component mounts
      const loadImage = async () => {
        try {
          const img = new Image();
          img.src = ECArray[index];
          img.onload = () => {
            setImage(img);
          };
        } catch (error) {
          console.error('Error loading image:', error);
        }
      };

      loadImage();
    }, []);

    const startDrawing = (e) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ctx.beginPath();
      ctx.moveTo(x, y);
      setIsDrawing(true);
    };

    const draw = (e) => {
      if (!isDrawing) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ctx.lineTo(x, y);
      ctx.lineWidth = brushWidth; // Adjust the line width here (5 pixels in this case)
      ctx.strokeStyle = strokeColor; // Set stroke color
      ctx.lineJoin = 'round'; // Set line join to round for rounded corners
      ctx.lineCap = 'round';
      ctx.stroke();
    };

    const endDrawing = () => {
      setIsDrawing(false);
    };

    const clearDrawing = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const img = new Image();
      img.src = ECBG;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };

      const newEC = [...ECArray];
      newEC[index] = ECBG;
      setECArray(newEC);

    };

    const handleColorChange = (e) => {
      setStrokeColor(e);
    };

    const handleWidthChange = (e) => {
      setBrushWidth(e.target.value);
    };

    return (
        <div id='existing-condition-popup-container'>
          <div id='existingCondition-canvas'>
            <canvas
                ref={canvasRef}
                width={440} // Set your desired width
                height={160} // Set your desired height
                style={{ border: '1px solid black' }} // Add border for visibility
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={endDrawing}
            ></canvas>
          </div>
          
          <div className='tools'>
            {/* <input type="color" value={strokeColor} onChange={handleColorChange} /> */}
            <div className='color-picker'>
              <div
                className="color-box red"
                onClick={() => handleColorChange("#f54242")}
              ></div>
              <div
                className="color-box blue"
                onClick={() => handleColorChange("#4287f5")}
              ></div>
              <div
                className="color-box green"
                onClick={() => handleColorChange("#42f569")}
              ></div>
            </div>

            <input type="range" min="4" max="12" step="2" value={brushWidth} onChange={handleWidthChange}/>
            <button onClick={clearDrawing}>Clear</button>
          </div>
          {image && (
              <img
                  src={image.src}
                  alt="Image"
                  style={{ display: 'none' }}
                  onLoad={() => {
                    const canvas = canvasRef.current;
                    if (!canvas) return;

                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                  }}
              />
          )}
        </div>
    );

}

function TeethPopup({teethArray, setTeethArray, index, isTopTeeth, canvasRef}) {

  const [upperTeeth, setUpperTeeth] = useState([
    teeth18, teeth17, teeth16, teeth15, teeth14, teeth13, teeth12, teeth11,
    teeth21, teeth22, teeth23, teeth24, teeth25, teeth26, teeth27, teeth28
  ]);

  const [lowerTeeth, setLowerTeeth] = useState([
    teeth48, teeth47, teeth46, teeth45, teeth44, teeth43, teeth42, teeth41,
    teeth31, teeth32, teeth33, teeth34, teeth35, teeth36, teeth37, teeth38
  ]);

  const [isDrawing, setIsDrawing] = useState(false);
  const [strokeColor, setStrokeColor] = useState('#f54242'); // Default stroke color
  const [brushWidth, setBrushWidth] = useState(8);
  const [image, setImage] = useState(null);

  useEffect(() => {
      // Load image when component mounts
      const loadImage = async () => {
          try {
              const img = new Image();
              img.src = teethArray[index];
              img.onload = () => {
                  setImage(img);
              };
          } catch (error) {
              console.error('Error loading image:', error);
          }
      };

      loadImage();
  }, []);

  const startDrawing = (e) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ctx.beginPath();
      ctx.moveTo(x, y);
      setIsDrawing(true);
  };

  const draw = (e) => {
      if (!isDrawing) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ctx.lineTo(x, y);
      ctx.lineWidth = brushWidth; // Adjust the line width here (5 pixels in this case)
      ctx.strokeStyle = strokeColor; // Set stroke color
      ctx.lineJoin = 'round'; // Set line join to round for rounded corners
      ctx.lineCap = 'round';
      ctx.stroke();
  };

  const endDrawing = () => {
      setIsDrawing(false);
  };

  const clearDrawing = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const img = new Image();
      const newTeeth = [...teethArray];

      if(isTopTeeth){
        img.src = upperTeeth[index];
        newTeeth[index] = upperTeeth[index];
      } else{
        img.src = lowerTeeth[index];
        newTeeth[index] = lowerTeeth[index];
      }
      img.onload = () => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };

      setTeethArray(newTeeth);

  };

  const handleColorChange = (e) => {
      setStrokeColor(e);
  };

  const handleWidthChange = (e) => {
    setBrushWidth(e.target.value);
};

  return (
      <div className='teeth-popup'>
        <div id='teeth-canvas'>
          <canvas
                ref={canvasRef}
                width={300} // Set your desired width
                height={600} // Set your desired height
                style={{ border: '1px solid black' }} // Add border for visibility
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={endDrawing}
            ></canvas>
        </div>
          <div className='tools'>

            <div className='color-picker'>
              <div
                className="color-box red"
                onClick={() => handleColorChange("#f54242")}
              ></div>
              <div
                className="color-box blue"
                onClick={() => handleColorChange("#4287f5")}
              ></div>
              <div
                className="color-box green"
                onClick={() => handleColorChange("#42f569")}
              ></div>
            </div>

            <input type="range" min="4" max="12" step="2" value={brushWidth} onChange={handleWidthChange}/>
            <button onClick={clearDrawing}>Clear</button>
          </div>

          {image && (
                <img
                    src={image.src}
                    alt="Image"
                    style={{ display: 'none' }}
                    onLoad={() => {
                        const canvas = canvasRef.current;
                        if (!canvas) return;

                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                    }}
                />
          )}
      </div>
  );
}

function Chart(
    {
    treatmentPlanValuesArrayTop, setTreatmentPlanValuesArrayTop,
    treatmentPlanValuesArrayBottom, setTreatmentPlanValuesArrayBottom,
    lesionStatusValuesArrayTop, setLesionStatusValuesArrayTop,
    lesionStatusValuesArrayBottom, setLesionStatusValuesArrayBottom,
    icdasValuesArrayTop, setIcdasValuesArrayTop,
    icdasValuesArrayBottom, setIcdasValuesArrayBottom,
    existingConditionTop, setExistingConditionTop,
    existingConditionBottom, setExistingConditionBottom,
    upperTeeth, setUpperTeeth, lowerTeeth, setLowerTeeth
    }
  ){
  const [cookies, setCookie] = useCookies(['latest_patient_id']);
  const treatmentPlans = [" ", "N", "T"];
  const lesionStatus = [" ", "+", "-"];
  const icdasCode = [" ", "0", "A", "B", "C"]; /* R for restoration */
  
  const [buttonPopup, setButtonPopup] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [boxType, setBoxType] = useState("");

  const canvasRefExistingCondition = useRef(null);
  const canvasRefTeeth = useRef(null);

  function blobToDataURL(blob, callback) {
    var reader = new FileReader();
    reader.onload = function(e) {
      callback(e.target.result);
    };
    reader.readAsDataURL(blob);
  }

  const convertCanvasesToBlob = (canvas) => {
    // Convert the canvas to a data URL
    const dataUrl = canvas.toDataURL();

    // Create a new Blob object from the data URL
    const blob = new Blob([dataUrl], { type: 'image/png' });

    // Log the Blob to the console
    //console.log(blob);
    blobToDataURL(blob, function(dataurl) {
      //console.log("DATA URL NA GALING SA BLOB : "+dataurl); // Logs the DataURL of the blob
    });
  };

  function removeLeadingZeros(numberString) {
      if (/^\d{4}$/.test(numberString)) {
          return parseInt(numberString, 10).toString();
      } else {
          console.error("Invalid input. Please enter a 4-digit number.");
          return null;
      }
  }

  const saveDrawing = () => {
    const canvas1 = canvasRefExistingCondition.current;
    const canvas2 = canvasRefTeeth.current;

    if (!(canvas1 && canvas2)) return;

    let dataUrl1 = '';
    let dataUrl2 = '';
    dataUrl1 = canvas1.toDataURL();
    dataUrl2 = canvas2.toDataURL();
    //console.log("url of EC "+dataUrl1);
    //console.log("url of teeth "+dataUrl2);
    convertCanvasesToBlob(canvas1);
    convertCanvasesToBlob(canvas2);
    let newArray =[];

    switch (boxType) {

      case 'top':
        newArray = [...existingConditionTop];
        newArray[currentIndex] = dataUrl1;
        setExistingConditionTop(newArray);

        newArray = [...upperTeeth];
        newArray[currentIndex] = dataUrl2;
        setUpperTeeth(newArray);
        break;

      case 'bottom':
        newArray = [...existingConditionBottom];
        newArray[currentIndex] = dataUrl1;
        setExistingConditionBottom(newArray);

        newArray = [...lowerTeeth];
        newArray[currentIndex] = dataUrl2;
        setLowerTeeth(newArray);
        break;

      default:
        break;
    }
  };

  const handleSquareClick = (index, type) => {

    setButtonPopup(true);

    switch (type) {

      case 'top':
        setBoxType("top");
        break;

      case 'bottom':
        setBoxType("bottom");
        break;

      default:
        break;
    }
    setCurrentIndex(index);
  };


  return (
    <div className='component-container'>
      <h2>Dental Status Chart</h2>
    <div className="chart-container">
      <div id='container-wrapper'>
        <div className="container">
          <div id="treatment-plan">
            <svg viewBox="0 0 120 45" id='label'>
              <g id="buttons">
                <polygon points="0,0 120,0 120,45 0,45"/>
                <text x="10" y="20" textAnchor="left" fill="black" fontSize="12" >Treatment Plan:</text>
                <text x="10" y="33" textAnchor="left" fill="black" fontSize="12" >NOC or TPOC</text>
              </g>
            </svg>
            {[...Array(16)].map((_, index) => (
              <Square key={index} options={treatmentPlans} onclick={() => handleSquareClick(index, 'top')} values={treatmentPlanValuesArrayTop[index]}/>
            ))}
          </div>
        </div>

        <div className="container">
          <div id="lesion-status">
            <svg viewBox="0 0 120 45" id='label'>
              <g id="buttons">
                <polygon points="0,0 120,0 120,45 0,45"/>
                <text x="10" y="20" textAnchor="left" fill="black" fontSize="12" >Lesion Status:</text>
                <text x="10" y="33" textAnchor="left" fill="black" fontSize="12" >(+) or (-)</text>
              </g>
            </svg>
            {[...Array(16)].map((_, index) => (
              <Square key={index} options={lesionStatus} onclick={() => handleSquareClick(index, 'top')} values={lesionStatusValuesArrayTop[index]}/>
            ))}
          </div>
        </div>

        <div className="container">
          <div id="icdas-code">
            <svg viewBox="0 0 120 45" id='label'>
              <g id="buttons">
                <polygon points="0,0 120,0 120,45 0,45"/>
                <text x="10" y="20" textAnchor="left" fill="black" fontSize="12" >ICDAS Code:</text>
                <text x="7" y="33" textAnchor="left" fill="black" fontSize="10" >0, A, B, C, Restoration</text>
              </g>
            </svg>
            {[...Array(16)].map((_, index) => (
              <Square key={index} options={icdasCode} onclick={() => handleSquareClick(index, 'top')} values={icdasValuesArrayTop[index]}/>
            ))}
          </div>
        </div>

        <div className="existingCondition-container">
          <div id="existing-condition">
            <svg viewBox="0 0 120 30" id='existingCondition-label'>
              <g id="buttons">
                <polygon points="0,0 120,0 120,30 0,30"/>
                <text x="10" y="20" textAnchor="left" fill="black" fontSize="12" >Existing Condition</text>
              </g>
            </svg>
            {[...Array(16)].map((_, index) => (
              <svg viewBox="0 0 80 30" key={index} onClick={() =>handleSquareClick(index, 'top')}>
                <g id="buttons">
                  <polygon points="0,0 80,0 80,30 0,30"/>
                </g>
                <image href={existingConditionTop[index]} x="2" y="2" style={{ width: "95%", height: "95%"}} />

              </svg>
            ))}
          </div>
        </div>

        <div className="teeth-container">
          <div id="teeth">
            <svg viewBox="0 0 120 160" id='teeth-label'>
              <g id="buttons">
                <polygon points="0,0 120,0 120,160 0,160"/>
                <text x="10" y="50" textAnchor="left" fill="black" fontSize="12" >Facial</text>
                <text x="10" y="90" textAnchor="left" fill="black" fontSize="12" >Occlusal</text>
                <text x="10" y="130" textAnchor="left" fill="black" fontSize="12" >Palatal</text>
              </g>
            </svg>
            {[...Array(7)].map((_, index) => (
              <svg className='upperTeeth' viewBox="0 0 80 160" key={index} onClick={() =>handleSquareClick(index, 'top')} >
                <g id="buttons">
                  <polygon points="0,0 80,0 80,160 0,160"/>
                  <polygon points ="0,159 80,159"/>
                </g>
                <image href={upperTeeth[index]} style={{ width: 75, height: 150 }} x="2.5" y="5"/>
              </svg>
            ))}

            <svg className='upperTeeth' viewBox="0 0 80 160" onClick={() =>handleSquareClick(7, 'top')} >
                <g id="buttons">
                  <polygon points="0,0 80,0 80,160 0,160"/>
                  <polygon points ="0,159 80,159"/>
                  <polygon points ="79,0 79,160"/>
                </g>
                <image href={upperTeeth[7]} style={{ width: 75, height: 150 }} x="2.5" y="5"/>
              </svg>
              <svg className='upperTeeth' viewBox="0 0 80 160" onClick={() =>handleSquareClick(8, 'top')} >
                <g id="buttons">
                  <polygon points="0,0 80,0 80,160 0,160"/>
                  <polygon points ="0,159 80,159"/>
                  <polygon points ="1,0 1,160"/>
                </g>
                <image href={upperTeeth[8]} style={{ width: 75, height: 150 }} x="2.5" y="5"/>
              </svg>
              
              {[...Array(7)].map((_, index) => (
              <svg className='upperTeeth' viewBox="0 0 80 160" key={index+9} onClick={() =>handleSquareClick(index+9, 'top')} >
                <g id="buttons">
                  <polygon points="0,0 80,0 80,160 0,160"/>
                  <polygon points ="0,159 80,159"/>
                </g>
                <image href={upperTeeth[index+9]} style={{ width: 75, height: 150 }} x="2.5" y="5"/>
              </svg>
            ))}
          </div>
        </div>

        <div className="teeth-container">
          <div id="teeth">
            <svg className='lowerTeeth' viewBox="0 0 120 160" id='teeth-label'>
              <g id="buttons">
                <polygon points="0,0 120,0 120,160 0,160"/>
                <text x="10" y="40" textAnchor="left" fill="black" fontSize="12" >Lingual</text>
                <text x="10" y="80" textAnchor="left" fill="black" fontSize="12" >Occlusal</text>
                <text x="10" y="120" textAnchor="left" fill="black" fontSize="12" >Facial</text>
              </g>
            </svg>

            {[...Array(7)].map((_, index) => (
              <svg className='lowerTeeth' viewBox="0 0 80 160" key={index} onClick={() =>handleSquareClick(index, 'bottom')}>
                <g id="buttons">
                  <polygon points="0,0 80,0 80,160 0,160"/>
                  <polygon points ="0,1 80,1"/>
                </g>
                <image href={lowerTeeth[index]} style={{ width: 75, height: 150 }} x="2.5" y="5"/>
              </svg>
            ))}

              <svg className='lowerTeeth' viewBox="0 0 80 160" onClick={() =>handleSquareClick(7, 'bottom')}>
                <g id="buttons">
                  <polygon points="0,0 80,0 80,160 0,160"/>
                  <polygon points ="0,1 80,1"/>
                  <polygon points ="79,0 79,160"/>
                </g>
                <image href={lowerTeeth[7]} style={{ width: 75, height: 150 }} x="2.5" y="5"/>
              </svg>
              <svg className='lowerTeeth' viewBox="0 0 80 160" onClick={() =>handleSquareClick(8, 'bottom')}>
                <g id="buttons">
                  <polygon points="0,0 80,0 80,160 0,160"/>
                  <polygon points ="0,1 80,1"/>
                  <polygon points ="1,0 1,160"/>
                </g>
                <image href={lowerTeeth[8]} style={{ width: 75, height: 150 }} x="2.5" y="5"/>
              </svg>

            {[...Array(7)].map((_, index) => (
              <svg className='lowerTeeth' viewBox="0 0 80 160" key={index+9} onClick={() =>handleSquareClick(index+9, 'bottom')}>
                <g id="buttons">
                  <polygon points="0,0 80,0 80,160 0,160"/>
                  <polygon points ="0,1 80,1"/>
                </g>
                <image href={lowerTeeth[index+9]} style={{ width: 75, height: 150 }} x="2.5" y="5"/>
              </svg>
            ))}

          </div>
        </div>

        <div className="existingCondition-container">
          <div id="existing-condition">
            <svg viewBox="0 0 120 30" id='existingCondition-label'>
              <g id="buttons">
                <polygon points="0,0 120,0 120,30 0,30"/>
                <text x="10" y="20" textAnchor="left" fill="black" fontSize="12" >Existing Condition</text>
              </g>
            </svg>
            {[...Array(16)].map((_, index) => (
              <svg viewBox="0 0 80 30" key={index} onClick={() =>handleSquareClick(index, 'bottom')}>
                <g id="buttons">
                  <polygon points="0,0 80,0 80,30 0,30"/>
                </g>
                <image href={existingConditionBottom[index]} x="2" y="2" style={{ width: "95%", height: "95%" }} />

              </svg>
            ))}
          </div>
        </div>

        <div className="container">
          <div id="icdas-code">
            <svg viewBox="0 0 120 45" id='label'>
              <g id="buttons">
                <polygon points="0,0 120,0 120,45 0,45"/>
                <text x="10" y="20" textAnchor="left" fill="black" fontSize="12" >ICDAS Code:</text>
                <text x="7" y="33" textAnchor="left" fill="black" fontSize="10" >0, A, B, C, Restoration</text>
              </g>
            </svg>
            {[...Array(16)].map((_, index) => (
              <Square key={index} options={icdasCode} onclick={() => handleSquareClick(index, 'bottom')} values={icdasValuesArrayBottom[index]}/>
            ))}
          </div>
        </div>

        <div className="container">
          <div id="lesion-status">
            <svg viewBox="0 0 120 45" id='label'>
              <g id="buttons">
                <polygon points="0,0 120,0 120,45 0,45"/>
                <text x="10" y="20" textAnchor="left" fill="black" fontSize="12" >Lesion Status:</text>
                <text x="10" y="33" textAnchor="left" fill="black" fontSize="12" >(+) or (-)</text>
              </g>
            </svg>
            {[...Array(16)].map((_, index) => (
              <Square key={index} options={lesionStatus} onclick={() => handleSquareClick(index, 'bottom')} values={lesionStatusValuesArrayBottom[index]}/>
            ))}
          </div>
        </div>

        <div className="container">
          <div id="treatment-plan">
            <svg viewBox="0 0 120 45" id='label'>
              <g id="buttons">
                <polygon points="0,0 120,0 120,45 0,45"/>
                <text x="10" y="20" textAnchor="left" fill="black" fontSize="12" >Treatment Plan:</text>
                <text x="10" y="33" textAnchor="left" fill="black" fontSize="12" >NOC or TPOC</text>
              </g>
            </svg>
            {[...Array(16)].map((_, index) => (
              <Square key={index} options={treatmentPlans} onclick={() => handleSquareClick(index, 'bottom')} values={treatmentPlanValuesArrayBottom[index]}/>
            ))}
          </div>
        </div>


      </div>

      <Popup trigger={buttonPopup} setTrigger={setButtonPopup} saveDrawing={saveDrawing}>

        {boxType === 'top' ? (
          <div>
            <div className='popop-subcontainer'>
              <span className='popup-label'>Treatment Plan: NOC (N) or TPOC (T)</span>
              <BigSquare options={treatmentPlans} values={treatmentPlanValuesArrayTop[currentIndex]} 
                          index={currentIndex} setValuesArray={setTreatmentPlanValuesArrayTop} />
            </div>

            <div className='popop-subcontainer'>
              <span className='popup-label'>Lesion Status: (+) or (-)</span>
              <BigSquare options={lesionStatus} values={lesionStatusValuesArrayTop[currentIndex]}
                        index={currentIndex} setValuesArray={setLesionStatusValuesArrayTop} />
            </div>

            <div className='popop-subcontainer'>
              <span className='popup-label'>ICDAS Code: 0, A, B, C, Restoration</span>
              <BigSquare options={icdasCode} values={icdasValuesArrayTop[currentIndex]}
                        index={currentIndex} setValuesArray={setIcdasValuesArrayTop} />
            </div>

            <div className='popop-subcontainer'>
              <span className='popup-label'>Existing Condition</span>
              <ExistingConditionSquare ECArray={existingConditionTop}
                                    index={currentIndex}
                                    setECArray={setExistingConditionTop}
                                    canvasRef={canvasRefExistingCondition}/>
            </div>

            <div id='existingCondition-legend'>
              <div>Existing Condition Legend:</div>
              <div id='legend-content'>
                <div className='legendContent-text'>Red Ink: {String.fromCharCode(11096)} - restorable     / - non-restorable</div>
                <div className='legendContent-text'>Green Ink: Recurrent caries </div>
                <div className='legendContent-text'>Blue Ink: </div>
                <div id='blueInk-content'>
                  <div id='left-blueInk-content-column'>
                    <div>Am - Amalgam</div>
                    <div>Co - Composite</div>
                    <div>GI - Glass Ionomer</div>
                    <div>TF - Temporary Filling</div>
                    <div>CD - Complete Denture</div>
                    <div>SD - Single Denture</div>
                    <div>RPD - Removable Partial Denture</div>
                    <div>{String.fromCharCode(8593)} or {String.fromCharCode(8595)} - Extrusion or Intrusion</div>
                    <div>{String.fromCharCode(8592)} or {String.fromCharCode(8594)} - Mesial or Distal Drifting</div>
                    <div>{String.fromCharCode(8634)} - Rotation</div>
                    <div>PCC - Post Core Crown</div>
                    <div>RCT - Root Canal Treatment</div>
                    <div>PFS - Pit and Fissure Sealant</div>
                  </div>
                  <div id='right-blueInk-content-column'>
                    <div>{String.fromCharCode(10005)} - Extracted</div>
                    <div>GI - Glass Ionomer</div>
                    <div>M - Missing</div>
                    <div>UE - Unerupted</div>
                    <div>IMP - Impacted</div>
                    <div>PFM - Porcelain Fused to Metal</div>
                    <div>CMR - Cast Metal Restoration</div>
                    <div>AC- Acrylic Crown</div>
                    <div>MC - Metal Crown</div>
                    <div>Coc - Composite Crown</div>
                    <div>Cec - Ceramic Crown</div>
                    <div>*Others: ______________</div>
                  </div>
                </div>
              </div>

            </div>

            <div className='popop-subcontainer'>
              <TeethPopup teethArray={upperTeeth} 
                        setTeethArray={setUpperTeeth} 
                        index={currentIndex} 
                        isTopTeeth={true} 
                        canvasRef={canvasRefTeeth}/>
            </div>

          </div>

        ):

        boxType === 'bottom' ? (

          <div>

            <div className='popop-subcontainer'>
              <TeethPopup teethArray={lowerTeeth} 
                        setTeethArray={setLowerTeeth} 
                        index={currentIndex} 
                        isTopTeeth={false} 
                        canvasRef={canvasRefTeeth}/>
            </div>

            <div className='popop-subcontainer'>
              <span className='popup-label'>Existing Condition</span>
              <ExistingConditionSquare ECArray={existingConditionBottom}
                                    index={currentIndex}
                                    setECArray={setExistingConditionBottom}
                                    canvasRef={canvasRefExistingCondition}/>
            </div>

            <div id='existingCondition-legend'>
              <div>Existing Condition Legend:</div>
              <div id='legend-content'>
                <div className='legendContent-text'>Red Ink: {String.fromCharCode(11096)} - restorable     / - non-restorable</div>
                <div className='legendContent-text'>Green Ink: Recurrent caries </div>
                <div className='legendContent-text'>Blue Ink: </div>
                <div id='blueInk-content'>
                  <div id='left-blueInk-content-column'>
                    <div>Am - Amalgam</div>
                    <div>Co - Composite</div>
                    <div>GI - Glass Ionomer</div>
                    <div>TF - Temporary Filling</div>
                    <div>CD - Complete Denture</div>
                    <div>SD - Single Denture</div>
                    <div>RPD - Removable Partial Denture</div>
                    <div>{String.fromCharCode(8593)} or {String.fromCharCode(8595)} - Extrusion or Intrusion</div>
                    <div>{String.fromCharCode(8592)} or {String.fromCharCode(8594)} - Mesial or Distal Drifting</div>
                    <div>{String.fromCharCode(8634)} - Rotation</div>
                    <div>PCC - Post Core Crown</div>
                    <div>RCT - Root Canal Treatment</div>
                    <div>PFS - Pit and Fissure Sealant</div>
                  </div>
                  <div id='right-blueInk-content-column'>
                    <div>{String.fromCharCode(10005)} - Extracted</div>
                    <div>GI - Glass Ionomer</div>
                    <div>M - Missing</div>
                    <div>UE - Unerupted</div>
                    <div>IMP - Impacted</div>
                    <div>PFM - Porcelain Fused to Metal</div>
                    <div>CMR - Cast Metal Restoration</div>
                    <div>AC- Acrylic Crown</div>
                    <div>MC - Metal Crown</div>
                    <div>Coc - Composite Crown</div>
                    <div>Cec - Ceramic Crown</div>
                    <div>*Others: ______________</div>
                  </div>
                </div>
              </div>
              <div className='legend-content'>-</div>

            </div>

            <div className='popop-subcontainer'>
              <span className='popup-label'>ICDAS Code: 0, A, B, C, Restoration</span>
              <BigSquare options={icdasCode} values={icdasValuesArrayBottom[currentIndex]}
                        index={currentIndex} setValuesArray={setIcdasValuesArrayBottom} />
            </div>

            <div className='popop-subcontainer'>
              <span className='popup-label'>Lesion Status: (+) or (-)</span>
              <BigSquare options={lesionStatus} values={lesionStatusValuesArrayBottom[currentIndex]}
                        index={currentIndex} setValuesArray={setLesionStatusValuesArrayBottom} />
            </div>

            <div className='popop-subcontainer'>
              <span className='popup-label'>Treatment Plan: NOC (N) or TPOC (T)</span>
              <BigSquare options={treatmentPlans} values={treatmentPlanValuesArrayBottom[currentIndex]} 
                          index={currentIndex} setValuesArray={setTreatmentPlanValuesArrayBottom} />
            </div>

          </div>


        ):

        ""

        }

      </Popup>
      {/* <div id='save-chart-btn'> 
        <button className='patientBtn' onClick={handleSaveChart}> Save </button> 
      </div> */}
      
    </div>
    </div>

    
  );
}

export default Chart;
