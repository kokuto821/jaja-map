import { Map } from "ol";
import GeoJSON from "ol/format/GeoJSON";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import { OSM, TileWMS } from "ol/source";
import VectorSource from "ol/source/Vector";
import { useEffect, useMemo } from "react";
import useMovingPoint from "./useMovingPoint";

// GeoJSON

const GEO_JSON_DATA = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [140.6511824, 39.7016468],
      },
      properties: {
        name: "田沢湖_Point",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [
          [140.67, 39.71],
          [140.65, 39.71],
        ],
      },
      properties: {
        name: "田沢湖_LineString",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [140.6655, 39.7245], // 左下
            [140.6755, 39.7245], // 右下
            [140.6755, 39.7345], // 右上
            [140.6655, 39.7345], // 左上
            [140.6655, 39.7245], // 左下（閉じる）
          ],
        ],
      },
      properties: {
        name: "田沢湖_Polygon",
      },
    },
  ],
};

// レイヤー情報を管理するカスタムフック
export const useMapLayer = (map: Map) => {
  const { movingPointLayer } = useMovingPoint(map);
  const vectorSource = useMemo(() => {
    return new VectorSource({
      features: new GeoJSON().readFeatures(GEO_JSON_DATA),
    });
  }, []);

  const layers = useMemo(() => {

    // ラスタレイヤー
    const OSMLayer = new TileLayer({
      source: new OSM(),
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });
    return [OSMLayer, vectorLayer,movingPointLayer];
  }, [movingPointLayer, vectorSource]);

  useEffect(() => {
    if (!map) return;

    map.setLayers(layers);

    return () => {
      layers.forEach((layer) => map.removeLayer(layer));
    };
  }, [map, layers]);

  return { vectorSource };
};
