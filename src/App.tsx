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
  const textAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setsharestxt(event.target.value);
  };

  const sendMessage = async () => {
    const sss = require('shamirs-secret-sharing');
    const message = "este es el super secreto super bien guardado";
    const secreto= Buffer.from(message);
    console.log("Secreto Recibido: " + message);
    const shares: Buffer[] = sss.split(secreto, { shares: 7, threshold: 4});
    const sharesHex: string[] = [];
    shares.forEach((share: Buffer) => {
      sharesHex.push(bigintConversion.bufToHex(share));
    })
    console.log("Claves Enviadas: " + sharesHex);
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

        <button className='sendbtn' onClick={() => sendMessage()}>get shares</button>
        <textarea
        ref={textareaRef}
        style={styles.textareaDefaultStyle}
        onChange={textAreaChange}
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
    width: 400,
    height:200,
    display: "block",
    resize: "none",
    backgroundColor: "#eee",
  },
};