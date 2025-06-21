import React from 'react'
import { Item } from '../index.js'
import { useSelector } from 'react-redux';

function ViewItems() {

    // load items from the store or API
    const items = useSelector((state) => state.items.items);









    return (
        <div className='min-h-screen'>
            {
                items && items.length > 0 ? (
                    <>
                        <div className='bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center'>
                            <h2 className='text-2xl font-bold text-center p-4 text-white'>All Items</h2>

                        </div>
                        <div className='flex flex-wrap justify-center items-center gap-4 p-4'>
                            {
                                items.map((item) => (
                                    <Item
                                        key={item.id}
                                        id={item.id}
                                        title={item.title}
                                        description={item.description}
                                        price={item.price}
                                        image={item.image}
                                        stockAvailable={item.stockAvailable}
                                        category={item.category}
                                        additionalImages={item.additionalImages}
                                    />
                                ))
                            }

                        </div>
                    </>
                ) : (
                    <div className='bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center'>
                        <h2 className='text-2xl font-bold text-center p-4 text-white'>No Items Available</h2>
                    </div>
                )
            }


        </div>
    )
}

export default ViewItems
