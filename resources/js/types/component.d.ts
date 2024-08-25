import {Props} from "@/types/index";
import React from "react";
import {SxProps, Theme} from "@mui/material";

export type AppBarTripleProps = Props & {
    startText: string;
    middleText: string;
    endText: string;
}

export type ButtonEndHrefProps = Props & {
    href: string;
    text: string;
    icon: React.ReactNode;
    sx: SxProps<Theme> | undefined;
}
