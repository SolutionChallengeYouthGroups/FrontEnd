import SearchBox from "./SearchBox";
import firestore from "../../firebase";

// ChakraUI
import { Grid, Spinner } from "@chakra-ui/react";
import GroupCard from "../../components/cards/GroupCard";

import { Group } from "../../firestoreTypes";
import { collection, Doc, where } from "typesaurus";
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
    if (loading) {
        return <Spinner color="main" />;
    }
    if (error || !allGroups) {
        // if it is loading/there is an error, set allGroups to [], so that the .map still works
        allGroups = [];
    }

    if (searchTerm) {
        // If there is a search term:
        // Filter through all groups and only keep results if they satisfy the predicates inside
        allGroups = allGroups?.filter(
            (group) =>
                group.data.name.toLowerCase().includes(searchTerm) || // If search term in group name
                group.data.description.toLowerCase().includes(searchTerm) || // If search term in description
                group.data.category.toLowerCase().includes(searchTerm)
        ); // If search term in categories
    }
    return (
        <>
            <Grid
                gap="15px"
                w="90%"
                justifyContent="center"
                templateColumns="repeat(auto-fit, minmax(250px,max-content))"
            >
                {allGroups.map((group) => (
                    <GroupCard
                        group={group.data}
                        groupID={group.ref.id}
                        key={group.ref.id}
                    />
                ))}
            </Grid>
        </>
    );
};

export default Results;
