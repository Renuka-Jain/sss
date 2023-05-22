import React from 'react';
import * as bigintConversion from 'bigint-conversion'
import './App.css';
import {Buffer} from 'buffer';
import { useState } from 'react';
import { useRef } from 'react';
window.Buffer = window.Buffer || Buffer;


function App() {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [sharestxt, setsharestxt] = useState<String>("");
  const [messagetxt, setmessagetxt] = useState<String>("");
  const [textareaheight, setTextareaheight] = useState(1); 


  const textAreaChange2 = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const height = event.target.scrollHeight; 
    const rows = event.target.rows;
    const rowHeight = 15; 
    const trows = Math.ceil(height / rowHeight) - 1; 
    if (trows!==textareaheight) { 
      setTextareaheight(trows); 
    } 
    
  };
 
  const textAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setmessagetxt(event.target.value);
  };
  const sendMessage = async () => {
    const sss = require('shamirs-secret-sharing');
    const secreto= Buffer.from(messagetxt);
    console.log("Secreto Recibido: " + messagetxt);
    const shares: Buffer[] = sss.split(secreto, { shares: 7, threshold: 4});
    const sharesHex: string[] = [];
    shares.forEach((share: Buffer) => {
      sharesHex.push(bigintConversion.bufToHex(share));
    })
    console.log("Claves Enviadas: " + sharesHex);
    setsharestxt(sharesHex.toString());
  }

  const restoreMessage = async () => {
    const sss = require('shamirs-secret-sharing');
    const myArray = sharestxt.split(",");
    const recovered = sss.combine(myArray);
    alert(recovered);

  }


  return (
    <div className="App">
      <header className="App-header">
      <textarea
        ref={textareaRef}
        style={styles.textareaDefaultStyle}
        onChange={textAreaChange}
        rows={2}
      ></textarea>
      <div>


      </div>
      <textarea
        value={sharestxt.replace(/,/g, ',\n')}
        style={{width: 800}}
        rows={7}
        ></textarea>
        <button className='sendbtn' onClick={() => sendMessage()}>get shares</button>

        <textarea
        ref={textareaRef}
        style={styles.textareaDefaultStyle}
        onChange={textAreaChange2}
        rows={textareaheight}
      ></textarea>
        <button className='sendbtn' onClick={() => restoreMessage()}>recover</button>

      </header>
    </div>
  );
}

export default App;

const styles: { [name: string]: React.CSSProperties } = {
  container: {
    marginTop: 50,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textareaDefaultStyle: {
    marginTop:10,
    padding: 5,
    width: 800,
   
    display: "block",
    resize: "none",
    backgroundColor: "#eee",
  },
};