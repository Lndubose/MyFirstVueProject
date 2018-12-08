import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const state = {
  data: [],
};

const mutations = {
  RECIEVE_CHARACTERS(state, { characters }) {
    state.data = characters;
  },
};

const actions = {
  async FETCH_CHARACTERS({ commit }, name) {
    const url = `http://gateway.marvel.com/v1/public/characters?name=${name}&ts=1&apikey=df53465be210cecc1102101d3e233c10&hash=73281dd4ecafe0347548e2218e320c21`;
    const { data } = await axios.get(url);
    commit('RECIEVE_CHARACTERS', { characters: data.results });
  },
};

const getters = {
  characters: state => {
    console.log(state);
    return state.data.map(data => {
      return {
        name: data.name,
        url: data.urls[1] ? data.urls[1].url : data.urls[0].url,
        image: `${data.thumbnail.path}.${data.thumbnail.extension}`,
        description:
          data.description === ''
            ? 'No description for this character'
            : data.description,
      };
    });
  },
};

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});

export default store;
