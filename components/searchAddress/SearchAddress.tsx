import { useRef } from "react"
import { Autocomplete, LoadScript, StandaloneSearchBox } from "@react-google-maps/api"
import { useGeneralKey } from "@/hooks/useGeneralKey"
import { useDialogAddress } from "@/hooks/useOpenDialog"

const SearchAddress = ({ onChange, children }: any) => {
    const refGoogle = useRef<any>(null)
    const { generalKey } = useGeneralKey()
    const { setCoordinates } = useDialogAddress()

    const handleChangeReplace = (place: any) => {
        console.log('place', place);
        const placeCountry = place.address_components.some((component: any) => component.types.includes('country') && component.short_name === 'VN')

        if (place && placeCountry) {
            setCoordinates({
                lat: place.geometry?.location?.lat(),
                lng: place.geometry?.location?.lng()
            });
            console.log('place.formatted_address', place.formatted_address);

            onChange(place.formatted_address);
        } else {
            setCoordinates({ lat: 0, lng: 0 });
        }
    }

    const handleLoad = (ref: any) => {
        console.log('ref:', ref);
        console.log('refGoogle.current:', refGoogle.current);

        refGoogle.current = ref
    }

    return (
        <LoadScript
            googleMapsApiKey={generalKey.google_api_key}
            libraries={["places"]}
            language="vi"
            region="VN"
        >
            <Autocomplete
                onLoad={(ref) => (refGoogle.current = ref)}
                onPlaceChanged={() => {
                    const place: any = refGoogle.current.getPlace();
                    handleChangeReplace(place);
                }}
            >
                {children}
            </Autocomplete>
        </LoadScript>
    )
}
export default SearchAddress