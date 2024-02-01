import { useEffect, useReducer, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import { GlobalAppContext } from './Context/Context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { eventsReducer, initState } from './reducers/index';
import { fetchProductInfo } from './reducers/Actions'
import './App.css';
import { withErrorBoundary } from './HOC/errorBoundaryHoc';
import { LoaderSVG } from './Constants';
const Architecture = lazy(() => import('./Pages/Architecture'));
const TestReports = lazy(() => import('./Pages/Reports'));
const  Home = lazy(()=>import ('./Pages/Home'));

const App: React.FC = () => {
  const [state, dispatch] = useReducer(eventsReducer, initState);

  useEffect(() => {
    fetchProductInfo(dispatch)
  }, []);
  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
        role="alert"
        closeOnClick
      />
      <GlobalAppContext.Provider
        value={{
          dispatch,
          ...state,

        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<LoaderSVG/>}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/architecture"
            element={
              <Suspense fallback={<LoaderSVG/>}>
                <Architecture />
              </Suspense>
            }
          />
          <Route
            path="/report"
            element={
              <Suspense fallback={<LoaderSVG/>}>
                <TestReports />
              </Suspense>
            }
          />
        </Routes>
      </GlobalAppContext.Provider>
    </BrowserRouter>
  );
};

export default withErrorBoundary('app', App);
