import logo from './logo.svg';
import './App.css';
import {FileUploader} from "./Screens/FileUploader"
import { HtmlStringToImage } from './Screens/HTMLtoImg';
import {ImageManipulation} from "./Screens/ImageManipulation"
import {Routes,Route} from "react-router-dom";
function App() {
  return (
    <div >
       <Routes>
            <Route exact path="/" element={<FileUploader/>}/>
            <Route path='/showImage' element={<ImageManipulation />}/>
            <Route path='/showHTML' element={<HtmlStringToImage />}/>

          </Routes>
     
    </div>
  );
}

export default App;
