import type { HTMLInputAttributes } from "svelte/elements";

export interface CustomInputAttributes extends HTMLInputAttributes {
    enablePasswordToggle?: boolean;
}