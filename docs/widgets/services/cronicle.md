---
title: Cronicle
description: Cronicle Widget Configuration
---

Learn more about [Cronicle](https://github.com/jhuckaby/Cronicle).

The Cronicle widget retrieves the total number of success, the number failed events, the last success event date and the last failed event date.

Find your API key under `Admin > API Keys tab > Add API Key... > Create Key`.

Allowed fields: `["success", "failed", "lastSuccess", "lastFailed"]`.

Optionally, the widget can filter events with a list of event ids.

Note: events retrieved in descending chronological order.
 
```yaml
widget:
  type: cronicle
  url: http://your.cronicle.host:port
  api_key: your_cronicle_api_key
  limit: 50  # Optional: the number of events (default 100)
  eventsIds:  # Optional: the list of events to filter
    - emXXX
    - emYYY
```
