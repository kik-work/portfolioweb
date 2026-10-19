// Shared id helpers so a tab and its panel can reference each other (WAI-ARIA tabs).
export const tabId = (prefix: string, id: string) => `${prefix}-tab-${id}`;
export const panelId = (prefix: string, id: string) => `${prefix}-panel-${id}`;
