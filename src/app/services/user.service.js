import httpService from "./http.service";
import localStorageSrevice from "./localStorage.service";

const userEndpoint = "user/";

const userService = {
    get: async () => {
        const { data } = await httpService.get(userEndpoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(userEndpoint + payload._id, payload);
        return data;
    },
    getCurrentUser: async () => {
        const { data } = await httpService.get(
            userEndpoint + localStorageSrevice.getUserID()
        );
        return data;
    },
    updateCurrentUser: async (payload) => {
        const { data } = await httpService.patch(userEndpoint + payload._id, payload);
        return data;
    }
};
export default userService;
