import { Foo, FooInit } from "./foo.js";

export class SimpleLoader<ResultType> {
  constructor(protected readonly executeLoad: () => Promise<ResultType>) {}
}

export class FooLoader extends SimpleLoader<Foo> {
  private static _fooModule: Foo | null = null;

  protected override async executeLoad(): Promise<Foo> {
    if (FooLoader._fooModule) {
      return Promise.resolve(FooLoader._fooModule);
    }

    const init = (await import("../node_modules/@private/wasm/demo.js")) as FooInit;
    const fooModule: Foo = await init.default({
      locateFile(path: string) {
        if (path.endsWith(".wasm")) {
          return new URL(
            "../node_modules/@private/wasm/demo.wasm",
            import.meta.url
          ).href;
        } else {
          return path;
        }
      },
    });
    FooLoader._fooModule = fooModule;
    delete (FooLoader._fooModule as never)["then"];
    return FooLoader._fooModule;
  }
}