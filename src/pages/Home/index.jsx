import { GameBoard } from "../../components/GameBoard";

import "./Home.module.css";

export const Home = () => {
	return (
		<div>
			<h1>Welcome to My Memory Game</h1>
			<div>
				<GameBoard />
			</div>
		</div>
	);
};
