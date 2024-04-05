import { useRef } from "react"
import { useGoogleKey } from "@/hooks/useGoogleKey"
import { LoadScript, StandaloneSearchBox } from "@react-google-maps/api"

const SearchAddress = ({ onChange, children }: any) => {
    const refGoogle = useRef<any>(null)
    const { googleKey } = useGoogleKey()
    const handleChangeReplace = () => {
        const [place] = refGoogle.current.getPlaces()
        if (place) {
            // console.log(place.geometry?.location?.lat());
            // console.log(place.geometry?.location?.lng());
            onChange(place.formatted_address)
        }
    }
    return (
        <LoadScript
            // googleMapsApiKey={''}
            googleMapsApiKey={googleKey.google_api_key}
            libraries={["places"]}
        >
            <StandaloneSearchBox
                onLoad={ref => refGoogle.current = ref}
                onPlacesChanged={handleChangeReplace}
            >
                {children}
            </StandaloneSearchBox>
        </LoadScript>
    )
}
export default SearchAddress