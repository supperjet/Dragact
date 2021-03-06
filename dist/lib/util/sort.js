export function quickSort(a) {
    return a.length <= 1 ? a : quickSort(a.slice(1).filter(function (item) { return item <= a[0]; })).concat(a[0], quickSort(a.slice(1).filter(function (item) { return item > a[0]; })));
}
export var sortLayout = function (layout) {
    return [].concat(layout).sort(function (a, b) {
        if (a.GridY > b.GridY || (a.GridY === b.GridY && a.GridX > b.GridX)) {
            if (a.static)
                return 0; //为了静态，排序的时候尽量把静态的放在前面
            return 1;
        }
        else if (a.GridY === b.GridY && a.GridX === b.GridX) {
            return 0;
        }
        return -1;
    });
};
export var getMaxContainerHeight = function (layout, elementHeight, elementMarginBottom) {
    if (elementHeight === void 0) { elementHeight = 30; }
    if (elementMarginBottom === void 0) { elementMarginBottom = 10; }
    var ar = layout.map(function (item) {
        return item.GridY + item.h;
    });
    var h = quickSort(ar)[ar.length - 1];
    var height = h * (elementHeight + elementMarginBottom) + elementMarginBottom;
    return height;
};
