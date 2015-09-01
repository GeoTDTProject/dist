using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel;

/// <summary>
/// AllEnum 的摘要说明
/// </summary>
[Description("查询类型")]
public enum QueryType
{
    [Description("图形查询")]
    GraphQuery,
    [Description("行政查询")]
    XingZhengQuery,
    [Description("属性查询")]
    AttributeQuery,
    [Description("点查询")]
    PointQuery
}

[Description("查询方式")]
public enum QueryMode
{
    [Description("线方式")]
    LineMode,
    [Description("矩形方式")]
    RectangleMode,
    [Description("多边形查询")]
    PolygonMode
}