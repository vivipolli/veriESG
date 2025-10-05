export type ExternalSourceKey = "nasa" | "mapbiomas" | "copernicus";

type ExternalRequest = {
  metric: string;
  referenceDate: string;
  coordinates?: { lat: number; lng: number };
};

type ExternalResponse = {
  value: number;
  metadata: Record<string, unknown>;
};

export async function fetchExternalData(
  source: ExternalSourceKey,
  payload: ExternalRequest,
  apiKey?: string,
): Promise<ExternalResponse> {
  const mockValue = 80;
  return {
    value: mockValue,
    metadata: {
      source,
      referenceDate: payload.referenceDate,
      metric: payload.metric,
      apiKeyProvided: Boolean(apiKey),
    },
  };
}

export function getSourceApiKey(source: ExternalSourceKey) {
  const keyMap: Record<ExternalSourceKey, string | undefined> = {
    nasa: process.env.NASA_API_KEY,
    mapbiomas: process.env.MAPBIOMAS_API_KEY,
    copernicus: process.env.COPERNICUS_API_KEY,
  };
  return keyMap[source];
}

