import Main from './main';
import Basket from './basket';
import useSelector from '../store/use-selector';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Product from './product';
import Error from './error';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/products/:productId" element={<Product />} />
        <Route path="*" element={<Error />} />
      </Routes>
      {activeModal === 'basket' && <Basket />}
    </BrowserRouter>
  );
}

export default App;
