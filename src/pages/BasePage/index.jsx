import { Container } from '../../components/Container'
import { Header } from '../../components/Header'
import { Outlet } from 'react-router-dom'

export const BasePage = () => {
    return (
        <main>
            <Header />
            <Container>
                <Outlet />
            </Container>
        </main>
    )
}