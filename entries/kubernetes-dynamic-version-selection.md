---
title: "Kubernetes dynamic version selection on cluster creation"
slug: "kubernetes-dynamic-version-selection"
type: "API"
dateOfRelease: "2026-04-09"
---

Kubernetes cluster creation now supports dynamic version selection with built-in validation.

- **Automatic version selection**: When you create a cluster without specifying a `kubernetes_version`, the API automatically selects the latest available version from `GET /kubernetes_clusters/available_versions`.

- **Version validation**: The API validates your `kubernetes_version` against available versions. Invalid versions return an error listing all valid options.
