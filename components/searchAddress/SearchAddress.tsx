import { useRef } from "react"
import { LoadScript, StandaloneSearchBox } from "@react-google-maps/api"
import { useGeneralKey } from "@/hooks/useGeneralKey"

const SearchAddress = ({ onChange, children }: any) => {
    const refGoogle = useRef<any>(null)
    const { generalKey } = useGeneralKey()
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
            googleMapsApiKey={generalKey.google_api_key}
            // googleMapsApiKey={generalKey.google_api_key}
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