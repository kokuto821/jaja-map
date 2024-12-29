import { useState, useEffect, useCallback } from "react";
import { Map } from "ol";
import Draw from "ol/interaction/Draw";
import VectorSource from "ol/source/Vector";
import { Type } from "ol/geom/Geometry";

type Props = {
  map: Map | null;
  geometryType: Type;
  vectorSource: VectorSource;
};

// Drawインタラクションを管理するカスタムフック
export const useDraw = ({ map, geometryType, vectorSource }: Props) => {
  const [draw, setDraw] = useState<Draw | null>(null);

  const addDrawInteraction = useCallback(() => {
    if (map && draw) {
      map.addInteraction(draw);
    }
  }, [map, draw]);

  const removeDrawInteraction = useCallback(() => {
    if (map && draw) {
      map.removeInteraction(draw);
    }
  }, [map, draw]);

  useEffect(() => {
    if (!map || !vectorSource) return; // 以降のコードの不正な実行を防ぐ

    // Drawインタラクションの初期化
    const newDraw = new Draw({
      source: vectorSource,
      type: geometryType,
    });

    setDraw(newDraw);

    // クリーンアップ
    return () => {
      map.removeInteraction(newDraw);
    };
  }, [map, geometryType, vectorSource]);

  return { draw, addDrawInteraction, removeDrawInteraction };
};
