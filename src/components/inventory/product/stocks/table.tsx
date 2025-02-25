'use client';
import React, { useState } from 'react'
import InventoryProductStockTableBottombar from './bottombar'

import InventoryProductStockTableHeader from './header'
import ServicesStockItem from './item'


const InventoryProductStockTable = () => {
  const [activeTab, setActiveTab] = useState('Low Stock');

  const handleActiveTabChange = (tab: string) => {
      setActiveTab(tab);
  };
  return (
        <div className='flex flex-col w-full box-border mb-10  cursor-default'>
        <InventoryProductStockTableHeader
        activeTabValue={activeTab}
        setActiveTabValue={handleActiveTabChange}
        />
    <div className='flex  w-full  box-border bg-gray-100  h-12 py-4 border-b border-neutral-400 text-gray-500'>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-2/6'>Item</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/6'>Batch No.</div>
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/6'>Vendor</div>
                {activeTab==='Excess'?(<div className=' flex text-gray-500 text-base font-medium px-6 w-1/6'>Max. Stock</div>):(<div className=' flex text-gray-500 text-base font-medium px-6 w-1/6'>Min. Stock</div>)}
                
                <div className=' flex text-gray-500 text-base font-medium px-6 w-1/6'>Quantity</div>
                
            </div>
<ServicesStockItem activeTabValue={activeTab}/>
<InventoryProductStockTableBottombar/>
     
        </div>
   
  )
}

export default InventoryProductStockTable