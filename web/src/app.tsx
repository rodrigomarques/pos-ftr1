import 'react-toastify/dist/ReactToastify.css';

import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from './lib/react-query.ts'
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home/index.tsx';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer position="bottom-right" autoClose={3000} />
      <Home />
    </QueryClientProvider>

  )
}

export default App
