---
title: "Kubernetes cluster upgrade visibility"
slug: "kubernetes-cluster-upgrade-visibility"
type: "Platform"
dateOfRelease: "2026-04-08"
---

Kubernetes clusters now show real-time upgrade status in the dashboard and API.

Previously, clusters displayed "Ready" throughout upgrades, making it unclear whether the process was progressing. Now you'll see an "Upgrading" status during version rolling updates, with separate status indicators for control plane and worker node upgrades.

The cluster detail API response includes `control_plane_status` and `worker_status` fields that show "upgrading" during their respective phases, so you know exactly which components are being updated.
