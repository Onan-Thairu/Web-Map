window.onload = init;

function init(){
    const map = new ol.Map({
        view: new ol.View({
            center: [36.8333, -1.1667],
            zoom: 7,
            maxZoom: 15,
            minZoom: 4,
            projection: 'EPSG:4326',
            extent: [36.4916229248047, -1.31446027755737, 37.3634796142578, -0.759291648864746],
        }),
        target: 'js-map'
    })

    //Basemaps layers
    const openStreetMapStandard = new ol.layer.Tile({
        source: new ol.source.OSM(),
        visible: true,
        title: 'OSMStandard',
    })
    
    const kiambuCounty = new ol.layer.Image({
        source: new ol.source.ImageWMS({
            url: 'http://localhost:8080/geoserver/kiambu_county/wms',
            params: {'LAYERS':'kiambu_county:kiambu','VERSION': '1.1.1','TILED':true, 'FORMAT': 'image/png', 'CRS':'EPSG:4326'},
            serverType: 'geoserver',
        }),
        visible: true,
        title: 'KiambuCounty',
    })

    const secondary_schools = new ol.layer.Image({
        source: new ol.source.ImageWMS({
            url: 'http://localhost:8080/geoserver/wms',
            params: {'LAYERS':'kiambu_county:secondary_schools', 'VERSION':'1.1.0','TILED':true},
            serverType: 'geoserver',
        }),
        visible: false,
        title: 'SecondarySchools',
    })

    const protected_areas = new ol.layer.Image({
        source: new ol.source.ImageWMS({
            url: 'http://localhost:8080/geoserver/kiambu_county/wms',
            params: {'LAYERS':'kiambu_county:protected_areas', 'VERSION':'1.1.0', 'TILED':true},
            serverType:'geoserver',
        }),
        visible: false,
        title: 'ProtectedAreas',
    })

    const roads = new ol.layer.Image({
        source: new ol.source.ImageWMS({
            url:'http://localhost:8080/geoserver/kiambu_county/wms',
            params: {'LAYERS':'kiambu_county:roads', 'VERSION':'1.1.0', 'TILED':true},
            serverType: 'geoserver',
        }),
        visible: false,
        title: 'Roads',
    })

    const villages = new ol.layer.Image({
        source: new ol.source.ImageWMS({
            url:'http://localhost:8080/geoserver/kiambu_county/wms',
            params: {'LAYERS':'kiambu_county:villages', 'VERSION':'1.1.0', 'TILED':true},
            serverType: 'geoserver',
        }),
        visible: false,
        title: 'Villages',
    })

    // Layer Group
    map.addLayer(openStreetMapStandard)
    map.addLayer(kiambuCounty)

    const baseLayerGroup = new ol.layer.Group({
        layers: [
            secondary_schools, protected_areas, roads, villages
        ]
    })
    map.addLayer(baseLayerGroup);

    // Layer Switcher Logic for Basemaps
    const baseLayerElements = document.querySelectorAll('.sidebar > input[type=radio]');
    for (let baseLayerElement of baseLayerElements){
        baseLayerElement.addEventListener('change', function(){
            let baseLayerElementValue = this.value;
            baseLayerGroup.getLayers().forEach(function(element, index, array){
                let baseLayerTitle = element.get('title');
                element.setVisible(baseLayerTitle === baseLayerElementValue);
            })
        })
    }

    // Vector Feature popup logic
    //map.on('click', function(e){
    //    map.forEachFeatureAtPixel(e.pixel, function(feature, layer){
    //        console.log(feature.getKeys());
    //    })
    //})


}