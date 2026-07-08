import { useState,useEffect,useRef } from "react"
import axios from 'axios'
import jsPDF from "jspdf";

function Home(){
    const [textInput,setTextInput]=useState('');
    const [isSaved,setIsSaved]=useState(false);
    const [showResult,setShowResult]=useState(false);
    const [result,setResult]=useState(null);
    const [isPastedText,setisPastedText]=useState(0);
    const username=localStorage.getItem("username");
    
    const backSpaceScore=useRef(0);

    useEffect(() => {
     fetchSavedNote();
    }, []);

    async function fetchSavedNote() {
     try {
        const res = await axios.get(
        `http://localhost:5000/api/notes/${username}`
        );

        setTextInput(res.data.content);

     } catch (err) {
        console.error(err);
     }
    }

    const keystrokes = useRef([]);

    function handleKeyDown(e) {
     const now = Date.now();
     if(e.key==="Backspace"){
      backSpaceScore.current += 1;
     }
     keystrokes.current.push({
      key: e.key,
      time: now
     });
    }

    

    function computeMetrics() {
     const data = keystrokes.current;

     let intervals = [];
     for (let i = 1; i < data.length; i++) {
      intervals.push(data[i].time - data[i - 1].time);
     }
     if (intervals.length === 0) {
      return { avgInterval: 0 };
     }

     const avg = intervals.reduce((a, b) => a + b, 0) / intervals.length;
     

     return { avgInterval: avg };
    }

    function handlePaste(e) {
     const pastedText = e.clipboardData.getData("text");

     const pastedLength = pastedText.length;
     const totalLength = textInput.length || 1;

     const ratio = pastedLength / totalLength;

  
     if (pastedLength > 200 && ratio > 0.8) {
      setisPastedText(2);
     }

 
     else if (pastedLength > 30 && ratio > 0.4) {
      setisPastedText(1);
     }

  
     else {
      setisPastedText(0);
     }
     confidenceScore=(confidenceScore+backSpaceScore)-(isPastedText)*20
}

    async function handleSave(){
     try{
        const res = await axios.post('http://localhost:5000/api/notes/save',{
            username,
            content:textInput
        })
        console.log(res.data)
        console.log('save success')
        const metrics = computeMetrics();
        const confidence=computeConfidence(metrics);

    
        const finalResult = {
         avgInterval: metrics.avgInterval,
         aiLevel: isPastedText,
         confidence
        };

        setResult(finalResult);
        setIsSaved(true);
     }
     catch(err){
        console.error(err)
     }
    }
    function handleClearResults() {
     setResult(null);
     setIsSaved(false);
     setisPastedText(0);
     setShowResult(false);
     keystrokes.current = [];
     backSpaceScore.current = 0;
    }
    function computeConfidence(metrics){
      let score=100;
      if(isPastedText===2){
         score -=40
      }
      else if(isPastedText===1){
         score -=20;
      
      }
      if(metrics.avgInterval<80){
         score -=15
      }
      if(backSpaceScore.current>5){
         score +=10
      }
      if(score>100) score=100
      if(score<0) score=0
      return score
    }
    function handleExportPDF() {
      if (!result) return;

      const doc = new jsPDF();

      doc.setFontSize(18);
      doc.text("ViNotes Writing Authenticity Report", 20, 20,{align:'left'});

      doc.setFontSize(12);
      
      const wrappedText=doc.splitTextToSize(`Text Input: ${textInput}`,170)
      doc.text(wrappedText, 20, 30,{align:'left'});
      const nextY= 30 + (wrappedText.length*7)

      doc.text(`User: ${username}`, 20, nextY,{align:'left'});

      doc.text(
       `Average Typing Interval: ${result.avgInterval} ms`,
       20,
       (nextY+15),
       {align:'left'}
      );

      doc.text(
       `Confidence Score: ${result.confidence}/100`,
       20,
       (nextY+30),
       {align:'left'}
      );

      doc.text(
       `Pasted Text?:${
         result.aiLevel === 2
         ? "High External Content Usage"
         : result.aiLevel === 1
         ? "Suspicious Assistance"
         : "Human like Writing"
        }`,
        20,
        (nextY+45),
        {align:'left'}
      );

      doc.text(
       `Feedback: ${
         result.confidence >= 80
         ? "Highly Authentic"
         : result.confidence >= 60
         ? "Moderately Suspicious"
         : "Low Authenticity"
       }`,
       20,
       (nextY+60),
       {align:'left'}
      );

      doc.save("vinotes-report.pdf");
}

    

    return(
        <>
         <div className="center">
          <h1>ViNotes, Open Source Contribution</h1>
          <h1>By Darren Pereira</h1>
          
          <div className="card">
            <h1>Home Page</h1>
            <h2>Type below, save to see results</h2>
            
            <textarea 
            value={textInput} 
            onChange={(e)=>setTextInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            readOnly={showResult}>
            </textarea>

            <div className="buttonRow">
             {textInput && !showResult && <button onClick={handleSave}>Save</button>}
             {!showResult && result && <button onClick={() => setShowResult(true)}>Show Results</button>}
            </div>
            <div className="buttonRow"> 
             {showResult &&isSaved && result && <button onClick={handleClearResults}>Clear Results</button>}
             {showResult &&isSaved && result && <button onClick={handleExportPDF}>Export Result to PDF</button>}
            </div> 
            {showResult && <p>Clear results to continue editing</p>}
            {showResult && result && (
             <div className="apply">
              <div className="box">
                <h3>Results</h3>
                <p>Average Typing Interval: {result.avgInterval} ms</p>

                <p>
                    Pasted Text?:
                    {result.aiLevel === 2
                    ? " High text paste usage"
                    : result.aiLevel === 1
                    ? " Minimum text paste usage"
                    : " No text paste used"}
                </p>
                <p>Confidence Score: {result.confidence}</p>
                <p>
                  Feeback:
                  {
                   result.confidence >= 80
                   ? " Highly Authentic"
                   : result.confidence >= 60
                   ? " Moderately Suspicious"
                   : " Low Authenticity"
                  }
                </p>
              </div>
             </div>
            )}
          </div>
         </div>
        </>
    )
}

export default Home