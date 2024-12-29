import { useState, useEffect, RefObject} from "react";
import { Map, View } from "ol";

type Props = {
  mapRef: RefObject<HTMLDivElement | null>;
}

export const useMap = ({ mapRef }: Props) => {
  const [map, setMap] = useState<Map>(new Map()); // Mapがまだ初期化されていない場合のためにnullを許可

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    // mapの初期化
    const initialMap = new Map({
      view: new View({
        center: [141.1399034, 39.6986494],
        projection: "EPSG:4301",
        zoom: 14,
      }),
      target: mapRef.current,
    });

    setMap(initialMap);

    // クリーンアップ関数
    return () => {
      initialMap.setTarget(undefined);
      initialMap.dispose();
    };
  }, [mapRef]);

  return { map };
};
