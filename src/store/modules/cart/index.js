import axios from 'axios';

const state = {
    cartItems: []

}

const mutations = {
    UPDATE_CART_ITEMS(state, payload) {
        state.cartItems = payload;
    }
}

const actions = {
    getCartItems({commit}) {
        axios.get('/api/cart')
        .then((response)=>{
            commit('UPDATE_CART_ITEMS', response.data);
        });
    },

    addCartItem({commit},payload) {
        axios.post('/api/cart', payload)
            .then((response)=>{
                commit('UPDATE_CART_ITEMS', response.data);
        });
    },

    removeCartItem({commit},payload) {
        axios.post('/api/cart/delete', payload)
            .then((response)=>{
                commit('UPDATE_CART_ITEMS', response.data);
        });
    },

    removeAllCartItems({commit}) {
        axios.post('/api/cart/delete/all')
            .then((response) => {
                commit('UPDATE_CART_ITEMS', response.data)
            });
    },

    removeProductFromCart({commit}, payload) {
        axios.post('/api/cart/product/delete', payload)
            .then((response) => {
                commit('UPDATE_CART_ITEMS', response.data)
            })
    }


}

const getters = {
    cartItems: state => state.cartItems,

    cartTotal: state => {
        return state.cartItems.reduce((acc, cartItem) => {
            return (cartItem.quantity * cartItem.price) + acc;
        }, 0);
    },

    cartItemsCount: state => {
        return state.cartItems.reduce((acc, cartItem) => {
            return cartItem.quantity +  + acc;
        }, 0);
    }

}

const cartModule = {
    state,
    mutations,
    actions,
    getters
}

export  default cartModule;