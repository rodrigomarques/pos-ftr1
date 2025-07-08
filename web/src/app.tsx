import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from './lib/react-query.ts'
import LinkShortenerPage from './LinkShortenerPage.tsx'
import { ToastContainer } from 'react-toastify';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer position="bottom-right" autoClose={3000} />
      <LinkShortenerPage />
    </QueryClientProvider>

  )
}

export default App
