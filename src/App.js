import './App.css';
import { Suspense } from 'react';
import Router from './routes';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <Suspense fallback={null}>
    <Router/>
    <ToastContainer
position="bottom-right"
autoClose={1500}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
    </Suspense>
  );
}

export default App;
