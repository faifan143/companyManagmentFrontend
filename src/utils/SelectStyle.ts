/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

export const selectStyle = {
  control: (base) => ({
    ...base,
    backgroundColor: "#454547",
    borderColor: "#454547",
    color: "white",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#454547",
  }),

  option: (base, state) => ({
    ...base,
    color: state.isFocused ? "black" : "white",
    cursor: "pointer",
  }),
};
