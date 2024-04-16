import { useRef } from "react"
import { LoadScript, StandaloneSearchBox } from "@react-google-maps/api"
import { useGeneralKey } from "@/hooks/useGeneralKey"
import { useDialogAddress } from "@/hooks/useOpenDialog"

const SearchAddress = ({ onChange, children }: any) => {

    const refGoogle = useRef<any>(null)
    const { generalKey } = useGeneralKey()
    const { setCoordinates } = useDialogAddress()
    const handleChangeReplace = () => {
        const [place] = refGoogle.current.getPlaces()
        if (place) {
            setCoordinates({
                lat: place.geometry?.location?.lat(),
                lng: place.geometry?.location?.lng()
            })
            onChange(place.formatted_address)
            return
        }
        setCoordinates({ lat: 0, lng: 0 })
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