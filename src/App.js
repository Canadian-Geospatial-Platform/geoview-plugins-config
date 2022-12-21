import InputForm from "./components/InputForm";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Plugin from "./components/SchemaForm";
//import PopUp from  "./components/PopUps";
  //  <Route exact path="/PopUp" element={<PopUp />} />
   // <Route exact path="/PopUp" element={<PopUp />} />
   

const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route exact path="/" element={<InputForm />} />
        <Route exact path="/Plugin" element={<Plugin />} />
    
   
   

     <Route path="*" />
        <Route path="/"  />
      </Routes>
    </Router>
  );
};

export default App;
