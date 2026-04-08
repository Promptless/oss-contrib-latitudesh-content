---
title: "Kubernetes patch-aware version upgrades"
slug: "kubernetes-patch-aware-version-upgrades"
type: "API"
dateOfRelease: "2026-04-08"
---

The Kubernetes cluster version API now recommends patch upgrades before minor version jumps and includes a response format update.

- **Patch upgrades first**: The `available_upgrade` field now shows patch version upgrades before suggesting a minor version jump. If your cluster is on `v1.35.1` and `v1.35.3` is available, you'll see the patch upgrade first.

- **Build metadata upgrades**: RKE2 build updates (like `+rke2r1` to `+rke2r2`) are now recognized as valid upgrade paths.

- **Response format update**: The `GET /kubernetes_clusters/available_versions` endpoint now returns `{ minor, latest }` instead of `{ version, minor }`. The `version` field has been renamed to `latest`.

