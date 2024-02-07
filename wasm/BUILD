load("@rules_cc//cc:defs.bzl", "cc_binary", "cc_library")
load("@npm//:defs.bzl", "npm_link_all_packages")
load("@emsdk//emscripten_toolchain:wasm_rules.bzl", "wasm_cc_binary")
load("@aspect_rules_js//npm:defs.bzl", "npm_package")

npm_link_all_packages(name = "node_modules")

filegroup(
    name = "srcs",
    srcs = [
        "src/fibonacci.cpp",
    ],
)

filegroup(
    name = "hdrs",
    srcs = [
        "src/fibonacci.h",
    ],
)

BASE_COPTS = [
    "-Wall",
    "-Wc++17-extensions",
    "-Werror",
    "-Wno-deprecated-declarations",
    "-Wno-limited-postlink-optimizations",
]

DEBUG_COPTS = [
    "-g",
    "-gseparate-dwarf",
    "-D DEBUG",
]

COPTS = BASE_COPTS + DEBUG_COPTS

BASE_LINKOPTS = [
    "-Wno-deprecated-declarations",
    "-Wno-limited-postlink-optimizations",
    "--emit-symbol-map",
    "-lembind",
    "-sNO_EXIT_RUNTIME=1",
    "-sALLOW_MEMORY_GROWTH=1",
    "-sERROR_ON_UNDEFINED_SYMBOLS=1",
    "-sWASM=1",
    "-sSTACK_SIZE=5MB",
    "-sEXPORTED_FUNCTIONS=['_malloc','_free']",
    "-sMAX_WEBGL_VERSION=2",
    "-sFULL_ES2=1",
    "-sOFFSCREENCANVAS_SUPPORT=1",
    "-sGL_ASSERTIONS=1",
    "-sDEMANGLE_SUPPORT=1",
]

DEBUG_LINKOPTS = [
    "-g",
    "-gseparate-dwarf",
    "-D DEBUG",
    "-sASSERTIONS=2",
    "-sSAFE_HEAP=1",
    "-sSTACK_OVERFLOW_CHECK=2",
]

LINKOPTS = BASE_LINKOPTS + DEBUG_LINKOPTS

cc_library(
    name = "lib",
    srcs = [":srcs"],
    hdrs = [":hdrs"],
    copts = COPTS,
    strip_include_prefix = "src",
    tags = ["manual"],
)

cc_binary(
    name = "demo",
    srcs = ["src/main.cpp"],
    copts = COPTS,
    linkopts = LINKOPTS,
    tags = ["manual"],
    deps = [":lib"],
)

wasm_cc_binary(
    name = "wasm.bin",
    cc_target = ":demo",
    visibility = ["//visibility:public"],
)

npm_package(
    name = "wasm",
    srcs = [
        "package.json",
        ":wasm.bin",
    ],
    include_runfiles = False,  # copy_to_directory_action optimization
    include_transitive_declarations = False,  # copy_to_directory_action optimization
    include_transitive_sources = False,  # copy_to_directory_action optimization
    package = "@private/my-wasm",
    visibility = ["//visibility:public"],
)
