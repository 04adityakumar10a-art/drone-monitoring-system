import { radius } from "./radius";
import { shadows } from "./shadows";

export const theme = {

    panel: [

        radius.panel,

        "border",

        "border-white/10",

        "bg-white/[0.04]",

        "backdrop-blur-xl",

        shadows.card

    ].join(" "),

    button: [

        radius.button,

        "border",

        "border-white/10",

        "bg-white/[0.04]",

        "transition-all",

        "duration-300"

    ].join(" "),

    chip: [

        radius.chip,

        "border",

        "border-white/10",

        "backdrop-blur-lg"

    ].join(" ")

};