import { useState } from "react";
import Select from "react-select";
import { FixedSizeList as List } from "react-window";

// npm uninstall react-select react-window

const options = Array.from({ length: 20 }, (_, i) => ({
  value: `option-${i + 1}`,
  label: `Option ${i + 1}`,
}));

const heightPerItem = 40;

const MenuList = (props) => {
  const { options, children, getValue, maxHeight } = props;
  const [value] = getValue();
  const initialOffset = options.indexOf(value) * heightPerItem;

  return (
    <List
      height={Math.min(maxHeight, options.length * heightPerItem)}
      itemCount={children.length}
      itemSize={heightPerItem}
      initialScrollOffset={initialOffset}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style} key={index}>
          {children[index]}
        </div>
      )}
    </List>
  );
};

const VirtualizedSelect = () => {
  const handleChange = (selectedOption) => {
    console.log("Selected value:", selectedOption.value);
  };

  return (
    <Select
      options={options}
      onChange={handleChange}
      components={{ MenuList }}
      placeholder="Select an option"
    />
  );
};

export default VirtualizedSelect;
