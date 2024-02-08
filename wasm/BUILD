load("@rules_cc//cc:defs.bzl", "cc_binary", "cc_library")
load("@npm//:defs.bzl", "npm_link_all_packages")
load("@emsdk//emscripten_toolchain:wasm_rules.bzl", "wasm_cc_binary")
load("@aspect_rules_js//npm:defs.bzl", "npm_package")

npm_link_all_packages(name = "node_modules")

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

RELEASE_COPTS = [
    "-O3",
]

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

RELEASE_LINKOPTS = [
    "-O3",
]

COPTS = select({
    ":debug_opts": BASE_COPTS + DEBUG_COPTS,
    ":release_opts": BASE_COPTS + RELEASE_COPTS,
    "//conditions:default": BASE_COPTS + DEBUG_COPTS,
})

LINKOPTS = select({
    ":debug_opts": BASE_LINKOPTS + DEBUG_LINKOPTS,
    ":release_opts": BASE_LINKOPTS + RELEASE_LINKOPTS,
    "//conditions:default": BASE_LINKOPTS + DEBUG_LINKOPTS,
})

config_setting(
    name = "release_opts",
    values = {"compilation_mode": "opt"},
    visibility = ["//visibility:public"],
)

config_setting(
    name = "debug_opts",
    values = {"compilation_mode": "dbg"},
    visibility = ["//visibility:public"],
)

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
    tags = ["top-level"],
    include_runfiles = False,  # copy_to_directory_action optimization
    include_transitive_declarations = False,  # copy_to_directory_action optimization
    include_transitive_sources = False,  # copy_to_directory_action optimization
    visibility = ["//visibility:public"],
)
