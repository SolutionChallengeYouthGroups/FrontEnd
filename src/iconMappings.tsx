import { FaTwitter, FaInstagram, FaFacebook, FaTheaterMasks, FaChess,
         FaHandHoldingHeart, FaBalanceScale } from "react-icons/fa";
import { VscMortarBoard } from "react-icons/vsc";
import { GrGroup } from "react-icons/gr";
import { BiPulse } from "react-icons/bi";
import { IoLogoGameControllerB } from "react-icons/io";
import { Host } from "./helperTypes";
import { GroupCategory } from "./firestoreTypes";
import { ScoutIcon } from "./media/ScoutIcon";

export const socialLinkMapping = new Map<Host, any>();
socialLinkMapping.set("twitter.com", FaTwitter);
socialLinkMapping.set("instagram.com", FaInstagram);
socialLinkMapping.set("facebook.com", FaFacebook);

export const groupCategoryMapping = new Map<GroupCategory, any>();
groupCategoryMapping.set("artistic", FaTheaterMasks);
groupCategoryMapping.set("board games", FaChess);
groupCategoryMapping.set("educational", VscMortarBoard);
groupCategoryMapping.set("esports", IoLogoGameControllerB);
groupCategoryMapping.set("faith-based", FaHandHoldingHeart);
groupCategoryMapping.set("physical", BiPulse);
groupCategoryMapping.set("political", FaBalanceScale);
groupCategoryMapping.set("scouting", ScoutIcon);
groupCategoryMapping.set("social", GrGroup);