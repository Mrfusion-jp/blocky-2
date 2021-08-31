function serializeAttributeValue( attribute ) {
    if (attribute.type === 'static') {
        return `"${attribute.value.replace(/"/g, '\\"')}"`;
    } else if (attribute.type === 'blockAttribute') {
        return `attributes.${attribute.value}`;
    }
}

function serializeAttribute( attribute ) {
    return `${attribute.name}: ${serializeAttributeValue(attribute)}`;
}

function serializeChildren( children, serializeElement ) {
    const childrenSerializations = children.map( child => {
        if ( child.type === 'element' ) {
            return serializeElement(child);
        } else if ( child.type === 'text' ) {
            return `"${child.content.replace(/"/g, '\\"')}"`;
        }
    } );
    let childrenStr = "undefined";
    if (childrenSerializations.length === 1) {
        childrenStr = childrenSerializations[0];
    } else if (childrenSerializations.length > 1) {
        childrenStr = `${childrenSerializations.join(",")}`;
    }

    return childrenStr;
}

function serializeAttributes( attributes) {
    const attributesSerialization = attributes.map( serializeAttribute );
    return attributesSerialization.length
        ? `{ ${attributesSerialization.join(",")} }`
        : "null";
}

module.exports = {
    serializeAttributeValue,
    serializeAttribute,
    serializeChildren,
    serializeAttributes
};