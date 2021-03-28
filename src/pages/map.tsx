// React:
import React, { useState } from "react";

// Chakra:
import { Flex, HStack } from "@chakra-ui/layout";
import { Text, Switch, Icon } from "@chakra-ui/react";

// firestore
import { useAll } from "@typesaurus/react";
import MapMarker from "../components/map/MapMarker";
import { groups } from "../firestoreCollections";

// map:
import GoogleMapReact from "google-map-react";
import { GeoPointLocation } from "../firestoreTypes";

// componenets
import InlineGroupCard from "../components/cards/InlineGroupCard";
import { BiCurrentLocation } from "react-icons/bi";

// others:
import { groupCategoryColorMapping } from "../typeMappings";

interface Props {}

const map = (props: Props) => {
    // default start palce of the map is uni warwick
    const [mapCenter, setMapCenter] = useState({
        lat: 52.383599,
        lng: -1.56006,
    });
    // get all the groups to create the markers on the map
    let [allGroups, { loading, error }] = useAll(groups);
    let [isColored, setIsColored] = useState(true);
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
            width="100vw"
            flexDir="column"
            justifyContent="start"
            flexGrow={2}
        >
            <Flex height="100%" width="100vw">
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: "AIzaSyCnQIAuAR3oMVYlYm_ahxLh5B89PT3YYwg",
                    }}
                    center={mapCenter}
                    defaultZoom={14}
                    // @ts-ignore not sure why typescript is saying flexGrow is not a valid property
                    style={{ flexGrow: 2 }}
                >
                    {allGroups.map((group) => {
                        if (group.data.location) {
                            let location = GeoPointLocation.fromGeoPoint(
                                group.data.location
                            );
                            return (
                                <MapMarker
                                    lat={location.lat}
                                    lng={location.lon}
                                    popup={
                                        <InlineGroupCard
                                            group={group.data}
                                            id={group.ref.id}
                                        />
                                    }
                                    color={
                                        isColored
                                            ? groupCategoryColorMapping.get(
                                                  group.data.category
                                              )
                                            : "main"
                                    }
                                />
                            );
                        }
                    })}
                </GoogleMapReact>
                <HStack
                    bg="white"
                    position="absolute"
                    right="60px"
                    bottom="25px"
                    zIndex="5"
                    padding="5px"
                    outline="1px solid black"
                >
                    <Text>Colour By Category</Text>
                    <Switch
                        colorScheme="green"
                        isChecked={isColored}
                        onChange={(e) => setIsColored(e.target.checked)}
                    />
                </HStack>
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
