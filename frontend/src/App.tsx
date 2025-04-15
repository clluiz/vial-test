import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import { SubmitForm } from './pages/submit-form'
import { CreateForm } from './pages/create-form'
import { BadgePlus, House, NotebookText } from 'lucide-react'
import { Home } from './pages/home'

import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <nav className="font-bold bg-sky-700 w-full h-16 text-white flex items-center space-x-8 px-2">
          <a className="flex underline hover:text-sky-200 gap-x-2" href="/">
            <House /> Home
          </a>
          <a className="flex underline hover:text-sky-200 gap-x-2" href="/create-form">
            |
            <BadgePlus />
            Create new form
          </a>
          <a className="flex underline hover:text-sky-200 gap-x-2" href="/submit-form">
            |
            <NotebookText />
            Submit form
          </a>
        </nav>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-form" element={<CreateForm />} />
            <Route path="/submit-form/:form-id?" element={<SubmitForm />} />
          </Routes>
          <div className="p-5 flex-1">
            <Outlet />
          </div>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  )
}

export default App
