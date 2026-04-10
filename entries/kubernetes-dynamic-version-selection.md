---
title: "Kubernetes version selection on cluster creation"
slug: "kubernetes-dynamic-version-selection"
type: "Platform"
dateOfRelease: "2026-04-10"
---

You can now choose which Kubernetes version to deploy when creating a new cluster.

- **Dashboard**: Select your preferred version from the dropdown during cluster creation. The latest version is selected by default.

- **API**: Specify a `kubernetes_version` when creating a cluster. If omitted, the latest version is used. The API validates your selection against available versions.
