/**
 * Created by lmq on 2015/8/30.
 */

var map;
var zoom = 12;
var lineTool;
var rectTool;
var polygonTool;
var mapmousemove;
var markerTool, marker;
function loadMap() {
    var config1 = {
        type: "TMAP_NAVIGATION_CONTROL_LARGE",   //缩放平移的显示类型
        anchor: "TMAP_ANCHOR_TOP_LEFT",          //缩放平移控件显示的位置
        offset: [0, 0],                           //缩放平移控件的偏移值
        showZoomInfo: true                       //是否显示级别提示信息，true表示显示，false表示隐藏。
    };
    //初始化地图对象
    map = new TMap("mapDiv", config1);
    //设置显示地图的中心点和级别
    map.centerAndZoom(new TLngLat(116.40969, 39.89945), zoom);
    map.enableHandleMouseScroll();
    map.enableDoubleClickZoom();
    map.enableHandleKeyboard();
    map.checkResize();

    //创建缩放平移控件对象
    control = new TNavigationControl(config1);
    //添加缩放平移控件
    map.addControl(control);

    //创建比例尺控件对象
    var scale = new TScaleControl();
    //添加比例尺控件
    map.addControl(scale);
    //创建地图类型控件对象
    var control = new TMapTypeControl();
    //将地图类型控件添加到地图上
    map.addControl(control);
    var config2 = {
        strokeColor: "blue", //折线颜色
        strokeWeight: "3px", //折线的宽度，以像素为单位
        strokeOpacity: 0.5, //折线的透明度，取值范围0 - 1
        strokeStyle: "solid"	//折线的样式，solid或dashed
    };
    //创建测距工具对象
    lineTool = new TPolylineTool(map, config2);
    //注册测距工具绘制完成后的事件
    TEvent.addListener(lineTool, "draw", onDrawLine);

    var config3 = {
        strokeColor: "blue", //折线颜色
        fillColor: "#FFFFFF", //填充颜色。当参数为空时，折线覆盖物将没有填充效果
        strokeWeight: "3px", //折线的宽度，以像素为单位
        strokeOpacity: 0.5, //折线的透明度，取值范围0 - 1
        fillOpacity: 0.5			//填充的透明度，取值范围0 - 1
    };
    //创建测面工具对象 
    polygonTool = new TPolygonTool(map, config3);
    //注册测面工具绘制完成后的事件
    TEvent.addListener(polygonTool, "draw", onDrawPolygon);
    //添加鼠标在地图上的滑动事件
    addMapMousemove();

    //矩形
    rectTool = new TRectTool(map,config3);
    TEvent.addListener(rectTool, "draw", onDrawRect);

    //创建标注工具对象
    markerTool = new TMarkTool(map);
    //注册标注的mouseup事件
    TEvent.addListener(markerTool, "mouseup", mouseup);
}
//鼠标在地图上按下左键时添加一个点标记
function mouseup(point) {
    marker = new TMarker(point);
    map.addOverLay(marker);
    markerTool.close();
}
//添加鼠标在地图上的滑动事件
function addMapMousemove() {

    //移除掉以前的注册事件
    TEvent.removeListener(mapmousemove);
    //注册鼠标在地图上的滑动事件
    mapmousemove = TEvent.addListener(map, "mousemove", function (p) {
        //将像素坐标转换成经纬度坐标
        var lnglat = map.fromContainerPixelToLngLat(p);
//        if (Ext.getCmp("strLatLon") != null) {
//            Ext.getCmp("strLatLon").setText("鼠标位置:  " + lnglat.getLng() + "," + lnglat.getLat());
//        }
    });
}
//移除鼠标在地图上的滑动事件
function removeMapMousemove() {
    TEvent.removeListener(mapmousemove);
}
//关闭测距工具
function onDrawLine(bounds, line, obj) {
    if(obj==undefined)
    {
        return;
    }

    var arr = obj.getLngLats();

    setGrid(arr);

    lineTool.close();
}
//关闭测面工具
function onDrawPolygon(bounds, num, polygon) {
    if(polygon==undefined)
    {
        return;
    }

    setGrid(bounds);
    polygonTool.close();
}
function onDrawRect(bounds,rect){
    if(rect==undefined)
    {
        return;
    }
    var bound = rect.getBounds();

    var xmin = bound.XminNTU;
    var xmax = bound.XmaxNTU;
    var ymin = bound.YminNTU;
    var ymax = bound.YmaxNTU;

    var arr = new Array();
    var lefttop =new TLngLat(xmin,ymin);
    var righttop = new TLngLat(xmax,ymin);
    var leftbottom =new TLngLat(xmin,ymax);
    var rightbottom = new TLngLat(xmax,ymax);
    arr.push(lefttop);
    arr.push(righttop);
    arr.push(leftbottom);
    arr.push(rightbottom);

    setGrid(arr);

    rectTool.close();
}
function closeALL() {
    lineTool.close();
    polygonTool.close();
    markerTool.close();
    rectTool.close();
}
function fillCountry() {
    map.setCenter(new TLngLat(106.99886, 33.96413)); //将地图定位到北京顺义
    map.setZoom(4);  //将视图切换到指定的缩放等级，中心点坐标不变
}
function fillBeiJing() {
    map.setCenter(new TLngLat(116.40969, 39.89945)); //将地图定位到北京顺义
    map.setZoom(12);  //将视图切换到指定的缩放等级，中心点坐标不变
}

$(document).ready(function(){
    $('#btn_query_line').click(function(){
        closeALL();
        lineTool.open();
    });

    $('#btn_query_rectangle').click(function(){
        closeALL();
        rectTool.open();
    });

    $('#btn_query_polygon').click(function(){
        closeALL();
        polygonTool.open();
    });

    $('#btnstartquery').click(function () {
        queryGeoData();
    });
});

function setGrid(arr){
    $("#grid").bootgrid("clear");
    for(i=0;i<arr.length;i++)
    {
        $("#grid").bootgrid("append", [{
            Seq: i+1,
            Lon: arr[i].getLng(),
            Lat: arr[i].getLat()
        }]);
    }
}

function queryGeoData() {
    //TODO先清除结果
    clearGeoData();
    //TODO读取grid的值
    var arr = $("#grid").bootgrid("getCurrentRows");
    if (!(arr.length > 0)) {
        //TODO弹出先选择数据对话框
    }
    else {
        //TODO开始ajax
        $.get(
            "../handler/GeoDataQuery.ashx",
            {
                querytype: 0,
                querymode: 0,
                pointarr: JSON.stringify(arr)
            },
            function (data) {
                setQueryResult(data);
                markOnMap(data);
            }
        );
    }
}

function clearGeoData(){
    $('#graph_query_result').empty();
}

function setQueryResult(data) {
    var arr = data;
        $.each(arr,function(i,n){
           //TODO加到检索列表中
            $('#graph_query_result').append("<div class='queryresult'><div>"+
            n.Name+
            "</div>"+
            "<a style='cursor: pointer;'>"+
             n.Location.Lon+","+n.Location.Lat+
            "</a></div>");
        });
}

function markOnMap(data){
    var arr = data;
    $.each(arr,function(i,n){
        //创建标注对象
        marker = new TMarker(new TLngLat(n.Location.Lon,n.Location.Lat));
        //向上地图上添加标注
        map.addOverLay(marker);
        //注册标注的点击事件
//        TEvent.addListener(marker,"click",onClick);
    });
}