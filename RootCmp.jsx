const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./pages/About.jsx"
import { Home } from "./pages/Home.jsx"
import { BooksIndex } from "./pages/BooksIndex.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { BookEdit } from "./pages/BookEdit.jsx"

export function App() {
 
    return (
        <Router>
        <section className="app">
            <header> 
                <AppHeader />
            </header>
           
            <main className="main-layout">
            <Routes>
            <Route path="/" element={<Navigate to="/home"/>} /> 
            <Route path="/home" element={<Home />} /> 
            <Route path="/about" element={<About />} /> 

           
            <Route path="/book" element={<BooksIndex />} />  
            <Route path="/book/:bookId" element={<BookDetails />} />
            <Route path="/book/edit/:bookId" element={<BookEdit />} />
            </Routes>
   
            </main>
        </section>
        </Router>
    )
}

