import React, { useCallback, useState } from "react";

import equal from "react-fast-compare"

import { lighten, styled } from "@mui/material";

import { getRowHeight } from "../common";
import { RowInnerTableProps, VirtualTableRowProps } from "../types";
import { OnRowClickParams, TableSize } from "../VirtualTableProps";

type VirtualTableRowInnerProps = {
    size: number;
    cursor?: "pointer" | "default";
    onRowClick?: (props: OnRowClickParams<any>) => void;
    hovered?: boolean;
}

const MARGIN = 8;
const LEFT_MARGIN = 50;

const VirtualTableRowInner = styled("div", {})<VirtualTableRowInnerProps>(({
                                                                               theme,
                                                                               size,
                                                                               cursor,
                                                                               hovered
                                                                           }) => ({
    display: "flex",
    minWidth: `calc(100% - ${MARGIN + LEFT_MARGIN}px)`,
    maxHeight: size - MARGIN*2,
    margin: MARGIN,
    marginLeft: LEFT_MARGIN,
    borderLeftWidth: 4,
    borderColor: 'white',
    cursor,
    flexDirection: "row",
    fontSize: "0.875rem",
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: hovered
        ? (theme.palette.mode === "dark"
            ? lighten(theme.palette.background.paper, 0.01)
            : "rgb(252, 252, 253)") //darken(theme.palette.background.default, 0.005))
        : undefined
}));

export const RowInnerTable = React.memo<RowInnerTableProps<any>>(
    function RowInnerTable<T>({
                                    rowData,
                                    rowIndex,
                                    children,
                                    onRowClick,
                                    size,
                                    style,
                                    hoverRow
                                }: RowInnerTableProps<T>) {

        const [hovered, setHovered] = useState(false);

        const onClick = useCallback((event: React.SyntheticEvent) => onRowClick
            ? onRowClick({
                rowData,
                rowIndex,
                event
            })
            : undefined, [onRowClick, rowData, rowIndex]);

        const setOnHoverTrue = useCallback(() => setHovered(true), []);
        const setOnHoverFalse = useCallback(() => setHovered(false), []);

        return (
            <VirtualTableRowInner
                onClick={onClick}
                size={size}
                cursor={onRowClick ? "pointer" : undefined}
                hovered={hoverRow && hovered}
                style={{ ...(style), width: "fit-content" }}
                onMouseEnter={setOnHoverTrue}
                onMouseMove={setOnHoverTrue}
                onMouseLeave={setOnHoverFalse}>

                {children}

            </VirtualTableRowInner>
        );
    },
    equal
);
