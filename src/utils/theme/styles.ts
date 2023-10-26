import { SxProps } from "@mui/joy/styles/types";

export const combineStyles = (
  ...styles: (SxProps | undefined)[]
): SxProps => {
  return styles.reduce(
    (accum, style) => ({
      ...accum,
      ...style,
    }),
    {} as SxProps
  )!;
}