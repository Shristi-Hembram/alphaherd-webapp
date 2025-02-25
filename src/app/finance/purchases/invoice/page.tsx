import React from 'react'
import FinancesNavbar from '@/components/finances/navbar/navbar';
import FinancesPurchasesTable from '@/components/finances/purchases/table/table';



const PurchasesInvoice = () => {
  return (
    <>
    <div className='w-full bg-gray-200 p-8 px-10'>
        <FinancesNavbar/>
        <FinancesPurchasesTable/>
    </div>
    </>
  )
}

export default PurchasesInvoice