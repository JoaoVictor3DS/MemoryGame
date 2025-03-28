import { useState } from "react";
import { motion } from "framer-motion";
import unknown from "/unknown.svg";

export const Card = (props) => {
    const [isFlipped, setIsFlipped] = useState(props.flipped);

    return (
        <motion.div
            className="card-container"
            style={{
                width: "100px",
                height: "100px",
                perspective: "500px", // Adds depth for 3D animation
            }}
        >
            <motion.div
                className="card rounded-3"
                animate={{ rotateY: props.flipped ? 180 : 0 }} // Animates the flip
                transition={{ duration: 0.5 }} // Controls the flip speed
                style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    transformStyle: "preserve-3d", // Enables 3D effect
                }}
            >
                {/* Front Side */}
                <motion.div
                    className="card-front rounded-3 bg-transparent"
                    style={{
                        position: "absolute",
                        backfaceVisibility: "hidden", // Ensures only one side is visible
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <img src={unknown} alt="Front" width="70%" height="70%" />
                </motion.div>

                {/* Back Side */}
                <motion.div
                    className="card-back rounded-3 bg-success"
                    style={{
                        position: "absolute",
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)", // Flips the back face
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