var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import * as React from 'react';
import { Dragact } from '../lib/dragact';
import './index.css';
var Words = [
    { content: 'Sorry I just can not move in any circumstances', static: true },
    { content: 'Those who dare to fail miserably can achieve greatly.' },
    { content: 'You miss 100 percent of the shots you never take.' },
    { content: 'Sorry I just can not move in any circumstances,too' },
    { content: 'I’d rather live with a good question than a bad answer.' }
];
var fakeData = function () {
    var Y = 0;
    return Words.map(function (item, index) {
        if (index % 4 === 0)
            Y++;
        return __assign({}, item, { GridX: index % 4 * 4, GridY: Y * 4, w: 4, h: 4, key: index + '', canResize: false });
    });
};
var Cell = function (props) {
    var item = props.item;
    return (React.createElement("div", { className: "layout-Cell " + (item.static ? "static" : ""), style: { background: item.static ? "#e8e8e8" : "" } },
        React.createElement("div", { style: { paddingLeft: 12, color: '#595959' } }, item.content)));
};
export var SortedTableWithStatic = function () {
    return (React.createElement("div", { style: { display: 'flex', justifyContent: 'center' } },
        React.createElement("div", null,
            React.createElement("h1", { style: { textAlign: 'center' } }, "\u9759\u6001\u7EC4\u4EF6 Demo"),
            React.createElement(Dragact, { width: 600, col: 16, rowHeight: 30, margin: [2, 2], className: 'normal-layout', layout: fakeData(), placeholder: true }, function (item, isDragging) {
                return React.createElement(Cell, { item: item });
            }))));
};
