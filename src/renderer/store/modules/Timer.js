import {createLocalStore} from "../../utils/local-store";

const localStore = createLocalStore()
const state = {
  round: 1,
  timeLongBreak: parseInt(localStore.get('timeLongBreak')),
  timeShortBreak: parseInt(localStore.get('timeShortBreak')),
  timeWork: parseInt(localStore.get('timeWork')),
  currentRound: 'short-break',//show-break long-break
};

const getters = {
  currentRound() {
    return state.currentRound;
  },
  timeLongBreak() {
    return state.timeLongBreak
  },
  timeShortBreak() {
    return state.timeShortBreak
  },
  timeWork() {
    return state.timeWork
  }
};

const mutations = {
  SET_TIME(state, payload) {
    //{key:'time-work', value:10}
    const key = payload.key;
    const value = parseInt(payload.value);
    switch (key) {
      case 'time-work':
        state.timeWork = value;
        console.log(state)

        break;
      case 'time-long-break':
        state.timeLongBreak = value;
        break;
      case 'time-short-break':
        state.timeShortBreak = value;
        break;
    }
  },
  RESET_TIME(state, payload) {
    state.timeWork = payload.timeWork
    state.timeShortBreak = payload.timeShortBreak
    state.timeLongBreak = payload.timeLongBreak
  }
};

const actions = {
    setTime({commit}, payload) {
      commit('SET_TIME', payload);
      const key = payload.key;

      const value = payload.value;
      switch (key) {
        case 'time-work':
          localStore.set('timeWork', value);
          break;
        case 'time-long-break':
          localStore.set('timeLongBreak', value);
          break;
        case 'time-short-break':
          localStore.set('timeShortBreak', value);
          break;
      }
    },
    resetTime({commit}) {
      localStore.reload();
      const timeLongBreak = localStore.get('timeLongBreak')
      const timeShortBreak = localStore.get('timeShortBreak')
      const timeWork = localStore.get('timeWork')
      const newState = {
        timeLongBreak,
        timeShortBreak,
        timeWork
      };
      commit('RESET_TIME', newState)
    }
  }
;

export default {
  state,
  getters,
  mutations,
  actions
}
