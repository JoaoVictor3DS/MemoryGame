import PropTypes from "prop-types";

export const Container = ({ children }) => {
	Container.propTypes = {
		children: PropTypes.any,
	}.isRequired;
	return <section className="Container">{children}</section>;
};
