---
title: "Improvements and fixes"
slug: "improvements-and-fixes"
type: "New"
dateOfRelease: "2023-02-10T00:00:00.000Z"
---

- **Latitude.sh Terraform Provider**: Shipped version [0.2.1](https://registry.terraform.io/providers/latitudesh/latitudesh/latest/docs) with support for deploying servers with SSH and user data and fixed an issue that prevented project settings from being updated.
- **Updated API URL**: The default API URL is now *api.latitude.sh*. The old URL will continue working indefinitely.
- **Go client library: **Released version [0.1.3](https://github.com/latitudesh/latitudesh-go).
- **Dashboard: **Improved several aspects of the dashboard to provide better interactions with dropdowns, selects, and more.
- **API: **Added the *ipmi_status* to *GET /servers* responses to retrieve the health status of a server's IPMI connection.
- **User permissions**: Collaborators can now update the deploy config of a server.
- **Bandwidth alerts**: Improved notifications for [bandwidth alerts](https://docs.latitude.sh/docs/bandwidth-alerts) to avoid sending too many emails.
