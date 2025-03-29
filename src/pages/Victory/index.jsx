export const Victory = () => {
	return (
		<div className="d-flex justify-content-center align-items-center vh-100">
			<div className="p-5 m-4 text-center bg-success bg-opacity-75 rounded-3 shadow-lg">
				<div className="display-1 fw-bold text-white">
					<p>Congratulations!</p>
				</div>
				<div className="fs-3 text-white">
					<p>You Wined!</p>
				</div>
				<div>
					<a className="btn btn-primary btn-lg mt-3" href="/">
						Restart
					</a>
				</div>
			</div>
		</div>
	);
};
