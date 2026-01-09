import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './pages/Layout'
import Feed from './pages/visitor/Feed'


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
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
