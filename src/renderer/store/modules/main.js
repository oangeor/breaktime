import Store from "electron-store"
const store = new Store()
const state = {
  workRounds: store.get('workRounds') || 3,
  timeWork: store.get('timeWork') || 1,
  timeLongBreak: store.get('timeLongBreak') || 1,
  timeShortBreak: store.get('timeShortBreak') || 1,
  currentBreak: 'work',//show-break long-break
  mainSwitch: true,
  round: 1,
};


const getters = {
  workRounds() {
    return state.workRounds
  },
  timeWork() {
    return state.timeWork
  },
  timeLongBreak() {
    return state.timeLongBreak
  },
  timeShortBreak() {
    return state.timeShortBreak
  },
  currentBreak() {
    return state.currentBreak;
  },
  mainSwitch() {
    return state.mainSwitch;
  },
  round() {
    return state.round
  },
};

const mutations = {
  SET_WORK_ROUNDS(state, val) {
    state.workRounds = val
  },

  SET_TIME_WORK(state, val) {
    state.timeWork = val
  },
  SET_TIME_LONG_BREAK(state, val) {
    state.timeLongBreak = val
  },

  SET_TIME_SHORT_BREAK(state, val) {
    state.timeShortBreak = val
  },

  SET_MAIN_SWITCH(state, payload) {
    state.mainSwitch = payload
  },

  SET_CURRENT_BREAK(state, payload) {
    console.log("set_current_break" + payload)
    state.currentBreak = payload;
    if (payload === 'short-break') {
      state.round += 1
    } else if (payload === 'long-break' && state.round >= state.workRounds) {
      state.round = 1;
    }
  },
};

const actions = {

  setWorkRounds({ commit }, val) {
    commit('SET_WORK_ROUNDS', val)
    store.set('workRounds', val)
  },
  setTimeWork({ commit }, val) {
    commit('SET_TIME_WORK', val)
    store.set('timeWork', val)
  },
  setTimeLongBreak({ commit }, val) {
    commit('SET_TIME_LONG_BREAK', val)
    store.set('timeLongBreak', val)
  },
  setTimeShortBreak({ commit }, val) {
    commit('SET_TIME_SHORT_BREAK', val)
    store.set('timeShortBreak', val)
  },
  setCurrentBreak({ commit }, val) {
    commit('SET_CURRENT_BREAK', val)
  },
  setMainSwitch({ commit }, val) {
    commit('SET_MAIN_SWITCH', val)
  },








  // setTime({commit}, payload) {
  //   commit('SET_TIME', payload);
  //   const key = payload.key;
  //   const value = payload.value;
  //   switch (key) {
  //     case 'time-work':
  //       localStore.set('timeWork', value);
  //       break;
  //     case 'time-long-break':
  //       localStore.set('timeLongBreak', value);
  //       break;
  //     case 'time-short-break':
  //       localStore.set('timeShortBreak', value);
  //       break;
  //     case 'work-rounds':
  //       localStore.set('workRounds', value);
  //       break;


  //   }
  // },
  // setCurrentBreak({commit}, payload) {
  //   commit('SET_CURRENT_BREAK', payload)
  // },

  // setMainSwitch({commit}, payload){
  //   commit('SET_MAIN_SWITCH', payload);

  // }
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


  // SET_TIME(state, payload) {
  //   const key = payload.key;
  //   const value = parseInt(payload.value);
  //   switch (key) {
  //     case 'time-work':
  //       state.timeWork = value;
  //       break;
  //     case 'time-long-break':
  //       state.timeLongBreak = value;
  //       break;
  //     case 'time-short-break':
  //       state.timeShortBreak = value;
  //       break;
  //     case 'work-rounds':
  //       state.workRounds = value;
  //       break;
  //   }

  // },
}
export default {
  state,
  getters,
  mutations,
  actions
}
