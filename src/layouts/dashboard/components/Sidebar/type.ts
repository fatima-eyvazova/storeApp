export interface MenuItem {
  icon: JSX.Element;
  name: string;
  isOpen: boolean;
  onClick: () => void;
}
