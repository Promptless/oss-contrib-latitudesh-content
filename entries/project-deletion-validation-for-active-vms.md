---
title: "Project deletion validation for active VMs"
slug: "project-deletion-validation-for-active-vms"
type: "VMs"
dateOfRelease: "2026-04-09"
---

Projects with active VMs can no longer be deleted. Attempting to delete a project with running VMs now returns a 422 error listing the VM IDs that need attention.

This prevents accidental data loss by requiring you to handle running VMs before removing their parent project. To proceed, archive or delete the active VMs, then retry the deletion.

Archived VMs do not block project deletion.
