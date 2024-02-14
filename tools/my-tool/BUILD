load("@aspect_rules_ts//ts:defs.bzl", "ts_config")
load("@npm//:defs.bzl", "npm_link_all_packages")
load("@aspect_rules_js//npm:defs.bzl", "npm_package")
load("//common/bazel:opt_ts.bzl", "opt_ts_project")

npm_link_all_packages(name = "node_modules")

ts_config(
    name = "tsconfig",
    src = "tsconfig.json",
    visibility = [":__subpackages__"],
)

opt_ts_project(
    name = "ts",
    srcs = [
        "src/index.ts",
    ],
    out_dir = "dist",
    root_dir = "src",
    declaration = True,
    tsconfig = ":tsconfig",
    deps = [":node_modules/tslib"],
)

npm_package(
    name = "my-tool",
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
