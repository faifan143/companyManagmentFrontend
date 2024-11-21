/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

export const selectStyle = {
  control: (base) => ({
    ...base,
    backgroundColor: "var(--color-main)",
    borderColor: "var(--color-dark)",
    color: "white",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "var(--color-dark)",
  }),

  option: (base, state) => ({
    ...base,

    color: state.isFocused ? "black" : "white",
    cursor: "pointer",
  }),
};
