import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Victory } from "./pages/Victory";
import { BasePage } from "./pages/BasePage";
import { Home } from "./pages/Home";
import { Page404 } from "./pages/Page404";

export const AppRoutes = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<BasePage />}>
					<Route index element={<Home />}></Route>
					<Route path="/victory" element={<Victory />}></Route>
					<Route path="*" element={<Page404 />}></Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
};
