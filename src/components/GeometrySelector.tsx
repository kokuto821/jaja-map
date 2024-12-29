import Box from "@mui/material/Box";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Type } from "ol/geom/Geometry";

type Props = {
  height: string;
  geometryType: Type;
  changeGeometry: (event: SelectChangeEvent<Type>) => void;
};

const GEOMETRY_TYPES = [
  "Point",
  "LineString",
  "Polygon",
  "Circle",
  "MultiPoint",
  "MultiLineString",
  "MultiPolygon",
];

/**
 *ジオメトリタイプの選択欄が表示されるコンポーネント
 */

export const GeometrySelector: React.FC<Props> = ({
  height,
  geometryType,
  changeGeometry,
}) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      width="100vw"
      height={height}
      bgcolor="#FFF"
      alignItems="center"
      sx={{
        userSelect: "none",
      }}
    >
      <Select
        value={geometryType}
        onChange={changeGeometry}
        sx={{
          width: { xs: "45vw", md: "20vw" },
          height: "80%",
          overflow: "hidden", //設定しないと選択画面を開いたときに、selectの下側に空白が追加される
          marginLeft: 1,
        }}
      >
        {GEOMETRY_TYPES.map((type) => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};
