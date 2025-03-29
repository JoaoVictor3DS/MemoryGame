import { Container } from "../../components/Container";
import { Outlet } from "react-router-dom";

export const BasePage = () => {
	return (
		<main>
			<Container>
				<Outlet />
			</Container>
		</main>
	);
};
