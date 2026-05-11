import IntroSection from "./components/IntroSection";
import SectionArticle from "./components/SectionArticle";
import SectionBannerPromotion from "./components/SectionBannerPromotion";
import SectionCardCar from "./components/SectionCardCar";
import SectionClient from "./components/SectionClient";
import SectionFeedbackCustomer from "./components/SectionFeedbackCustomer";
import SectionPlaceProminent from "./components/SectionPlaceProminent";
import SectionShowApp from "./components/SectionShowApp";
import SectionTripCarServices from "./components/SectionTripCarServices";
import SectitonWhyWe from "./components/SectitonWhyWe";

export default function Home() {

  return (
    <div className="bg-[#FBFBFC] ">
      <IntroSection />
      <SectionCardCar />
      {/* <SectionClient /> */}
      <SectionBannerPromotion />
      <SectionPlaceProminent />
      <SectionTripCarServices />
      <SectitonWhyWe />
      <SectionFeedbackCustomer />
      <SectionShowApp />
      <SectionArticle />
    </div>
  );
}
