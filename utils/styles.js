export const colourStyles = {
    control: (base) => ({
        ...base,
        boxShadow: "none",
        border: "1px solid #D9D9D9",
        fontFamily: "yekanBold",
        borderRadius: "6px",
    }),
    valueContainer: (provided, state) => ({
        ...provided,
        height: "43px",
        padding: "0 6px",
    }),

    input: (provided, state) => ({
        ...provided,
        margin: "0px",
    }),
    indicatorSeparator: (state) => ({
        display: "none",
    }),
    indicatorsContainer: (provided, state) => ({
        ...provided,
        height: "43px",
    }),
    noOptionsMessage: (provided, state) => ({
        ...provided,
        fontFamily: "yekanBold",
        fontSize: "11px",
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
            ...styles,
            fontFamily: "yekanBold",
            fontSize: "11px",
        };
    },
};
