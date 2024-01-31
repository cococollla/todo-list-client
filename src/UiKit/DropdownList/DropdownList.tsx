import { useEffect, useRef, useState } from "react";
import styles from "./DropdownList.module.css";
import DropDownProps from "./DropdownList.props";

const DropdownList = <T extends { id: number; name: string }>({
  selectedOption,
  onSelect,
  options,
  selectMessage,
}: DropDownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOpenDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOption = (option: T) => {
    onSelect(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropDownRef.current &&
      !dropDownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  return (
    <div className={styles.dropdown} ref={dropDownRef}>
      <div
        className={`${styles.dropdown_header} ${isOpen ? styles.open : ""}`}
        onClick={handleOpenDropdown}
      >
        {selectedOption ? <div>{selectedOption.name}</div> : selectMessage}
        <img
          src={
            isOpen ? "svg/drop-down-arrow-2.svg" : "svg/drop-down-arrow-1.svg"
          }
        />
      </div>
      {isOpen && (
        <div className={styles.category_list}>
          {options.map((option) => (
            <div
              key={option.id}
              onClick={() => handleClickOption(option)}
              className={`${styles.dropdown_item} ${
                selectedOption?.id === option.id ? styles.selected : ""
              }`}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownList;
