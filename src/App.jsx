import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';

function App() {
  const sigCanvas = useRef(null);
  const [result, setResult] = useState(null);
  const [penColor, setPenColor] = useState('black');

  const clearHandler = () => {
    sigCanvas.current.clear();
    setResult(null);
  };

  const saveHandler = () => {
    const dataURL = sigCanvas.current.getTrimmedCanvas().toDataURL('image/jpeg');
    setResult(dataURL);
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'signature.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div>
        <h2>You can do and save your signature here- </h2>
        <h4>
          Hey, I'm Jay Masiwal, lets connect -
          <div>X- <a href="https://x.com/masiwal_jay">X/Twitter</a></div>
          Instagram- <a href="https://instagram.com/masiwal_jay">Instagram</a>
        </h4>
      </div>
      <select value={penColor} onChange={(e) => setPenColor(e.target.value)}>
        <option value="black">Black</option>
        <option value="red">Red</option>
        <option value="green">Green</option>
        <option value="yellow">Yellow</option>
      </select>
      <div style={{ height: '20px', width: '20px', borderRadius: '50%', backgroundColor: penColor, marginBottom: '10px' }}></div>
      <div style={{ width: 500, height: 300, border: '2px solid black', marginBottom: '20px' }}>
        <SignatureCanvas
          ref={sigCanvas}
          penColor={penColor}
          backgroundColor="rgba(255, 255, 255, 1)"
          canvasProps={{ width: 500, height: 300, className: 'sigCanvas' }}
        />
        <div style={{ marginTop: '10px' }}>
          <button onClick={saveHandler} style={{ marginRight: '15px' }}>Save</button>
          <button onClick={clearHandler}>Clear</button>
        </div>
        {result && (
          <div style={{ marginTop: '10px' }}>
            <img src={result} alt="signature" />
          </div>
        )}
      </div>

    </>
  );
}

export default App;
