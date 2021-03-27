import { Flex } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/react";
import { useAll } from "@typesaurus/react";
import GoogleMapReact from "google-map-react";
import React, { useEffect, useState } from "react";
import GroupCard from "../components/GroupCard";
import MapMarker from "../components/map/MapMarker";
import TopNav from "../components/TopNav";
import { groups } from "../firestoreCollections";

interface Props {}

const map = (props: Props) => {
    // default start palce of the map is uni warwick
    const [mapCenter, setMapCenter] = useState({
        lat: 52.383599,
        lng: -1.56006,
    });
    let [allGroups, { loading, error }] = useAll(groups);
    if (loading || error || !allGroups) {
        allGroups = [];
    }
    useEffect(() => {
        // onload get the location of the user, using the browser location
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            setMapCenter({
                lat: coords.latitude,
                lng: coords.longitude,
            });
        });
    }, []);
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
                            return (
                                <MapMarker
                                    // @ts-ignore
                                    lat={group.data.location.x_}
                                    // @ts-ignore
                                    lng={group.data.location.N_}
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
            </Flex>
        </Flex>
    );
};

export default map;
