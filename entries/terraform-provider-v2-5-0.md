---
title: " Terraform Provider v2.5.0"
slug: "terraform-provider-v2-5-0"
type: "API"
dateOfRelease: "2025-09-04T00:00:00.000Z"
---

In this update, we enhanced our Terraform provider with improved error handling, resource validation, and documentation to streamline deployment and resource management workflows:

- Fixed import functionality for invalid SSH keys in `latitudesh_ssh_key` resource
- Improved resource import logic
- Added server hostname validation to ensure proper configuration
- Added SSH key data source for improved resource discovery
- Enhanced `latitudesh_tag` resource with flexible input handling, normalization, and validation

You can learn more about it in our [Terraform Docs](https://registry.terraform.io/providers/latitudesh/latitudesh/latest).
