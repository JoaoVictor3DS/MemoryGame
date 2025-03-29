import { motion } from "framer-motion";
import unknown from "/unknown.svg";

export const Card = (props) => {
	return (
		<motion.div
			className="card-container"
			style={{
				width: "100px",
				height: "100px",
				perspective: "500px",
			}}
		>
			<motion.div
				className="card rounded-3"
				animate={{ rotateY: props.flipped ? 180 : 0 }}
				transition={{ duration: 0.5 }}
				style={{
					width: "100%",
					height: "100%",
					position: "relative",
					transformStyle: "preserve-3d",
				}}
			>
				<motion.div
					className="card-front rounded-3 bg-transparent"
					style={{
						position: "absolute",
						backfaceVisibility: "hidden",
						width: "100%",
						height: "100%",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<img src={unknown} alt="Front" width="70%" height="70%" />
				</motion.div>

				<motion.div
					className="card-back rounded-3 bg-success"
					style={{
						position: "absolute",
						backfaceVisibility: "hidden",
						transform: "rotateY(180deg)",
						width: "100%",
						height: "100%",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<img src={props.src} alt="Back" width="70%" height="70%" />
				</motion.div>
			</motion.div>
		</motion.div>
	);
};
