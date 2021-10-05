export const updateObjectArray = (items: any, itemId: any, objPropName: any, newObjProps: any) => {
    return items.map((fr: any) => {
        if (fr[objPropName] === itemId) {
            return { ...fr, ...newObjProps }
        }
        return fr;
    })
}