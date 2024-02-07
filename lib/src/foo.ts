
export interface Foo extends EmscriptenModule {
  FromCmds(commands: number[][]): unknown;
  MOVE_VERB: number;
  LINE_VERB: number;
  QUAD_VERB: number;
  CONIC_VERB: number;
  CUBIC_VERB: number;
  CLOSE_VERB: number;
}

/**
 * emscripten initialization routine for pathkit
 */
export interface FooInit {
  default(initOptions: { locateFile: (path: string) => string }): Promise<Foo>;
}
