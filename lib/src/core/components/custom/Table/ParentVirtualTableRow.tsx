import { lighten, styled } from '@mui/material'
import React, { createContext, forwardRef, useCallback, useState } from 'react'

import equal from "react-fast-compare"

// @ts-ignore
import { FixedSizeList as List } from "react-window";

import { VirtualTableRow } from '../../Table/VirtualTableRow';
import { VirtualTableCell } from '../../Table/VirtualTableCell';
import { ParentVirtualTableRowProps } from './types';
import { OnRowClickParams, TableColumn, TableSize, VirtualTableProps } from '../../Table/VirtualTableProps';
import VariantsToggle from './VariantsToggle';
import { getRowHeight } from '../../Table/common';
import { VirtualTableContextProps } from '../../Table/types';
import { VirtualTableHeaderRow } from '../../Table/VirtualTableHeaderRow';
import ListDisplay from './styling/ListDisplay';


const VirtualListContext = createContext<VirtualTableContextProps<any>>({} as any);
VirtualListContext.displayName = "VirtualListContext";

type InnerElementProps = { children: React.ReactNode, style: any };

// eslint-disable-next-line react/display-name
const innerElementType = forwardRef<HTMLDivElement, InnerElementProps>(({
                                                                            children,
                                                                            ...rest
                                                                        }: InnerElementProps, ref) => {

        return (
            <VirtualListContext.Consumer>
                {(virtualTableProps) => {
                    const customView = virtualTableProps.customView;
                    return (
                        <>
                            <div
                                id={"virtual-table"}
                                style={{
                                    position: "relative",
                                    height: "100%"
                                }}>
                                <div
                                    ref={ref}
                                    {...rest}
                                    style={{
                                        ...rest?.style,
                                        minHeight: "100%",
                                        position: "relative"
                                    }}>
                                    <VirtualTableHeaderRow {...virtualTableProps}/>
                                    {!customView && children}
                                </div>
                            </div>
                            {customView && <div style={{
                                position: "sticky",
                                top: "56px",
                                flexGrow: 1,
                                height: "calc(100% - 56px)",
                                marginTop: "calc(56px - 100vh)",
                                left: 0
                            }}>{customView}</div>}
                        </>
                    );
                }}
            </VirtualListContext.Consumer>
        );
    })
;

type ParentVirtualTableRowInner = {
    size: TableSize;
    cursor?: "pointer" | "default";
    onRowClick?: (props: OnRowClickParams<any>) => void;
    hovered?: boolean;
}

const ParentVirtualTableRowInner = styled('div', {})<ParentVirtualTableRowInner>(({
                                                                                      theme,
                                                                                      size,
                                                                                      cursor,
                                                                                      hovered
                                                                                  }) => ({
    display: "flex",
    minWidth: "100%",
    height: getRowHeight(size),
    cursor,
    fontSize: "0.875rem",
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: hovered
        ? (theme.palette.mode === "dark"
            ? lighten(theme.palette.background.paper, 0.01)
            : "rgb(252, 252, 253)") //darken(theme.palette.background.default, 0.005))
        : undefined
}))

const ParentVirtualTableRow = React.memo<ParentVirtualTableRowProps<any>>(
    function ParentVirtualTableRow<T>({
                                    parentRowData,
                                    variantsData,
                                    rowIndex,
                                    onRowClick,
                                    size,
                                    style,
                                    hoverRow,
                                    columns,
                                    cellRenderer,

                                    outerRef,
                                    width,
                                    height,
                                    itemCount,
                                    onScroll,
                                    itemSize
                                }: ParentVirtualTableRowProps<T>) {
                                    
        const Row = useCallback(({
            index,
            style
        }: any) => {
            const rowData = variantsData && variantsData[index];

            return (
                <VirtualTableRow
                    key={`row_${index}`}
                    rowData={rowData}
                    rowIndex={index}
                    onRowClick={onRowClick}
                    columns={columns}
                    hoverRow={hoverRow}
                    style={{
                        ...style,
                        top: `calc(${style.top}px + 50px)`
                    }}
                    size={size}>
                    {columns.map((column: TableColumn, columnIndex: number) => {
                        const cellData = rowData && rowData[column.key];
                        return <VirtualTableCell
                            key={`cell_${column.key}`}
                            dataKey={column.key}
                            cellRenderer={cellRenderer}
                            column={column}
                            columns={columns}
                            rowData={rowData}
                            cellData={cellData}
                            rowIndex={index}
                            columnIndex={columnIndex}/>;
                    })}
                </VirtualTableRow>
            );
        }, []);

        // might need to delete this section, idk what it is used for or what it does
        const [hovered, setHovered] = useState(false);

        const onClick = useCallback((event: React.SyntheticEvent) => onRowClick
            ? onRowClick({
                rowData: parentRowData,
                rowIndex,
                event
            })
            : undefined, [onRowClick, parentRowData, rowIndex]);

        const setOnHoverTrue = useCallback(() => setHovered(true), []);
        const setOnHoverFalse = useCallback(() => setHovered(false), []);
        //

        return (
            <ParentVirtualTableRowInner
                onClick={onClick}
                size={size}
                cursor={onRowClick ? "pointer" : undefined}
                hovered={hoverRow && hovered}
                style={{ ...(style), width: "fit-content" }}
                onMouseEnter={setOnHoverTrue}
                onMouseMove={setOnHoverTrue}
                onMouseLeave={setOnHoverFalse}>
                <VirtualTableRow
                    key={`row_${rowIndex}`}
                    rowData={parentRowData}
                    rowIndex={rowIndex}
                    onRowClick={onRowClick}
                    columns={columns}
                    hoverRow={hoverRow}
                    style={{
                        ...style,
                        top: `calc(${style.top}px + 50px)`
                    }}
                    size={size}>
                    {columns.map((column: TableColumn, columnIndex: number) => {
                        const cellData = parentRowData && parentRowData[column.key];
                        return <VirtualTableCell
                            key={`cell_${column.key}`}
                            dataKey={column.key}
                            cellRenderer={cellRenderer}
                            column={column}
                            columns={columns}
                            rowData={parentRowData}
                            cellData={cellData}
                            rowIndex={rowIndex}
                            columnIndex={columnIndex}/>;
                    })}
                </VirtualTableRow>
                <VariantsToggle>

                </VariantsToggle>
                <ListDisplay>
                    <List
                        outerRef={outerRef}
                        innerElementType={innerElementType}
                        width={width}
                        height={height}
                        overscanCount={4}
                        itemCount={itemCount}
                        onScroll={onScroll}
                        itemSize={itemSize}>
                        {Row}
                    </List>
                </ListDisplay>
            </ParentVirtualTableRowInner>
        );
    },
    equal
);

export default ParentVirtualTableRow