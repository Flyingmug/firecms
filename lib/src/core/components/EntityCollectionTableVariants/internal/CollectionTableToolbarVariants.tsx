import React from "react";
import {
    Box,
    Button,
    CircularProgress,
    Hidden,
    IconButton,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";

import { CollectionSize } from "../../../../types";
import { SearchBar } from "../../EntityCollectionTable/internal/SearchBar";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import { FilledMenuItem, FilledSelect } from "../../fields/FilledSelect";
import { ArrowForwardIos, ExpandLess, KeyboardArrowDown, KeyboardArrowRight } from "@mui/icons-material";
import ExpandMore from "@mui/icons-material/ExpandMore";

interface CollectionTableToolbarVariantsProps {
    size: CollectionSize;
    filterIsSet: boolean;
    loading: boolean;
    forceFilter: boolean;
    isTableOpen?: boolean;
    actionsStart?: React.ReactNode;
    actions?: React.ReactNode;
    title?: React.ReactNode,
    onTextSearch?: (searchString?: string) => void;
    onSizeChanged: (size: CollectionSize) => void;
    onRowExpand?: () => void;
    onToggleTable: () => void;
    clearFilter: () => void;
}

export function CollectionTableToolbarVariants<M extends Record<string, any>>(props: CollectionTableToolbarVariantsProps) {

    const theme = useTheme();
    const largeLayout = useMediaQuery(theme.breakpoints.up("md"));

    const filterView = !props.forceFilter && props.filterIsSet &&
        <Tooltip title="Clear filter">
            <IconButton
                sx={{ height: "fit-content" }}
                aria-label="filter clear"
                onClick={props.clearFilter}
                size="medium">
                <FilterListOffIcon/>
            </IconButton>
        </Tooltip>;

    const sizeSelect = (
        <FilledSelect
            variant={"standard"}
            value={props.size}
            sx={{
                width: 56,
                height: 40
            }}
            onChange={(evt: any) => props.onSizeChanged(evt.target.value)}
            renderValue={(value: any) => value.toUpperCase()}
        >
            {["xs", "s", "m", "l", "xl"].map((value) => (
                <FilledMenuItem
                    key={`size-select-${value}`} value={value}>
                    {value.toUpperCase()}
                </FilledMenuItem>
            ))}
        </FilledSelect>
    );

    return (
        <Box
            sx={{
                minHeight: 56,
                overflowX: "auto",
                [theme.breakpoints.down("sm")]: {
                    px: theme.spacing(1)
                },
                px: theme.spacing(2),
                backgroundColor: theme.palette.background.default,
                borderBottom: `1px solid ${theme.palette.divider}`,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%"
            }}
        >

            <Box display={"flex"}
                 alignItems="center"
                 sx={{
                     "& > *": {
                         [theme.breakpoints.down("md")]: {
                             marginRight: `${theme.spacing(1)} !important`
                         },
                         marginRight: `${theme.spacing(2)} !important`
                     }
                 }}>

                <Button
                  onClick={() => {
                    props.onRowExpand ? props.onRowExpand() : undefined;
                    props.onToggleTable();
                  }}
                >
                {props.isTableOpen ? <ExpandLess scale={2} /> : <ExpandMore scale={2} />}
                </Button>

                {props.title && <Hidden lgDown>
                    {props.title}
                </Hidden>}

                {sizeSelect}

                {props.actionsStart}

                {filterView}

            </Box>

            <Box sx={{
                display: "flex",
                alignItems: "center",
                "& > *": {
                    [theme.breakpoints.down("md")]: {
                        marginRight: `${theme.spacing(0.5)} !important`
                    },
                    marginRight: `${theme.spacing(1)} !important`
                }
            }}>

                {largeLayout && <Box width={22}>
                    {props.loading &&
                        <CircularProgress size={16} thickness={8}/>}
                </Box>}

                {props.onTextSearch &&
                    <SearchBar
                        key={"search-bar"}
                        onTextSearch={props.onTextSearch}
                        expandable={true}/>
                }

                {props.actions}

            </Box>

        </Box>
    );
}
