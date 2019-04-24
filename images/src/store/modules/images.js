import api from '../../api/imgur';
import { router } from '../../main';

const state = {
    images: []
};

const getters = {
    allImages: state => state.images
};

const actions = {
    async fetchImages({ rootState, commit }) {
        const { token } = rootState.auth;
        const response = await api.fetchImages(token);
        commit('setImages', response.data.data);
    },
    async uploadImages({ rootState }, images) {
        // Get the access token
        const { token } = rootState.auth;
        
        // Call our api module to the upload
        await api.uploadImages(images, token);
        
        // Rediret our user to ImageList component
        router.push('/');
        
    }
};


const mutations = {
    setImages: (state, images) => {
        state.images = images;
    }

};

export default {
    state,
    getters,
    actions,
    mutations
};