import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import auth from './auth'


const store = new Vuex.Store({
    plugins:[
        createPersistedState()
    ],
    modules:{
        auth
    }
})

export default store