import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    formSubmitted: false,
    formData: {},
  },
  getters: {},
  mutations: {
    SET_FORM_DATA: (state, formData) => {
      state.formSubmitted = true;
      state.formData = formData;
    },
  },
  actions: {
    SUBMIT_FORM: (context, formData) => {
      context.commit("SET_FORM_DATA", formData);
    },
  },
  modules: {},
});
