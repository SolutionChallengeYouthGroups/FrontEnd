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
    ["artistic", "#b58583"],
    ["board games", "#98fb98"],
    ["educational", "#ff7d54"],
    ["faith-based", "#01fdee"],
    ["gaming", "#00fa9a"],
    ["other", "#ff6792"],
    ["physical", "#32a4d4"],
    ["political", "#fff9bf"],
    ["scouting", "#d95cb5"],
    ["social", "#aba4ff"],
    ["", "#ffffff"],
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
