import { createSlice } from '@reduxjs/toolkit';


const initialItems = [
    {
        id: 1,
        title: "Blue Shirt",
        description: "This is an XL sized blue shirt.",
        price: 300,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hpcnRzfGVufDB8fDB8fHww",
        stockAvailable: 10,
        category: "Shirt",
        additionalImages: [
            "https://images.unsplash.com/photo-1531036623495-da918d4029bb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ymx1ZSUyMHNoaXJ0fGVufDB8fDB8fHww",
            "https://images.unsplash.com/photo-1601522089844-8ac5e2ae6773?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Ymx1ZSUyMHNoaXJ0fGVufDB8fDB8fHww",
            "https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Ymx1ZSUyMHNoaXJ0fGVufDB8fDB8fHww"
        ]
    },
    {
        id: 2,
        title: "T-Shirt",
        description: "A comfortable cotton t-shirt.",
        price: 200,
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2hpcnRzfGVufDB8fDB8fHww",
        stockAvailable: 15,
        category: "Shirt",
        additionalImages: [
            "https://plus.unsplash.com/premium_photo-1673356302067-aac3b545a362?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8VHNoaXJ0fGVufDB8fDB8fHww",
            "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8VHNoaXJ0fGVufDB8fDB8fHww",
            "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8VHNoaXJ0fGVufDB8fDB8fHww",
            "https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fFRzaGlydHxlbnwwfHwwfHx8MA%3D%3D"
        ]
    },
    {
        id: 3,
        title: "Jeans",
        description: "Stylish blue jeans for everyday wear.",
        price: 400,
        image: "https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8UGFudHxlbnwwfHwwfHx8MA%3D%3D",
        stockAvailable: 5,
        category: "Pants"
    }
]

const initialState = {
    items: initialItems,
};

const itemSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        addItem: (state, action) => {
            state.items.push(action.payload);
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload.id);
        },
        updateItem: (state, action) => {
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = { ...state.items[index], ...action.payload };
            }
        },
        fetchItemDetails: (state, action) => {
            const item = state.items.find(item => item.id === action.payload.id);
            if (item) {
                return item;
            } else {
                throw new Error('Item not found');
            }
        },
    },
});

export const { addItem, removeItem, updateItem, fetchItemDetails } = itemSlice.actions;
export default itemSlice.reducer;
