type Option = {
  id: number;
  name: string;
};

type ComboBoxProps = {
  options: Option[];
  onClick: (id: number) => void;
};

export const ComboBox = ({ onClick, options }: ComboBoxProps) => {
  return (
    <div className="group mr-4 w-full">
      <div id="combo-box" className="relative">
        <input
          type="text"
          role="combobox"
          id="combo-input"
          aria-expanded="false"
          aria-autocomplete="list"
          aria-activedescendant=""
          aria-controls="combo-menu"
          placeholder="Select a player"
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
        {options.map(({ id, name }) => (
          <li
            id={`option-${id}`}
            className="text-base-600 hover:bg-base-50 flex h-12 cursor-pointer items-center gap-4 p-3 text-sm hover:text-norway-800"
            role="option"
            aria-selected="false"
          >
            {name}
          </li>
        ))}
      </ul>
    </div> // end of component
  );
};
