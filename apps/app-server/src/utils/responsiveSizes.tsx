export default function ResponsiveSize(width: number) {
  return `calc(${width / 64}rem + ${width / 24}vw)`
}
