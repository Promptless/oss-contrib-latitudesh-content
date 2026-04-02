---
title: "Improvements and fixes"
slug: "improvements-and-fixes-july-2023"
type: "Improvement"
dateOfRelease: "2023-07-19T00:00:00.000Z"
images:
  - url: "images/improvements-and-fixes-july-2023/24WWUkIOwFLnqnpnFFMuRx.png"
    alt: "Improvements and Fixes on Latitude.sh"
    width: 1600
    height: 900
---

- **Reserved instances self-serve: **You can now create [Reserved projects](https://docs.latitude.sh/docs/on-demand-vs-reserved#reserved)** **from the dashboard and API. This allows deploying reserved instances and resources without talking to our sales team. Use the `provisioning_type` attribute to create Reserved projects from the API.
- **Improved IP Addresses page: **The IP Addresses page has been redesigned to show more information about the Management and Additional IPs assigned to your team. If you use the API, the `/ips` endpoint has been enriched with all the necessary data to make managing IPs easier.
- **Create server page: **We have redesigned the [create server](https://metal.new) page to make finding the perfect instance easier. You now select the instance before choosing the location you want it deployed. This avoids going through several locations to find the instance you want.
- **New API version now in beta: **Version *2023-06-01 *is now in beta. The new version removes deprecated attributes from the current version and introduces a new format for the `id` attribute. The new ID format is fully backward compatible with the old one. The new API version also improves complex endpoints such as `GET /plans`. To test the latest version, the `API-Version: 2023-06-01` on your request Header.
