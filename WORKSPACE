# workspace(
#     name = "path-mapper",
# )

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

http_archive(
    name = "aspect_rules_js",
    sha256 = "7130820ce72d11489501479accc0072d45e53a916e4abc5e91b680b7374b3dad",
    strip_prefix = "rules_js-1.37.0",
    url = "https://github.com/aspect-build/rules_js/releases/download/v1.37.0/rules_js-v1.37.0.tar.gz",
)

load("@aspect_rules_js//js:repositories.bzl", "rules_js_dependencies")

rules_js_dependencies()

load("@rules_nodejs//nodejs:repositories.bzl", "nodejs_register_toolchains")

nodejs_register_toolchains(
    name = "nodejs",
    node_version = "16.14.2",  # same as .nvmrc
)

load("@aspect_rules_js//npm:npm_import.bzl", "npm_translate_lock")

npm_translate_lock(
    name = "npm",
    pnpm_lock = "@//:pnpm-lock.yaml",
    pnpm_version = "8.7.6",
)

# Translated repositories:
load("@npm//:repositories.bzl", "npm_repositories")

npm_repositories()

##################
# rules_ts setup #
##################

http_archive(
    name = "aspect_rules_ts",
    sha256 = "bd3e7b17e677d2b8ba1bac3862f0f238ab16edb3e43fb0f0b9308649ea58a2ad",
    strip_prefix = "rules_ts-2.1.0",
    url = "https://github.com/aspect-build/rules_ts/releases/download/v2.1.0/rules_ts-v2.1.0.tar.gz",
)

load("@aspect_rules_ts//ts:repositories.bzl", "rules_ts_dependencies")

rules_ts_dependencies(
    ts_version_from = "//:package.json",
)

http_archive(
    name = "emsdk",
    sha256 = "a882560a83cbacec67867e7ce6b00420d557e71c501b523d2ed956ded021f9b4",
    strip_prefix = "emsdk-3.1.47/bazel",
    url = "https://github.com/emscripten-core/emsdk/archive/refs/tags/3.1.47.tar.gz",
)

load("@emsdk//:deps.bzl", emsdk_deps = "deps")

emsdk_deps()

load("@emsdk//:emscripten_deps.bzl", emsdk_emscripten_deps = "emscripten_deps")

emsdk_emscripten_deps(emscripten_version = "3.1.47")

load("@emsdk//:toolchains.bzl", "register_emscripten_toolchains")

register_emscripten_toolchains()