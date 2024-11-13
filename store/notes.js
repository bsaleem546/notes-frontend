export const state = () => ({
  notes: {},
  note: {},
});

export const mutations = {
  SET_NOTES(state, payload) {
    state.notes = payload;
  },
};

export const actions = {
  async fetchNotes({ commit }, params) {
    let response = await this.$axios.get(`/notes?page=${params.page}&search=${params.search}&pagination=no`);

    commit('SET_NOTES', response?.data?.data)
    return response;
  },

  async fetchNote({ commit }, id) {
    let response = await this.$axios.get(`/notes/${id}`)
    return response?.data?.data
  },

  async createNote({ commit }, payload) {
    await this.$axios.post(`/notes`, payload).then((response) => {
      return response;
    }).catch((error) => {
      return error;
    });

  },

  async updateNote({ commit }, payload) {
    await this.$axios.put(`/notes/${payload.id}`, payload).then((response) => {
      return response;
    }).catch((error) => {
      return error;
    });
  },

  async deleteNote({ commit }, id) {
    await this.$axios.delete(`/notes/${id}`).then((response) => {
      return response;
    }).catch((error) => {
      return error;
    });
  },
};

export const getters = {
  notes(state) {
    return state.notes;
  },
  note(state) {
    return state.note;
  },
};
