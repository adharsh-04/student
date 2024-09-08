import Chatbot from "../src/chatbot/Chatbot";
import FileDownload from "./File/FileDownload";
import FileUpload from "./File/FileUpload";

function App() {
  return (
    <div className="App">
     <Chatbot/>
     <FileUpload/>
     <FileDownload/>
    </div>
  );
}

export default App;
