import React from 'react';
import './App.css';
import Header from './components/Navbar/Header';
import MyRoutes from './MyRoutes';
import ProductContext from './context/ProductContext';
import AuthContext from './context/AuthContext';

function App() {
  return (
    <div className="App">
      <AuthContext>
        <ProductContext>        {/* context #5 */}
          <Header/>
          <MyRoutes/>
        </ProductContext>
      </AuthContext>
    </div>
  );
}

export default App;
