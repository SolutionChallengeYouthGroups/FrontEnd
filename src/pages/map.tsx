import { Flex } from "@chakra-ui/layout";
import { Box, Icon } from "@chakra-ui/react";
import { useAll } from "@typesaurus/react";
import GoogleMapReact from "google-map-react";
import React, { useEffect, useState } from "react";
import GroupCard from "../components/GroupCard";
import MapMarker from "../components/map/MapMarker";
import TopNav from "../components/TopNav";
import { groups } from "../firestoreCollections";
import { GeoPointLocation } from "../firestoreTypes";
import { BiCurrentLocation } from "react-icons/bi";

interface Props {}

const map = (props: Props) => {
    // default start palce of the map is uni warwick
    const [mapCenter, setMapCenter] = useState({
        lat: 52.383599,
        lng: -1.56006,
    });
    // get all the groups to create the markers on the map
    let [allGroups, { loading, error }] = useAll(groups);
    if (loading || error || !allGroups) {
        allGroups = [];
    }

    const centerOnCurrentLocation = () => {
        // set the map to centre on your current location
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            setMapCenter({
                lat: coords.latitude,
                lng: coords.longitude,
            });
        });
    };
    return (
        <Flex
            height="100vh"
            width="100vw"
            flexDir="column"
            justifyContent="start"
        >
            <TopNav />
            <Flex height="100%" width="100vw">
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: "AIzaSyCnQIAuAR3oMVYlYm_ahxLh5B89PT3YYwg",
                    }}
                    center={mapCenter}
                    defaultZoom={14}
                >
                    {allGroups.map((group) => {
                        if (group.data.location) {
                            let location = GeoPointLocation.fromGeoPoint(
                                group.data.location
                            );
                            return (
                                <MapMarker
                                    // @ts-ignore
                                    lat={location.lat}
                                    // @ts-ignore
                                    lng={location.lon}
                                    popup={
                                        <GroupCard
                                            group={group.data}
                                            id={group.ref.id}
                                        />
                                    }
                                />
                            );
                        }
                    })}
                </GoogleMapReact>
                <Icon
                    as={BiCurrentLocation}
                    color="main"
                    position="absolute"
                    left="20px"
                    bottom="30px"
                    zIndex="5"
                    height="40px"
                    w="auto"
                    _hover={{ cursor: "pointer", color: "mainDark" }}
                    onClick={() => centerOnCurrentLocation()}
                />
            </Flex>
        </Flex>
    );
};

export default map;
