---
title: "Terraform Provider v2.0.0"
slug: "terraform-provider-v2-0-0"
type: "API"
dateOfRelease: "2025-06-24T00:00:00.000Z"
---

Version 2.0.0 of our Terraform provider is now available with a complete architectural upgrade that brings significant improvements while maintaining compatibility for most configurations:

- **Performance:** 30-50% faster operations when compared to the previous version, optimized API calls and state management, reduced memory footprint, and better resource efficiency.
- **Reliability:** Runtime error prevention with compile-time type checking, improved state management that better handles edge cases, and enhanced error messages to help you fix issues.
- **Future-proof architecture:** Built on Hashicorp's latest framework, ready for the upcoming Terraform 2.0, and with modern patterns that speed up the addition of new features.

While most configurations will function normally, some important changes have been introduced due to the addition of new API endpoints.

You can check out the [Terraform Docs](https://registry.terraform.io/providers/latitudesh/latitudesh/latest) for an in-depth view of what's changed and our [Migration Guide](https://github.com/latitudesh/terraform-provider-latitudesh/blob/main/MIGRATION_GUIDE_v2.md) to help you get started with the version upgrade.
