declare module '*.module.scss' {
  const classes: { [className: string]: React.CSSProperties };
  export default classes;
}