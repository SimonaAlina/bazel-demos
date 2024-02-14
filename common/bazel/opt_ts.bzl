"""ts_project transition to opt"""

load("@with_cfg.bzl", "with_cfg")
load("@aspect_rules_ts//ts:defs.bzl", "ts_project")
load("@aspect_rules_js//js:providers.bzl", "JsInfo")

_ts_project_builder = with_cfg(
    kind = ts_project,
    extra_providers = [JsInfo],
).set("compilation_mode", "opt")
_ts_project_builder.resettable(Label(":ts_project_original_settings"))
_ts_project_builder.reset_on_attrs("deps")
opt_ts_project, opt_ts_project_reset = _ts_project_builder.build()