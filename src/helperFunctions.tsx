import { stringify } from "querystring";

export function title(str: string): string{
    /**
     * Converts a single word into title case
     * i.e. 'heLLo' -> 'Hello'
     */
    return str.charAt(0).toUpperCase()+str.slice(1).toLowerCase();
}