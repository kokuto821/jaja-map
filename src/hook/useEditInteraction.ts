import { useState, useCallback } from "react";

// 各インタラクションの編集ができるかどうかを管理するカスタムフック
export const useEditInteraction = () => {
  const [isDrawEditInteraction, setIsDrawEditInteraction] = useState(false);
  const [isModifyEditInteraction, setIsModifyEditInteraction] = useState(false);
  // const [isEditState,setIsEditState] = useState<'draw'| 'modify'| 'none'>('none');

  const toggleDrawEdit = useCallback(() => {
    setIsDrawEditInteraction((prev) => !prev); // !isDrawEditInteraction
    setIsModifyEditInteraction(false); // DrawインタラクションがONになるとき ModifyインタラクションがOFFになる
  }, []);

  const toggleModifyEdit = useCallback(() => {
    setIsModifyEditInteraction((prev) => !prev);
    setIsDrawEditInteraction(false); // ModifyインタラクションがONになるとき DrawインタラクションがOFFになる
  }, []);

  return {
    isDrawEditInteraction,
    isModifyEditInteraction,
    toggleDrawEdit,
    toggleModifyEdit,
  };
};
