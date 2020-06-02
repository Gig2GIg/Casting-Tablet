import TokenService from "../../../services/core/TokenService";

export default {
    currentUser: state => {

        if (!state.user || (state.user && Object.keys(state.user).length === 0)) {
            console.log("if");
            return TokenService.getUserData();
        } else {
            console.log("else")
            return state.user;
        }

    },
};
