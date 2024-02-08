load("@npm//:defs.bzl", "npm_link_all_packages")
load("//common/bazel:opt_ts.bzl", "opt_ts_project")
load("@aspect_rules_js//npm:defs.bzl", "npm_package")

npm_link_all_packages(name = "node_modules")

opt_ts_project(
    name = "ts",
    srcs = [
        "src/foo.ts",
        "src/fooLoader.ts",
    ],
    declaration = True,
    out_dir = "dist",
    root_dir = "src",
    tsconfig = {
        "compilerOptions": {
            "lib": [
                "ESNext",
                "DOM",
            ],
            "module": "ESNext",
            "outDir": "dist",
            "declaration": True,
            "declarationMap": True,
            "moduleResolution": "node",
            "noImplicitOverride": False,
            "isolatedModules": False,
        },
        "include": ["src/**/*.ts"],
    },
    validate = True,
    deps = [
        ":node_modules/@private/my-tool",
        ":node_modules/@private/my-wasm",
        ":node_modules/@types/emscripten",
        ":node_modules/tslib",
    ],
)

npm_package(
    name = "lib",
    srcs = [
        "package.json",
        ":ts",
    ] + glob(["src/**/*.ts"]),
    include_runfiles = False,  # copy_to_directory_action optimization
    include_transitive_declarations = False,  # copy_to_directory_action optimization
    include_transitive_sources = False,  # copy_to_directory_action optimization
    tags = ["top-level"],
    visibility = ["//visibility:public"],
)
