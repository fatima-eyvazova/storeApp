export interface Props {
  setOpenModal: (bool: boolean) => void;
  itemId?: string;
  itemIdList?: string[];
  resource: string;
  setUpdateList: React.Dispatch<React.SetStateAction<boolean>>;
  onDelete: () => void;
}
