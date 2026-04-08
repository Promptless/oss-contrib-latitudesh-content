---
title: "Improved VM status reliability"
slug: "improved-vm-status-reliability"
type: "VMs"
dateOfRelease: "2026-04-08T00:00:00.000Z"
---

VM status is now more reliable and consistent. Background watchers update status values in real-time instead of computing them on each API request.

**Available status values:**

- `Running` — VM is operational and reachable
- `Starting` — VM is booting up
- `Stopped` — VM is powered off
- `Stopping` — VM is shutting down
- `Failed` — VM encountered an error

We removed the "Configuring network" status as it was too sensitive to transient network conditions.

[View your VMs](https://www.latitude.sh/dashboard/virtual-machines)
