import React from "react";

import { EnumValuesChip } from "../components/CustomChip";
import { PropertyPreviewProps } from "../internal";
import { resolveEnumValues } from "../../core/util/entities";

/**
 * @category Preview components
 */
export function NumberPropertyPreview({
                                  value,
                                  property,
                                  size
                              }: PropertyPreviewProps<number>): React.ReactElement {

    if (property.enumValues) {
        const enumKey = value;
        const enumValues = resolveEnumValues(property.enumValues);
        return <EnumValuesChip
            enumId={enumKey}
            enumValues={enumValues}
            small={size !== "regular"}/>;
    } else {
        return <>{value}</>;
    }
}
