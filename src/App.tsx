import { SampleMap } from "./components/SampleMap";
import { defineThenRegisterProj } from "./utils/defineThenRegisterProj";
import { MainHeaderTools } from "./components/MainHeaderTools";
import { Stack } from "@mui/system";
import { useEditInteraction } from "./hook/useEditInteraction";
import { useGeometryType } from "./hook/useGeometryType";
import { GeometrySelector } from "./components/GeometrySelector";

defineThenRegisterProj(); // 日本測地系をOpenLayersで使用可能にする。

export const App = () => {
  const {
    isDrawEditInteraction,
    isModifyEditInteraction,
    toggleDrawEdit,
    toggleModifyEdit,
  } = useEditInteraction();

  const { geometryType, changeGeometry } = useGeometryType();

  return (
    <Stack height="100vh" direction="column" sx={{ overflow: "hidden" }}>
      <MainHeaderTools
        height="6vh"
        isDrawEditInteraction={isDrawEditInteraction}
        isModifyEditInteraction={isModifyEditInteraction}
        toggleDrawEdit={toggleDrawEdit}
        toggleModifyEdit={toggleModifyEdit}
      />
      <SampleMap
        height={isDrawEditInteraction ? "88vh" : "94vh"}
        geometryType={geometryType}
        isDrawEditInteraction={isDrawEditInteraction}
        isModifyEditInteraction={isModifyEditInteraction}
      />
      {isDrawEditInteraction && (
        <GeometrySelector
          height={"6vh"}
          geometryType={geometryType}
          changeGeometry={changeGeometry}
        />
      )}
    </Stack>
  );
};
