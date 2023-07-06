import React from "react";
import { FieldProps, Properties, ResolvedProperties } from "../../types";
import { MenuItem, Select } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

import { ExpandablePanel, getIconForProperty, isHidden, pick } from "../../core";
import { LabelWithIcon } from "../components";
import { useClearRestoreValue } from "../../hooks";
import { PropertyFieldBinding } from "../PropertyFieldBinding";
import { InputLabel } from "../../components";
import { FieldHelperText } from "../components/FieldHelperText";

/**
 * Field that renders the children property fields
 *
 * This is one of the internal components that get mapped natively inside forms
 * and tables to the specified properties.
 * @category Form fields
 */
export function MapFieldBinding<T extends Record<string, any>>({
                                                                   propertyKey,
                                                                   value,
                                                                   showError,
                                                                   error,
                                                                   disabled,
                                                                   property,
                                                                   setValue,
                                                                   tableMode,
                                                                   includeDescription,
                                                                   underlyingValueHasChanged,
                                                                   autoFocus,
                                                                   context
                                                               }: FieldProps<T>) {

    const pickOnlySomeKeys = property.pickOnlySomeKeys || false;
    const expanded = (property.expanded === undefined ? true : property.expanded) || autoFocus;

    if (!property.properties) {
        throw Error(`You need to specify a 'properties' prop (or specify a custom field) in your map property ${propertyKey}`);
    }

    let mapProperties: ResolvedProperties;
    if (pickOnlySomeKeys) {
        if (value) {
            mapProperties = pick(property.properties,
                ...Object.keys(value)
                    .filter(key => key in property.properties!)
            );
        } else {
            mapProperties = {};
        }
    } else {
        mapProperties = property.properties;
    }

    useClearRestoreValue({
        property,
        value,
        setValue
    });

    const mapFormView = <>
        <div className="py-1 flex flex-col space-y-2">
            {Object.entries(mapProperties)
                .filter(([_, property]) => !isHidden(property))
                .map(([entryKey, childProperty], index) => {
                        const fieldProps = {
                            propertyKey: `${propertyKey}.${entryKey}`,
                            disabled,
                            property: childProperty,
                            includeDescription,
                            underlyingValueHasChanged,
                            context,
                            tableMode: false,
                            partOfArray: false,
                            autoFocus: autoFocus && index === 0
                        };
                        return (
                            <div key={`map-${propertyKey}-${index}`}>
                                <PropertyFieldBinding
                                    {...fieldProps}/>
                            </div>
                        );
                    }
                )}
        </div>

        {pickOnlySomeKeys && buildPickKeysSelect(disabled, property.properties, setValue, value)}

    </>;

    const title = <LabelWithIcon icon={getIconForProperty(property)}
                                 required={property.validation?.required}
                                 title={property.name}
                                 className={"text-text-secondary dark:text-text-secondary-dark ml-3.5"}/>;

    return (
        <>

            {!tableMode && <ExpandablePanel initiallyExpanded={expanded}
                                            contentClassName={"p-2 md:p-4"}
                                            title={title}>{mapFormView}</ExpandablePanel>}

            {tableMode && mapFormView}

            <FieldHelperText includeDescription={includeDescription}
                             showError={showError}
                             error={error}
                             property={property}/>

        </>
    );
}

const buildPickKeysSelect = (disabled: boolean, properties: Properties, setValue: (value: any) => void, value: any) => {

    const keys = Object.keys(properties)
        .filter((key) => !value || !(key in value));

    const handleAddProperty = (event: SelectChangeEvent) => {
        setValue({
            ...value,
            [event.target.value as string]: null
        });
    };

    if (!keys.length) return <></>;

    return <div className={"m-4"}>
        <InputLabel>Add property</InputLabel>
        <Select
            variant={"standard"}
            value={""}
            disabled={disabled}
            onChange={handleAddProperty}>
            {keys.map((key) => (
                <MenuItem key={key} value={key}>
                    {(properties as Properties)[key].name || key}
                </MenuItem>
            ))}
        </Select>
    </div>;
};

