export const updateObjectArray = (items, itemId, objPropName, newObjProps) => {
    return items.map(fr => {
        if (fr[objPropName] === itemId) {
            return { ...fr, ...newObjProps }
        }
        return fr;
    })
}