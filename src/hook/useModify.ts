import { useState, useEffect, useCallback } from "react";
import { Map } from "ol";
import VectorSource from "ol/source/Vector";
import Modify from "ol/interaction/Modify";

type Props = {
  map: Map | null;
  vectorSource: VectorSource;
};

// Modifyインタラクションを管理するカスタムフック
export const useModify = ({ map, vectorSource }: Props) => {
  const [modify, setModify] = useState<Modify | null>(null);

  const addModifyInteraction = useCallback(() => {
    if (map && modify) {
      map.addInteraction(modify);
    }
  }, [map, modify]);

  const removeModifyInteraction = useCallback(() => {
    if (map && modify) {
      map.removeInteraction(modify);
    }
  }, [map, modify]);

  useEffect(() => {
    if (!map || !vectorSource) return; // 以降のコードの不正な実行を防ぐ

    // Modifyインタラクションの初期化
    const newModify = new Modify({
      source: vectorSource,
    });

    setModify(newModify);

    // クリーンアップ
    return () => {
      map.removeInteraction(newModify);
    };
  }, [map, vectorSource]);

  return { modify, addModifyInteraction, removeModifyInteraction };
};
