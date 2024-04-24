import React, { useEffect, useRef } from "react"
import { Autocomplete, LoadScript, StandaloneSearchBox } from "@react-google-maps/api"
import { useGeneralKey } from "@/hooks/useGeneralKey"
import { useDialogAddress } from "@/hooks/useOpenDialog"

const SearchAddress = ({ onChange, children }: any) => {

    const refGoogle = useRef<any>(null)
    const { generalKey } = useGeneralKey()
    const { setCoordinates } = useDialogAddress()
    // const handleChangeReplace = () => {
    //     const [place] = refGoogle.current.getPlaces()
    //     if (place && place.address_components.some((component: any) => component.types.includes('country') && component.short_name === 'VN')) {
    //         setCoordinates({
    //             lat: place.geometry?.location?.lat(),
    //             lng: place.geometry?.location?.lng()
    //         })
    //         onChange(place.formatted_address)
    //         return
    //     }
    //     setCoordinates({ lat: 0, lng: 0 })
    // }
    const handleChangeReplace = (place: any) => {
        if (place) {
            // if (place && place.address_components.some((component: any) => component.types.includes('country') && component.short_name === 'VN')) {
            setCoordinates({
                lat: place.geometry?.location?.lat(),
                lng: place.geometry?.location?.lng()
            });
            onChange(place.formatted_address);
        } else {
            setCoordinates({ lat: 0, lng: 0 });
        }
    }


    return (
        <>
            <LoadScript
                googleMapsApiKey={generalKey.google_api_key}
                // googleMapsApiKey={generalKey.google_api_key}
                libraries={["places"]}
                language="vi"
                region="VN"

            // children
            >
                {/* <StandaloneSearchBox
                onLoad={ref => refGoogle.current = ref}
                onPlacesChanged={handleChangeReplace}
                bounds={{ south: 8.18, west: 102.14, north: 23.39, east: 109.46 }}
            >

                {children}
            </StandaloneSearchBox> */}
                <Autocomplete
                    onLoad={ref => refGoogle.current = ref}
                    onPlaceChanged={() => {
                        const place: any = refGoogle.current.getPlace();
                        handleChangeReplace(place);
                    }}
                    options={{
                        types: [],
                        componentRestrictions: { country: 'vn' }

                    }}

                >
                    {children}
                </Autocomplete>
            </LoadScript>
        </>
    )
}
export default SearchAddress