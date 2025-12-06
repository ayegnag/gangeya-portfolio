export function GangeyaMark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 500 500"
      {...props}
    >
      <path xmlns="http://www.w3.org/2000/svg" d="M 97.396 97.396 L 292.188 97.396 L 292.188 194.792 L 243.49 194.792 L 243.49 146.094 L 97.396 146.094 Z M 48.698 146.094 L 97.396 146.094 L 97.396 389.584 L 48.698 389.584 Z M 97.396 389.584 L 243.49 389.584 L 243.49 438.282 L 97.396 438.282 Z M 194.792 243.49 L 292.188 243.49 L 292.188 389.584 L 389.584 389.584 L 389.584 97.396 L 438.282 97.396 L 438.282 438.282 L 243.49 438.282 L 243.49 292.188 L 194.792 292.188 Z"
          fill="currentColor"
          vectorEffect="non-scaling-stroke"
        />
    </svg>
  );
}

export function getMarkSVG(color: string) {
  return `<svg width="344" height="301" viewBox="0 0 344 301" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M42.948 0H214.74V85.9674H171.792V42.9837H42.948V0ZM0 42.9837H42.948V257.902H0V42.9837ZM42.948 257.902H171.792V300.886H42.948V257.902ZM128.844 128.951H214.74V257.902H300.636V0H343.584V300.886H171.792V171.935H128.844V128.951Z" fill="${color}"/>
</svg>
`;
}
