import _ from "lodash";
import { Host } from "./helperTypes";

export function title(str: string): string {
    /**
     * Converts a single word into title case
     * i.e. 'heLLo' -> 'Hello'
     */
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function splitTime(time: number): number[] {
    /**
     * Takes a time and returns an array [hour, min]
     */
    return [Math.trunc(time / 60), Math.trunc(time % 60)];
}

export function padStart(object: any, length: number, padding: string) {
    return _.padStart(object.toString(), length, padding);
}

export function enumKeys(enum_: { [s: number]: string }): number[] {
    return Object.keys(enum_).reduce<Array<number>>((keys, key) => {
        const num = Number.parseInt(key);
        if (!isNaN(num)) {
            keys.push(num);
        }
        return keys;
    }, []);
}

export function getSocialPropFromHost(host: Host) {
    switch (host) {
        case "facebook.com":
            return "facebook";
        case "instagram.com":
            return "instagram";
        case "twitter.com":
            return "twitter";
        case "none":
            return "website";
        default:
            throw new TypeError(host + " not recogized as a host");
    }
}
