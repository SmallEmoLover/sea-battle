import { useState } from "react";

/**
 * React hook for handling html <input> elements
 * @param {*} initial - initial value of the input
 * @returns {} {value, onChange}; value - <input> value attribute, 
 * onChange - <input> onChange callback
 */
function useInput(initial='') {
    const [value, setValue] = useState(initial);
    const onChange = (event) => {
        setValue(event.target.value);
    };

    return {value, onChange};
}

export default useInput;
