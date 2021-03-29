import { Button } from "@chakra-ui/button";
import { DownloadIcon } from "@chakra-ui/icons";
import { HStack } from "@chakra-ui/layout";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import firebase from "../../firebase";

interface DownloadLinkProps {
    file: firebase.storage.Reference;
}

interface DownloadsProps {
    postID: string;
}
const PostDownloads = ({ postID }: DownloadsProps) => {
    const [files, setFiles] = useState<firebase.storage.Reference[]>([]);
    // gets all the files in the folder for this post:
    firebase
        .storage()
        .ref()
        .child("posts")
        .child(postID)
        .listAll()
        .then((res) => {
            setFiles(res.items);
        });

    return (
        <HStack margin="10px">
            {files.map((file, i) => (
                <DownloadLink key={i} file={file} />
            ))}
        </HStack>
    );
};

const DownloadLink = ({ file }: DownloadLinkProps) => {
    let [url, setUrl] = useState("");
    useEffect(() => {
        // get the download url for this post:
        file.getDownloadURL().then((newUrl) => {
            setUrl(newUrl);
        });
    }, []);
    return (
        <a href={url} download target="_blank">
            <Button leftIcon={<DownloadIcon />} colorScheme="blue">
                {file.name}
            </Button>
        </a>
    );
};

export default PostDownloads;
