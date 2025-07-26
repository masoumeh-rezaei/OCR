import ScrollDots from "@/component/scrollDots";
import Hero from "@/component/hero/hero";
import HowItWorks from "@/component/HowItWorks/howItWorks";
import Category from "@/component/AIExplanation";
import Flexible from "@/component/flexible";
import Feature from "@/component/feature";
import Header from "@/component/Header/header";
import Footer from "@/component/footer";


export default async function Home() {



    return (
        <div className="overflow-x-hidden">

            <Header/>
            <ScrollDots/>
            <Hero/>
            <HowItWorks/>
            <Category/>
            <Flexible/>
            <Feature/>
            <Footer/>

        </div>
    );
}
