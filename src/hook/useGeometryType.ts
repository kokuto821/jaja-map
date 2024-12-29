import { SelectChangeEvent } from "@mui/material";
import { Type } from "ol/geom/Geometry";
import { useCallback, useState } from "react";

/**
 * ジオメトリタイプの選択状態を管理するカスタムフック
 */

const GEOMETRY_TYPE = [
  "Point",
  "LineString",
  "Polygon",
  "MultiPoint",
  "MultiLineString",
  "MultiPolygon",
  "GeometryCollection",
  "Circle",
];

export const useGeometryType = () => {
  const [geometryType, setGeometryType] = useState<Type>("Point");

  const changeGeometry = useCallback((event: SelectChangeEvent<Type>) => {
    const typeGuard = (value: string): value is Type => {
      return GEOMETRY_TYPE.includes(value);
    };

    const newValue = event.target.value;

    if (typeGuard(newValue)) {
      setGeometryType(newValue);
    }
  }, []);

  return { geometryType, changeGeometry };
};
