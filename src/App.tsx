import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './pages/main/main'
import Login from './pages/login/login'
import Register from './pages/register/register'
import axios from 'axios'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

axios.defaults.baseURL = "https://lobster-app-osqfh.ondigitalocean.app";

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}/> 
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
