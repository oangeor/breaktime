import {createLocalStore} from "../../utils/local-store";

const localStore = createLocalStore()
const state = {
  workRounds: parseInt(localStore.get('workRounds')),
  round: 1,
  timeLongBreak: parseInt(localStore.get('timeLongBreak')),
  timeShortBreak: parseInt(localStore.get('timeShortBreak')),
  timeWork: parseInt(localStore.get('timeWork')),
  currentBreak: 'work',//show-break long-break
};

const getters = {
  currentBreak() {
    return state.currentBreak;
  },
  timeLongBreak() {
    return state.timeLongBreak
  },
  timeShortBreak() {
    return state.timeShortBreak
  },
  timeWork() {
    return state.timeWork
  },
  round() {
    return state.round
  },
  workRounds() {
    return state.workRounds
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
        break;
      case 'time-long-break':
        state.timeLongBreak = value;
        break;
      case 'time-short-break':
        state.timeShortBreak = value;
        break;
      case 'work-rounds':
        state.workRounds = value;
        break;
    }

  },


  SET_CURRENT_BREAK(state, payload) {
    console.log("set_current_break+  " + payload)
    state.currentBreak = payload;
    if (payload === 'short-break') {
      state.round += 1
    } else if (payload === 'long-break' && state.round > state.workRounds) {
      state.round = 1;
    }
  }
  // RESET_TIME(state, payload) {
  //   state.timeWork = payload.timeWork
  //   state.timeShortBreak = payload.timeShortBreak
  //   state.timeLongBreak = payload.timeLongBreak
  // }
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
        case 'work-rounds':
          localStore.set('workRounds', value);
          break;


      }
    },
    setCurrentBreak({commit}, payload) {
      commit('SET_CURRENT_BREAK', payload)
    }
    // resetTime({commit}) {
    //   const timeLongBreak = localStore.get('timeLongBreak')
    //   const timeShortBreak = localStore.get('timeShortBreak')
    //   const timeWork = localStore.get('timeWork')
    //   const newState = {
    //     timeLongBreak,
    //     timeShortBreak,
    //     timeWork
    //   };
    //   commit('RESET_TIME', newState)
    // }
  }
;

export default {
  state,
  getters,
  mutations,
  actions
}
