import posthog from "posthog-js";

export const posthogLogger = {
  info(message: string, attributes?: Record<string, string>) {
    posthog.logger.info(message, attributes);
  },
};
