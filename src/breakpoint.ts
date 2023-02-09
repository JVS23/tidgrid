function createBreakpoint(name: string, value: string): string  {
  return `@mixin ${name} {
    @media only screen and (min-width: ${value}) {
      @content;
    }
  }`
}

export {
  createBreakpoint
};
