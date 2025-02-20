import { useEffect, useState } from "react";

export type ComboBoxOption = {
  id: number;
  name: string;
};

type ComboBoxProps = {
  filterValue: string;
  options: ComboBoxOption[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNewResourceClick: (resourceName: string) => void;
  onResourceClick: (resourceId: number) => void;
  resourceType: string;
};

export const ComboBox = ({
  filterValue,
  onChange,
  onResourceClick,
  onNewResourceClick,
  options,
  resourceType,
}: ComboBoxProps) => {
  const [filteredOptions, setFilteredOptions] = useState<ComboBoxOption[]>([
    ...options.slice(0, 5),
  ]);

  const filterOptions = () =>
    setFilteredOptions([
      ...options
        .filter((option) => option.name.includes(filterValue))
        .slice(0, 5),
    ]);

  useEffect(() => {
    if (filterValue.length >= 1) {
      filterOptions();
    } else {
      setFilteredOptions([...options.slice(0, 5)]);
    }
  }, [filterValue]);

  return (
    <div className="group mr-4 w-full">
      <div id="combo-box" className="relative">
        <input
          value={filterValue}
          onChange={onChange}
          type="text"
          role="combobox"
          id="combo-input"
          aria-expanded="false"
          aria-autocomplete="list"
          aria-activedescendant=""
          aria-controls="combo-menu"
          placeholder={`Select a ${resourceType}`}
          className="border-norway-500 mr-4 h-12 w-full border-b text-xl font-medium tracking-wider focus-visible:border-b-2 focus-visible:outline-0"
        />
      </div>
      {/** end of combo-box container*/}
      <ul
        id="combo-menu"
        className={`border-norway-50 sticky overflow-hidden rounded-lg border bg-white shadow-xl`}
        role="listbox"
        aria-label="combo box options"
      >
        {filteredOptions.map(({ id, name }) => (
          <li
            id={`option-${id}`}
            className="text-base-600 hover:bg-base-50 hover:text-norway-800 flex h-12 cursor-pointer items-center gap-4 p-3 text-sm"
            role="option"
            aria-selected="false"
          >
            {name}
          </li>
        ))}
        {!filteredOptions.length && (
          <li
            className="text-base-600 p-3"
            onClick={() => onNewResourceClick(filterValue)}
          >{`Add new ${resourceType}`}</li>
        )}
      </ul>
    </div> // end of component
  );
};
