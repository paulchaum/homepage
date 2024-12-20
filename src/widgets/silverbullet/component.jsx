import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";

import Container from "components/services/widget/container";
import Block from "components/services/widget/block";
import useWidgetAPI from "utils/proxy/use-widget-api";

export default function Component({ service }) {
  const { t } = useTranslation();
  const { widget } = service;
  const { eventsIds } = widget;
  const { data, error } = useWidgetAPI(widget, "index");

  const [nbPages, setNbPages] = useState(0);
  const [lastModified, setLastModified] = useState(null);
  const [size, setSize] = useState(0);
  const [nbAttachments, setNbAttachments] = useState(0);

  useEffect(() => {
    if (data) {
      // Count pages: exclude files in Library/, in _plug/, SETTINGS.md and keep only text/markdown
      setNbPages(data.filter(item => !/^(Library\/|_plug\/)|SETTINGS\.md$/.test(item.name) && item.contentType === 'text/markdown').length);

      setLastModified(new Date(data.reduce((latest, item) => item.lastModified > latest.lastModified ? item : latest, data[0]).lastModified));

      setSize(data.reduce((sum, item) => sum + item.size, 0));

      // Count attachments: exclude files in Library/, in _plug/, SETTINGS.md and exclude text/markdown
      setNbAttachments(data.filter(item => !/^(Library\/|_plug\/)|SETTINGS\.md$/.test(item.name) && item.contentType !== 'text/markdown').length);
    }
  }, [data, eventsIds]);


  if (error) {
    return <Container service={service} error={error} />;
  }

  if (!data) {
    return (
      <Container service={service}>
        <Block label="silverbullet.pages" />
        <Block label="silverbullet.last_modified" />
        <Block label="silverbullet.size" />
        <Block label="silverbullet.attachments" />
      </Container>
    );
  }

  return (
    <Container service={service}>
      <Block label="silverbullet.pages" value={t("common.number", { value: nbPages })} />
      <Block label="silverbullet.last_modified" value={t("common.relativeDate", { value: lastModified })} />
      <Block label="silverbullet.size" value={t("common.bytes", { value: size })} />
      <Block label="silverbullet.attachments" value={t("common.number", { value: nbAttachments })} />
    </Container>
  );
}
