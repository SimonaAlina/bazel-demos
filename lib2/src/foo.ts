export interface FooInit {
  default(initOptions: { locateFile: (path: string) => string }): Promise<String>;
}
