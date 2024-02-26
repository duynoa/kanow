import IntroSection from "./components/IntroSection";
import SectionBannerPromotion from "./components/SectionBannerPromotion";
import SectionCardCar from "./components/SectionCardCar";

export default function Home() {
    return (
        <>
            <IntroSection />
            <SectionCardCar />
            <SectionBannerPromotion />
        </>
    );
}
