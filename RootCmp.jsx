const { useState } = React
const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM


import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./pages/About.jsx"
import { Home } from "./pages/Home.jsx"
import { BooksIndex } from "./pages/BooksIndex.jsx"

export function App() {

    const [page, setPage] = useState('book')

   

    return (
        <Router>
        <section className="app">
            <header>
                <AppHeader />
            </header>

            <main className="main-layout">
                <Routes>
                <Route path="/" element={<Home />} />                </Routes>
            </main>
        </section>
        </Router>
    )
}

