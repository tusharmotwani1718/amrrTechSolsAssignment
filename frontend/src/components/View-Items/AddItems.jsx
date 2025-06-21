import React from 'react'
import { AddItemModal } from '../index.js'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addItem as addItemSlice } from '../../store/Slices/itemSlice.js';
import useMessage from '../../context/MessageContext.js';

// import { selectItems } from '../../redux/slices/itemsSlice';
function AddItems() {
    // const items = useSelector(selectItems);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const dispatch = useDispatch();
    const { displayMessage } = useMessage();

    const handleAddItem = (newItem) => {
        // Dispatch action to add item to the store
        dispatch(addItemSlice(newItem));
        // Close the modal after adding the item
        setIsModalOpen(false);
        displayMessage('success', 'Item added successfully!');
    };

    return (
        <div className='min-h-screen bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center'>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => setIsModalOpen(true)}>Add Item</button>
            <AddItemModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddItem={handleAddItem} />
        </div>
    );
}

export default AddItems;
