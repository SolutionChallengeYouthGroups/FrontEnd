import {
    FaTwitter,
    FaInstagram,
    FaFacebook,
    FaTheaterMasks,
    FaChess,
    FaHandHoldingHeart,
    FaBalanceScale,
} from "react-icons/fa";
import { GoMortarBoard } from "react-icons/go";
import { TiGroup } from "react-icons/ti";
import { BiPulse } from "react-icons/bi";
import { IoLogoGameControllerB } from "react-icons/io";
import { Host } from "./helperTypes";
import { GroupCategory, GroupCategories } from "./firestoreTypes";
import { ScoutIcon } from "./media/ScoutIcon";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export const socialLinkMapping = new Map<Host, any>([
    ["twitter.com", FaTwitter],
    ["instagram.com", FaInstagram],
    ["facebook.com", FaFacebook],
    ["none", ExternalLinkIcon],
]);

export const groupCategoryMapping = new Map<GroupCategory, any>([
    ["artistic", FaTheaterMasks],
    ["board games", FaChess],
    ["educational", GoMortarBoard],
    ["faith-based", FaHandHoldingHeart],
    ["gaming", IoLogoGameControllerB],
    ["other", null],
    ["physical", BiPulse],
    ["political", FaBalanceScale],
    ["scouting", ScoutIcon],
    ["social", TiGroup],
    ["", null],
]);
if (groupCategoryMapping.size !== GroupCategories.length + 1) {
    throw RangeError(
        "groupCategoryMapping has a different number of items to GroupCategories " +
            groupCategoryMapping.size +
            " != " +
            GroupCategories.length
    );
}
export const groupCategoryColorMapping = new Map<GroupCategory, string>([
    ["artistic", "#dfab8c"],
    ["board games", "#240095"],
    ["educational", "#00bb30"],
    ["faith-based", "#d37100"],
    ["gaming", "#ff82d9"],
    ["other", "#7aa6ff"],
    ["physical", "#592700"],
    ["political", "#00acc7"],
    ["scouting", "#af0050"],
    ["social", "#003e4f"],
    ["", "#000000"],
]);
if (groupCategoryColorMapping.size !== GroupCategories.length + 1) {
    throw RangeError(
        "groupCategoryColorMapping has a different number of items to GroupCategories (" +
            groupCategoryColorMapping.size +
            " != " +
            GroupCategories.length +
            ")"
    );
}
