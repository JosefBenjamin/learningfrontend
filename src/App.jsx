import { Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout'
import Feed from './pages/visitor/Feed'
import apiFacade from './apiFacade';
import { useState } from 'react';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(apiFacade.isLoggedIn());

  const handleLoginChange = () => {
    setIsLoggedIn(apiFacade.isLoggedIn());
  };

  return (
    <>
      <Routes>
        <Route 
          path="/" 
          element={
            <Layout 
              isLoggedIn={isLoggedIn} 
              onLoginChange={handleLoginChange} 
            />
          }
        >
          <Route index element={<Feed />} />
          <Route path="login" element={<Feed />} />
          <Route path="register" element={<Feed />} />
          <Route path="create" element={<Feed />} />
        </Route>
      </Routes>
    </>
  );
}

export default App
