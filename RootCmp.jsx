const { useState } = React

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./pages/About.jsx"
import { Home } from "./pages/Home.jsx"
import { BooksIndex } from "./pages/BooksIndex.jsx"

export function App() {
    const [page, setPage] = useState('book')
    return (
        <section className="app">
            <AppHeader onSetPage={ (page) => setPage(page)}/>

            <main className="main-layout">
               {page === 'home' && <Home/>}
               {page === 'about' && <About/>}
               {page === 'book' && <BooksIndex/>}

            </main>
        </section>
    )
}

