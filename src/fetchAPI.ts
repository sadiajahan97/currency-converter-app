const API_URL_LATEST = `https://v6.exchangerate-api.com/v6/${
  import.meta.env.VITE_API_KEY
}/latest/USD/`;
const API_URL_PAIR = `https://v6.exchangerate-api.com/v6/${import.meta.env.VITE_API_KEY}/pair/`;

interface jsonResponseTypeLatest {
  result: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  base_code: string;
  conversion_rates: { [key: string]: number };
}

interface jsonResponseTypePair {
  result: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  base_code: string;
  target_code: string;
  conversion_rate: number;
  conversion_result: number;
}

export const fetchCodes = async () => {
  try {
    const response = await fetch(API_URL_LATEST);
    if (response.ok) {
      const jsonResponse: jsonResponseTypeLatest = await response.json();
      if (jsonResponse) {
        return Object.keys(jsonResponse.conversion_rates);
      } else {
        throw new Error('Failed to parse JSON response.');
      }
    } else {
      throw new Error('Request from API server failed.');
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchConversion = async (amount: string, base: string, target: string) => {
  try {
    const response = await fetch(`${API_URL_PAIR}${base}/${target}/${amount}`);
    if (response.ok) {
      const jsonResponse: jsonResponseTypePair = await response.json();
      if (jsonResponse) {
        return [jsonResponse.conversion_rate, jsonResponse.conversion_result];
      } else {
        throw new Error('Failed to parse JSON response.');
      }
    } else {
      throw new Error('Request from API server failed.');
    }
  } catch (error) {
    console.error(error);
  }
};
