'use client';


import ScrollDots from "@/component/scrollDots";
import Hero from "@/component/hero/hero";
import HowItWorks from "@/component/HowItWorks/howItWorks";
import Category from "@/component/AIExplanation";
import Flexible from "@/component/flexible";
import Feature from "@/component/feature";

const SmartEntry = () => {

    return (
        <>
            <div className="overflow-x-hidden">
                <ScrollDots/>
                <Hero/>
                <HowItWorks/>
                <Category/>
                <Flexible/>
                <Feature/>
            </div>
        </>
    );
};

export default SmartEntry;
