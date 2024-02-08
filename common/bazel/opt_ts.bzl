"""ts_project transition to opt"""

load("@with_cfg.bzl", "with_cfg")
load("@aspect_rules_ts//ts:defs.bzl", "ts_project")
load("@aspect_rules_js//js:providers.bzl", "JsInfo")

opt_ts_project, _opt_ts_project_internal = with_cfg(
    kind = ts_project,
    extra_providers = [JsInfo],
).set("compilation_mode", "opt").build()
