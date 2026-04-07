---
title: "Kubernetes cluster version upgrades"
slug: "kubernetes-version-upgrades"
type: "Platform"
dateOfRelease: "2026-04-07"
---

You can now upgrade Kubernetes clusters to newer versions directly through the API.

- **Check available versions** using `GET /kubernetes_clusters/available_versions` to see the latest supported minor versions
- **Monitor upgrade status** with the new `version_status` and `available_upgrade` fields on cluster responses—see if your cluster is `up_to_date`, has an `upgrade_available`, or is running an `unsupported` version
- **Upgrade your cluster** by sending the target version to `PATCH /kubernetes_clusters/:id` with the `kubernetes_version` parameter

Upgrades follow standard safeguards: one minor version at a time, no downgrades, and upgrades cannot run during scaling operations.
