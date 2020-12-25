import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    users: [],
  },
  getters: {
    users: (state) => state.users,
  },
  mutations: {
    setUsers(state, data) {
      state.users = data;
    },
  },
  actions: {
    usersList({ commit }, query) {
      axios
        .get("https://jsonplaceholder.typicode.com/posts", {params: query})
        .then((response) => {
          commit("setUsers", response.data);
          console.log(response.data);
        });
    },
  },
});
