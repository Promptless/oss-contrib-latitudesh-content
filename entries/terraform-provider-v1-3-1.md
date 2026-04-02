---
title: "Terraform Provider v1.3.1"
slug: "terraform-provider-v1-3-1"
type: "API"
dateOfRelease: "2025-05-15T00:00:00.000Z"
---

Version 1.3.1 of our Terraform provider is now available, bringing improvements to deployment reliability and configuration management. What's new:

- **Improved Deployment Handling:** The provider now waits for server deployments to complete and automatically erases the state if a deployment fails, ensuring a cleaner and more reliable infrastructure provisioning process.
- **Enhanced Virtual Network Management:** Fixed idempotency issues when assigning virtual networks, resulting in more predictable and stable Terraform runs.

Check out the [Terraform Docs](https://registry.terraform.io/providers/latitudesh/latitudesh/latest) to learn more.
