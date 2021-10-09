declare module '*.module.scss' {
  const classes: { [className: string]: string };
  export default classes;
}

declare module '*.svg' {
  const content: string;
  export default content;
}
