using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// 查询检索的结果，影像数据资源
/// </summary>
public class GeoData
{
    /// <summary>
    /// 资源名称
    /// </summary>
    public string Name { get; set; }
    /// <summary>
    /// 位置点
    /// </summary>
    public GeoLonLat Location { get; set; }
}