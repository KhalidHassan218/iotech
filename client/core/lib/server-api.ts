import axios, { type AxiosInstance } from "axios";

export interface ApiResponse<T = unknown> {
  data: T | null;
  error: ApiError | null;
}

export interface ApiError {
  status: number;
  message: string;
  raw?: unknown;
}

interface ApiSuccessResponse<T> {
  data: T;
  status?: string;
  message?: string;
}

interface ApiErrorResponse {
  error?: string;
  message?: string;
  status?: number;
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

class ServerApiClient {
  private client: AxiosInstance;

  constructor() {
    const strapiUrl =
      process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

    this.client = axios.create({
      baseURL: `${strapiUrl}/api`,
      validateStatus: (status) => status < 500, // only reject network/5xx
      headers: {
        "Content-Type": "application/json",

        // Prevent caching for dynamic data
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  }

  async get<T = unknown>(
    endpoint: string,
    locale?: string
  ): Promise<ApiResponse<T>> {
    return this.request<T>("GET", endpoint, undefined, locale);
  }

  async post<T = unknown, D = unknown>(
    endpoint: string,
    data?: D,
    locale?: string
  ): Promise<ApiResponse<T>> {
    return this.request<T>("POST", endpoint, data, locale);
  }

  async put<T = unknown, D = unknown>(
    endpoint: string,
    data?: D,
    locale?: string
  ): Promise<ApiResponse<T>> {
    return this.request<T>("PUT", endpoint, data, locale);
  }

  async delete<T = unknown>(
    endpoint: string,
    locale?: string
  ): Promise<ApiResponse<T>> {
    return this.request<T>("DELETE", endpoint, undefined, locale);
  }

  private normalizeError(
    status: number,
    payload: unknown,
    fallback: string
  ): ApiError {
    if (typeof payload === "string") {
      if (payload.startsWith("<!DOCTYPE html")) {
        return {
          status,
          message: fallback || "Unexpected server response",
          raw: payload,
        };
      }
      return { status, message: payload, raw: payload };
    }

    if (typeof payload === "object" && payload !== null) {
      const data = payload as ApiErrorResponse;
      return {
        status,
        message: (data.message ?? data.error ?? fallback) || "Unknown error",
        raw: payload,
      };
    }

    return {
      status,
      message: fallback || "Unknown error",
      raw: payload,
    };
  }

  private async request<T>(
    method: HttpMethod,
    endpoint: string,
    data?: unknown,
    locale?: string
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.request<
        ApiSuccessResponse<T> | ApiErrorResponse | string
      >({
        method,
        url: endpoint,
        data,
        headers: {
          ...(locale && { "Accept-Language": locale }),
        },
      });

      if (response.status >= 400) {
        // eslint-disable-next-line no-console
        console.error(`[API ERROR] ${method} ${endpoint}:`, response.data);
        return {
          data: null,
          error: this.normalizeError(
            response.status,
            response.data,
            response.statusText
          ),
        };
      }
      const successData = response.data as ApiSuccessResponse<T>;
      return {
        data: successData.data,
        error: null,
      };
    } catch (err) {
      // Network/unexpected errors
      let message = "Network or request failed";
      if (err instanceof Error) message = err.message;
      if (typeof err === "string") message = err;

      return {
        data: null,
        error: {
          status: 0,
          message,
          raw: err,
        },
      };
    }
  }
}

export const serverApi = new ServerApiClient();
