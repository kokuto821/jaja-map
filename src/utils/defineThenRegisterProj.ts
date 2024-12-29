import { register } from "ol/proj/proj4";
// GISで広く使用されている座標変換ライブラリ
import proj4 from "proj4";

/**
 * OpenLayersで使用するProjectionを定義、登録する。
 *
 * OpenLayersで日本測地系が使用可能となる
 */
export const defineThenRegisterProj = (): void => {
  proj4.defs([
    [
      // 座標系の名称
      "EPSG:4301",
      // PROJ.4形式で書かれた座標系の定義
      "+proj=longlat +ellps=bessel +towgs84=-146.414,507.337,680.507,0,0,0,0 +axis=neu +no_defs",
    ],
  ]);

  // 定義した座標系（日本測地系）をOpenLayersに登録する

  // 定義を追加、変更する度に呼ばないとOpenLayersに適用されない
  // https://openlayers.org/en/latest/apidoc/module-ol_proj_proj4.html#.register
  register(proj4);
};
