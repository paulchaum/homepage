---
title: SilverBullet
description: SilverBullet Widget Configuration
---

Learn more about [SilverBullet](https://github.com/silverbulletmd/silverbullet).

The SilverBullet widget retrieves the number of pages, date of last modification, total content size and number of attachments.

Allowed fields: `["pages", "last_modified", "size", "attachments"]`.

Note: these pages are excluded, except for total size, as they are part of the SilverBullet configuration:

- page SETTINGS
- pages in Library/
- pages in _plug/

```yaml
widget:
  type: silverbullet
  url: http://your.silverbullet.host:port
```
