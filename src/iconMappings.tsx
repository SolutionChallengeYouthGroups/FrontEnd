import { FaTwitter, FaInstagram, FaFacebook, FaTheaterMasks, FaChess,
         FaHandHoldingHeart, FaBalanceScale } from "react-icons/fa";
import { GoMortarBoard } from "react-icons/go";
import { TiGroup } from "react-icons/ti";
import { BiPulse } from "react-icons/bi";
import { IoLogoGameControllerB } from "react-icons/io";
import { Host } from "./helperTypes";
import { GroupCategory } from "./firestoreTypes";
import { ScoutIcon } from "./media/ScoutIcon";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export const socialLinkMapping = new Map<Host, any>();
socialLinkMapping.set("twitter.com", FaTwitter);
socialLinkMapping.set("instagram.com", FaInstagram);
socialLinkMapping.set("facebook.com", FaFacebook);
socialLinkMapping.set("none", ExternalLinkIcon);

export const groupCategoryMapping = new Map<GroupCategory, any>();
groupCategoryMapping.set("artistic", FaTheaterMasks);
groupCategoryMapping.set("board games", FaChess);
groupCategoryMapping.set("educational", GoMortarBoard);
groupCategoryMapping.set("gaming", IoLogoGameControllerB);
groupCategoryMapping.set("faith-based", FaHandHoldingHeart);
groupCategoryMapping.set("physical", BiPulse);
groupCategoryMapping.set("political", FaBalanceScale);
groupCategoryMapping.set("scouting", ScoutIcon);
groupCategoryMapping.set("social", TiGroup);