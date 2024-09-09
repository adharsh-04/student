import Chatbot from "../src/chatbot/Chatbot";
import FileUploadForm from "./print/FileUploadForm";
// import FileUpload from "./File/FileUpload";

function App() {
  return (
    <div className="App">
     <Chatbot/>
     {/* <FileUpload/> */}
     <FileUploadForm/>
    
    </div>
  );
}

export default App;
