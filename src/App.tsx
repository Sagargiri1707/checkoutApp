import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import { GlobalAppContext } from './Context/Context'
import initVal from './Constants/CheckoutApiResponse.json'
const App: React.FC = () => {
  const [checkedState,setCheckedState] = Array(initVal.productData.length).fill(false)
  function changeCheckedState(index){
    setCheckedState(checkedState.map((state,id)=>{
      if(id===index) return !state
      else return state
    }))
  }
  return (
    <BrowserRouter>
      <Navbar />
      <GlobalAppContext.Provider value={{ initVal, checkedState, changeCheckedState }}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </GlobalAppContext.Provider>
     
    </BrowserRouter>
  );
};

export default App;
