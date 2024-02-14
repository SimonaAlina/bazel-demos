export abstract class SimpleLoader<ResultType> {
  protected abstract executeLoad(): Promise<ResultType>;
}

export class FooLoader extends SimpleLoader<String> {
  private static _fooModule: String | null = null;

  protected override async executeLoad(): Promise<String> {
    if (FooLoader._fooModule) {
      return Promise.resolve(FooLoader._fooModule);
    }
    delete (FooLoader._fooModule as never)["then"];
    return FooLoader._fooModule;
  }
}