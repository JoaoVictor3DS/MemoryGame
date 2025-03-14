import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { About } from './pages/About'
import { BasePage } from './pages/BasePage'
import { Home } from './pages/Home'
import { Page404 } from './pages/Page404'

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<BasePage />}>
                    <Route index element={<Home />}></Route>
                    <Route path="/about" element={<About />}></Route>
                    <Route path="*" element={<Page404 />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}