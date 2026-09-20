"use client";

import Image from "next/image";
import { useDestinationData } from "@/lib/data/useDestinationData";
export default function Venue () {

    return (
        <div className="bg-white pb-16 pt-8 md:pb-20 md:pt-10">
            <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-0">
                <h1 className="text-center text-[28px] font-bold leading-[1.2] text-black md:text-[32px] lg:text-[40px]">
                    Discover Exceptional Destinations Across the Region
                </h1>
                <p className="mx-auto mt-3 max-w-[300px] text-center text-sm leading-relaxed text-[#5F5F5F] md:mt-4 md:max-w-[520px] md:text-[15px] lg:max-w-[720px] lg:text-base">
                    Explore a curated selection of venues that cater to diverse events, from intimate gatherings to grand celebrations. Each destination is handpicked for its unique charm, amenities, and capacity to host memorable experiences.
                </p>    
            </div>
               </div>
    )
}
