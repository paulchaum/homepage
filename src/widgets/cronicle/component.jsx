import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";

import Container from "components/services/widget/container";
import Block from "components/services/widget/block";
import useWidgetAPI from "utils/proxy/use-widget-api";

export default function Component({ service }) {
  const { t } = useTranslation();
  const { widget } = service;
  const { eventsIds } = widget;
  const { data, error } = useWidgetAPI(widget, "info");

  const [nbSuccess, setNbSuccess] = useState(0);
  const [nbFailed, setNbFailed] = useState(0);
  const [lastFailedDate, setLastFailedDate] = useState(null);
  const [lastSuccessDate, setLastSuccessDate] = useState(null);

  useEffect(() => {
    if (data && data.rows) {
      // Descending sort by time_start
      data.rows = data.rows.sort((a, b) => (a.time_start > b.time_start ? -1 : 1))

      // Count success
      setNbSuccess(data.rows.reduce((acc, cur) => {
        // Filter on eventsIds
        if (eventsIds && eventsIds.includes(cur.event) && cur.has_error === 0)
          return acc + 1;
        return acc;
      }, 0));

      // Count failed
      setNbFailed(data.rows.reduce((acc, cur) => {
        // Filter on eventsIds
        if (eventsIds && eventsIds.includes(cur.event) && cur.has_error > 0)
          return acc + 1;
        return acc;
      }, 0));

      // Get last success date
      const lastSuccess = data.rows.find(cur => eventsIds && eventsIds.includes(cur.event) && cur.has_error === 0);
      setLastSuccessDate(lastSuccess ? new Date(lastSuccess.time_start * 1000 + lastSuccess.elapsed) : null);

      // Get last failed date
      const lastFailed = data.rows.find(cur => eventsIds && eventsIds.includes(cur.event) && cur.has_error > 0);
      setLastFailedDate(lastFailed ? new Date(lastFailed.time_start * 1000 + lastFailed.elapsed) : null);
    }
  }, [data, eventsIds]);

  if (error) {
    return <Container service={service} error={error} />;
  }

  if (!data) {
    return (
      <Container service={service}>
        <Block label="cronicle.success" />
        <Block label="cronicle.failed" />
        <Block label="cronicle.lastSuccess" />
        <Block label="cronicle.lastFailed" />
      </Container>
    );
  }

  return (
    <Container service={service}>
      <Block label="cronicle.success" value={t("common.number", { value: nbSuccess })} />
      <Block label="cronicle.failed" value={t("common.number", { value: nbFailed })} />
      {
        lastFailedDate ? (
          <Block label="cronicle.lastSuccess" value={t("common.relativeDate", { value: lastSuccessDate })} />
        ) : (
          <Block label="cronicle.lastSuccess" value={t("common.bytes", { value: "Never" })} />
        )
      }
      {
        lastFailedDate ? (
          <Block label="cronicle.lastFailed" value={t("common.relativeDate", { value: lastFailedDate })} />
        ) : (
          <Block label="cronicle.lastFailed" value={t("common.bytes", { value: "Never" })} />
        )
      }
    </Container>
  );
}
