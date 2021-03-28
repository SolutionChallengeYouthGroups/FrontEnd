import { Button } from "@chakra-ui/button";
import { Text, VStack } from "@chakra-ui/layout";
import GoogleMapReact from "google-map-react";
import { useEffect, useState } from "react";
import { Group, GeoPointLocation } from "../../firestoreTypes";
import MapMarker from "../map/MapMarker";
import googleMapReact from "google-map-react";
import { defaultGeoPointLocation } from "../../objectDefaults";

interface Props extends googleMapReact.Props {
    group: Group;
    edit?: boolean;
    originalLocation: GeoPointLocation | null;
}
const GroupLocation = ({ group, edit, originalLocation }: Props) => {
    const [location, setLocationState] = useState(
        group.location ? GeoPointLocation.fromGeoPoint(group.location) : null
    );
    function setLocation(location: GeoPointLocation | null) {
        group.location = location?.toGeoPoint();
        setLocationState(location);
    }
    if (!!edit) {
        return (
            <VStack w="100%" h="100%">
                <GoogleMapReact
                    onClick={(e) =>
                        setLocation(new GeoPointLocation(e.lat, e.lng))
                    }
                    bootstrapURLKeys={{
                        key: "AIzaSyCnQIAuAR3oMVYlYm_ahxLh5B89PT3YYwg",
                    }}
                    center={(location
                        ? location
                        : defaultGeoPointLocation()
                    ).toMapCoords()}
                    defaultZoom={14}
                >
                    {originalLocation && group.location ? (
                        <MapMarker
                            color="red"
                            lat={originalLocation.lat}
                            lng={originalLocation.lon}
                            onContextMenu={(e) => {
                                setLocation(null);
                            }}
                        />
                    ) : (
                        <></>
                    )}
                    {location && !originalLocation?.equals(location) ? (
                        <MapMarker lat={location.lat} lng={location.lon} />
                    ) : (
                        <></>
                    )}
                </GoogleMapReact>
                {originalLocation ? (
                    <Text>
                        The red marker is the old location. Right click it to
                        remove the group location.
                    </Text>
                ) : (
                    <></>
                )}
            </VStack>
        );
    }
    if (!location) {
        return <></>;
    }
    return (
        <GoogleMapReact
            bootstrapURLKeys={{
                key: "AIzaSyCnQIAuAR3oMVYlYm_ahxLh5B89PT3YYwg",
            }}
            center={location.toMapCoords()}
            defaultZoom={14}
        >
            <MapMarker
                popup={
                    <Text
                        padding="8px"
                        bg="white"
                        borderRadius="10px"
                        fontWeight="semibold"
                    >
                        {group.name}
                    </Text>
                }
                lat={location.lat}
                lng={location.lon}
            />
        </GoogleMapReact>
    );
};

export default GroupLocation;
