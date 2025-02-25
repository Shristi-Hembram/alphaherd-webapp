"use client"

import printicon from "../../../../../assets/icons/finance/print.svg"
import shareicon from "../../../../../assets/icons/finance/share.svg"
import drafticon from "../../../../../assets/icons/finance/draft.svg"
import checkicon from "../../../../../assets/icons/finance/check.svg"
import React, { useState, useEffect, useContext } from 'react';
import downloadicon from "../../../../../assets/icons/finance/download.svg"
import Link from "next/link"
import Image from "next/image"
import { DataContext } from './DataContext'
import { FinanceSalesType } from '@prisma/client'
import axios from "axios"
import { useAppSelector } from '@/lib/hooks';
import { useSearchParams } from "next/navigation"



const NewsalesBottomBar = () => {
    const { headerData, tableData, totalAmountData } = useContext(DataContext);
    const appState = useAppSelector((state) => state.app);
    const url=useSearchParams();
    const id=url.get('id');
    const handleSubmit = async () => {
        const allData = {headerData, tableData, totalAmountData};
        console.log("this is all data",allData)

        const items = tableData.map(data => ({
            productId: data.productId,
            productBatchId:data.id, 
            quantity: data.quantity,  
            sellingPrice:data.sellingPrice,
            taxAmount:data.gst,
            name:data.itemName
    }));
        const data={
            customer: (id===null)?allData.headerData.customer.value:allData.headerData.customer,
            notes: allData.headerData.notes,
            subTotal: 0,
            invoiceNo: 234234,
            dueDate: allData.headerData.dueDate,
            shipping: 0,
            adjustment: 0,
            totalCost: 0,
            overallDiscount: (id===null)?allData.totalAmountData.gst.value:allData.totalAmountData.gst,
            totalQty: 0,
            status: "Pending",
            type: FinanceSalesType.Estimate,
            items:{
                create:items
            }
            
        }
        console.log(JSON.stringify(data))
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/finance/sales/create/${FinanceSalesType.Invoice}?branchId=${appState.currentBranchId}`,data)

            if (!response.data) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>


<div className="flex justify-between items-center w-full  box-border  bg-white  bg-white border border-solid border-gray-300 text-gray-400 border-t-0.5 py-4 rounded-b-lg">
                            <div className="flex justify-between items-center gap-4 pl-4">
                                <div className="p-2 bg-white rounded-[5px] border border-neutral-400 justify-start items-center gap-2 flex">
                                    <Image src={printicon} alt="print"></Image>
                                    <div>Print</div>
                                </div>
                                <div className="p-2 bg-white rounded-[5px] border border-neutral-400 justify-start items-center gap-2 flex">
                                    <Image src={downloadicon} alt="download"></Image>
                                    <div>Download</div>
                                </div>
                                <div className="p-2 bg-white rounded-[5px] border border-neutral-400 justify-start items-center gap-2 flex">
                                    <Image src={shareicon} alt="share"></Image>
                                    <div>Share</div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center gap-4 pr-4">
                                <div className="px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex">
                                    <Image src={drafticon} alt="draft"></Image>
                                    <div>Save as Draft</div>
                                </div>
                                <div className="px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex" onClick={handleSubmit}>
                                    <Image src={checkicon} alt="check"></Image>
                                    <div>Save</div>
                                </div>
                            </div>
                        </div>
    
          
        </>

    )
};


export default NewsalesBottomBar;
