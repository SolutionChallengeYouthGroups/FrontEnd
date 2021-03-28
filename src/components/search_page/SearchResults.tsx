import SearchBox from "./SearchBox";
import firestore from "../../firebase";

// ChakraUI
import { Grid } from "@chakra-ui/react";
import GroupCard from "../../components/GroupCard";

import { Group } from "../../firestoreTypes";
import { collection, where } from "typesaurus";
import { useAll, useQuery } from "@typesaurus/react";

interface Props {
    search: string;
}

const Results = (props: Props) => {
    const searchTerm = props.search;
    // Grab collection of groups with typesaurus
    const groups = collection<Group>("groups");

    // getting all the groups from firestore
    let [allGroups, { loading, error }] = useAll(groups);
    if (loading || error || !allGroups) {
        // if it is loading/there is an error, set allGroups to [], so that the .map still works
        allGroups = [];
    }

    // Filter through all groups and only keep results if they satisfy the predicates inside
    const results = allGroups?.filter(
        (group) =>
            group.data.name.toLowerCase().includes(searchTerm) || // If search term in group name
            group.data.description.toLowerCase().includes(searchTerm) || // If search term in description
            group.data.category.toLowerCase().includes(searchTerm)
    ); // If search term in categories

    return (
        <>
            <Grid
                gap="15px"
                w="90%"
                justifyContent="center"
                templateColumns="repeat(auto-fit, minmax(400px,max-content))"
                >
                {searchTerm != "" ? (
                    results?.map((group) => (
                        <GroupCard
                            group={group.data}
                            id={group.ref.id}
                            key={group.data.name}
                        />
                    ))
                ) : (
                    allGroups.map((group) => (
                        <GroupCard
                            group={group.data}
                            id={group.ref.id}
                            key={group.data.name}
                        />
                    ))
                )}
            </Grid>
        </>
    );
};

export default Results;
