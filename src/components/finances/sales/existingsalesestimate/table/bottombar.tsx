"use client"

import printicon from "../../../../../assets/icons/finance/print.svg"
import shareicon from "../../../../../assets/icons/finance/share.svg"
import drafticon from "../../../../../assets/icons/finance/draft.svg"
import checkicon from "../../../../../assets/icons/finance/check.svg"
import React, { useState, useEffect, useContext } from 'react';
import downloadicon from "../../../../../assets/icons/finance/download.svg"
import Newsales from '@/app/finance/sales/newsales/page'
import Link from "next/link"
import Image from "next/image"


const ExistingsaleEstimateBottomBar = ({existingSalesData}) => {
  
    

   
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
                               <Link href={{pathname:'newsales',query:{id:existingSalesData.id}}} style={{textDecoration:'none',color:'white'}}>
                               <div className="px-4 py-2.5 bg-zinc-900 rounded-[5px] justify-start items-center gap-2 flex " >
                                    <Image src={checkicon} alt="check"></Image>
                                    <div>Convert to Sales Invoice</div>
                                </div>
                               </Link>
                                
                            </div>
                        </div>
    
          
        </>

    )
}

export default ExistingsaleEstimateBottomBar;
