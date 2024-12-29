import { memo, useEffect, useRef } from "react";
import { useMap } from "../hook/useMap";
import { useMapLayer } from "../hook/useMapLayer";
import { useDraw } from "../hook/useDraw";
import { Type } from "ol/geom/Geometry";
import { useModify } from "../hook/useModify";
import useMovingPoint from "../hook/useMovingPoint";

type Props = {
  height: string;
  geometryType: Type;
  isDrawEditInteraction: boolean;
  isModifyEditInteraction: boolean;
};

// 地図を表示するコンポーネント
export const SampleMap = memo(
  ({
    height,
    geometryType,
    isDrawEditInteraction,
    isModifyEditInteraction,
  }: Props) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const { map } = useMap({ mapRef });
    const { vectorSource } = useMapLayer(map);

    const { addDrawInteraction, removeDrawInteraction } = useDraw({
      map,
      geometryType,
      vectorSource,
    });

    const { addModifyInteraction, removeModifyInteraction } = useModify({
      map,
      vectorSource,
    });
    
    useMovingPoint(map);


    useEffect(() => {
      isDrawEditInteraction ? addDrawInteraction() : removeDrawInteraction();
    }, [addDrawInteraction, isDrawEditInteraction, removeDrawInteraction]);

    useEffect(() => {
      isModifyEditInteraction
        ? addModifyInteraction()
        : removeModifyInteraction();
    }, [
      addModifyInteraction,
      isModifyEditInteraction,
      removeModifyInteraction,
    ]);

    return <div ref={mapRef} style={{ width: "100%", height: height }}></div>;
  }
);
