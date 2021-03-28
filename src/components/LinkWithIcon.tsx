import React, { HTMLProps } from "react";
import TextWithIcon from "./TextWithIcon";
import styles from "./componentStyles.module.css";
import { BoxProps } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/react";

interface Props extends BoxProps {
    text: string;
    icon: any;
    link: string;
}

const LinkWithIcon = ({ text, icon, link, ...rest }: Props) => {
    return (
        <Box {...rest}>
            <a
                href={link}
                target="_blank"
                className={styles.underlineLinkHover}
            >
                <TextWithIcon text={text} icon={icon} />
            </a>
        </Box>
    );
};

export default LinkWithIcon;
