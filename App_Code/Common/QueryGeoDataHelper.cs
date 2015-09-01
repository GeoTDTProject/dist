using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// QueryGeoDataHelper 的摘要说明
/// </summary>
public class QueryGeoDataHelper
{
	public QueryGeoDataHelper()
	{
		//
		// TODO: 在此处添加构造函数逻辑
		//
	}

    public List<GeoData> QueryGeoDataByRect(List<GeoLonLat> points)
    {
        List<GeoData> result = new List<GeoData>();
        result.Add(new GeoData()
        {
            Name = "1",
            Location = new GeoLonLat() { Seq = 1, Lon = 116.28695, Lat = 39.9109 }
        });
        result.Add(new GeoData()
        {
            Name = "2",
            Location = new GeoLonLat() { Seq = 2, Lon = 116.3024, Lat = 39.90063 }
        });
        result.Add(new GeoData()
        {
            Name = "3",
            Location = new GeoLonLat() { Seq = 3, Lon = 116.34154, Lat = 39.89405 }
        });
        result.Add(new GeoData()
        {
            Name = "4",
            Location = new GeoLonLat() { Seq = 4, Lon = 116.40539, Lat = 39.89141 }
        });
        result.Add(new GeoData()
        {
            Name = "5",
            Location = new GeoLonLat() { Seq = 5, Lon = 116.4435, Lat = 39.90142 }
        });
        result.Add(new GeoData()
        {
            Name = "6",
            Location = new GeoLonLat() { Seq = 6, Lon = 116.43801, Lat = 39.91432 }
        });

        return result;
    }
}

