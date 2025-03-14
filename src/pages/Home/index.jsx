import { Card } from '../../components/Card'
import pon from '../../../public/pieces/pon.svg'
import { GameBoard } from '../../components/GameBoard'

import './Home.module.css'

export const Home = () => {
    return (
        <div>
            <h1>Welcome to My Chess Memory Game</h1>
            <div>
                <GameBoard />
            </div>
        </div>
    )
}