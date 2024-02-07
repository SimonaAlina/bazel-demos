import { Foo, FooInit } from "./foo";

export abstract class SimpleLoader<ResultType> {
  protected abstract executeLoad(): Promise<ResultType>;
}

export class FooLoader extends SimpleLoader<Foo> {
  private static _fooModule: Foo | null = null;

  protected override async executeLoad(): Promise<Foo> {
    if (FooLoader._fooModule) {
      return Promise.resolve(FooLoader._fooModule);
    }

    const init = (await import("../node_modules/@private/my-wasm/wasm.bin/demo.js")) as FooInit;
    const fooModule: Foo = await init.default({
      locateFile(path: string) {
        if (path.endsWith(".wasm")) {
          return new URL(
            "../node_modules/@private/my-wasm/wasm.bin/demo.wasm",
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