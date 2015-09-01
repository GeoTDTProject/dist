<%@ WebHandler Language="C#" Class="GeoDataQuery" %>

using System;
using System.Web;
using System.Collections.Generic;
using System.Runtime.Serialization.Json;

public class GeoDataQuery : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        //获取查询类型
        //QueryType queryType = (QueryType)(int.Parse(context.Request.QueryString["querytype"]));
        //获取查询方式
        QueryMode queryModel = (QueryMode)(int.Parse(context.Request.QueryString["querymode"]));
        //获取点数组
        string pointArrStr = context.Request.QueryString["pointarr"];

        List<GeoLonLat> pointList = new List<GeoLonLat>();
        pointList = JsonHelper.ParseFromJson<List<GeoLonLat>>(pointArrStr);
        
        //TODO获取到区域范围后搜索数据输出到前端
        QueryGeoDataHelper helper = new QueryGeoDataHelper();
        List<GeoData> geoDatas = helper.QueryGeoDataByRect(pointList);
        //输出到前台
        string jsonStr = JsonHelper.GetJson<List<GeoData>>(geoDatas);

        HttpResponse res = context.Response;
        res.ContentType = "application/json";
        res.Write(jsonStr);
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }
}