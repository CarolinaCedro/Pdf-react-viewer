import React, { useState } from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import pdfDocument from '../src/pdf/pdfDocument.pdf';
import { MdOutlineDeveloperMode } from 'react-icons/md';

import './App.css';

const App = () => {
  const [pdfDefault] = useState(pdfDocument);
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileError, setPdfFileError] = useState('');
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [viewPdf, setViewPdf] = useState(null);

  const fileType = ['application/pdf'];
  const handlePdfFileChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfFile(e.target.result);
          setPdfFileError('');
        };
      } else {
        setPdfFile(null);
        setPdfFileError('Por favor selecione um arquivo válido');
      }
    } else {
      console.log('Selecione seu arquivo');
    }
  };

  const handlePdfFileSubmit = (e) => {
    e.preventDefault();
    if (pdfFile !== null) {
      setViewPdf(pdfFile);
    } else {
      setViewPdf(null);
    }
  };

  return (
    <>
      <div className="container">
        <header>
          <h4>Visualizador de PDF</h4>
        </header>

        <form className="view" onSubmit={handlePdfFileSubmit}>
          <h3>Procure o pdf que deseja visualizar</h3>
          <fieldset>
            <input type="file" required onChange={handlePdfFileChange} />
            {pdfFileError && <div className="error-msg">{pdfFileError}</div>}
            <button type="submit" className="btn first">
              UPLOAD
            </button>
          </fieldset>
        </form>

        <div className="viewPdf">
          {viewPdf && (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.js">
              <div
                style={{
                  height: '750px',
                  width: '900px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <Viewer
                  fileUrl={viewPdf}
                  plugins={[defaultLayoutPluginInstance]}
                />
              </div>
            </Worker>
          )}
          {!viewPdf && <>Nenhum PDF Selecionado </>}
        </div>
        <footer>
          <p className="Developer">
            <MdOutlineDeveloperMode size={20} color="white" />
            Desenvolvido por
            <a href="https://linktr.ee/CarolinaCedro"> Carolina Cedro</a>
          </p>
        </footer>
      </div>
    </>
  );
};

export default App;
