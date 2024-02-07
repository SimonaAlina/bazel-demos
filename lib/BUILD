load("@aspect_rules_ts//ts:defs.bzl", "ts_config", "ts_project")
load("@npm//:defs.bzl", "npm_link_all_packages")
load("@aspect_rules_js//npm:defs.bzl", "npm_package")

npm_link_all_packages(name = "node_modules")

ts_config(
    name = "tsconfig",
    src = "tsconfig.json",
    visibility = [":__subpackages__"],
)

ts_project(
    name = "ts",
    srcs = [
        "src/foo.ts",
        "src/fooLoader.ts",
    ],
    tsconfig = ":tsconfig",
    deps = [
        ":node_modules/@private/my-wasm",
        ":node_modules/@types/emscripten",
    ],
)

npm_package(
    name = "lib",
    srcs = [
        "package.json",
        ":ts",
    ],
    include_runfiles = False,  # copy_to_directory_action optimization
    include_transitive_declarations = False,  # copy_to_directory_action optimization
    include_transitive_sources = False,  # copy_to_directory_action optimization
    package = "@private/my-wasm",
    visibility = ["//visibility:public"],
)
