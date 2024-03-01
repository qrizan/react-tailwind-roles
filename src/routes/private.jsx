import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types"

const PrivateRoute = (({ children }) => {
    const token = Cookies.get('token');
    return token ? children : <Navigate to="/" replace />
})

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
}

export default PrivateRoute;

