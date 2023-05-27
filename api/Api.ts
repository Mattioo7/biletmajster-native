/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Event {
  /**
   * @format int64
   * @example 10
   */
  id: number;
  /** @example "Short description of Event" */
  title: string;
  /**
   * @format int64
   * @example 1673034164
   */
  startTime: number;
  /**
   * @format int64
   * @example 1683034164
   */
  endTime: number;
  /** @example "40.4775315" */
  latitude: string;
  /** @example "-3.7051359" */
  longitude: string;
  /** @example "Long description of Event" */
  name: string;
  /** event status */
  status: EventStatus;
  categories: Category[];
  /**
   * @format int64
   * @example 2
   */
  freePlace: number;
  /**
   * @format int64
   * @example 100
   */
  maxPlace: number;
}

export interface EventWithPlaces {
  /**
   * @format int64
   * @example 10
   */
  id: number;
  /** @example "Short description of Event" */
  title: string;
  /**
   * @format int64
   * @example 1673034164
   */
  startTime: number;
  /**
   * @format int64
   * @example 1683034164
   */
  endTime: number;
  /** @example "40.4775315" */
  latitude: string;
  /** @example "-3.7051359" */
  longitude: string;
  /** @example "Long description of Event" */
  name: string;
  /** event status */
  status: EventStatus;
  categories: Category[];
  /**
   * @format int64
   * @example 2
   */
  freePlace: number;
  /**
   * @format int64
   * @example 100
   */
  maxPlace: number;
  places: Place[];
  /** @example "Seralized place schema" */
  placeSchema?: string;
}

export interface EventForm {
  /** @example "Short description of Event" */
  title: string;
  /** @example "Long description of Event" */
  name: string;
  /**
   * @format int64
   * @example 1673034164
   */
  startTime: number;
  /**
   * @format int64
   * @example 1683034164
   */
  endTime: number;
  /** @example "40.4775315" */
  latitude: string;
  /** @example "-3.7051359" */
  longitude: string;
  /** @example "Seralized place schema" */
  placeSchema?: string;
  /**
   * @format int64
   * @example 2
   */
  maxPlace: number;
  /** @minItems 0 */
  categoriesIds: number[];
}

export interface EventPatch {
  /** @example "Short description of Event" */
  title?: string;
  /** @example "Long description of Event" */
  name?: string;
  /**
   * @format int64
   * @example 1673034164
   */
  startTime?: number;
  /**
   * @format int64
   * @example 1683034164
   */
  endTime?: number;
  /** @example "40.4775315" */
  latitude?: string;
  /** @example "-3.7051359" */
  longitude?: string;
  /** @example "Seralized place schema" */
  placeSchema?: string;
  /**
   * @format int64
   * @example 2
   */
  maxPlace?: number;
  /** @minItems 0 */
  categoriesIds?: number[];
}

export interface Place {
  /**
   * @format int64
   * @example 21
   */
  id: number;
  /** @example true */
  free: boolean;
}

export interface Category {
  /**
   * @format int64
   * @example 1
   */
  id: number;
  /** @example "Sport" */
  name: string;
}

/**
 * event status
 * @example "done"
 */
export enum EventStatus {
  InFuture = "inFuture",
  Pending = "pending",
  Done = "done",
  Cancelled = "cancelled",
}

export interface ReservationDTO {
  /**
   * @format int64
   * @example 1
   */
  eventId: number;
  /**
   * @format int64
   * @example 12
   */
  placeId: number;
  /** @example "df0d69cbe68fb6e2b27aa88f6f94497e" */
  reservationToken: string;
}

export interface Organizer {
  /**
   * @format int64
   * @example 10
   */
  id: number;
  /** @example "theUser" */
  name: string;
  /** @example "john@email.com" */
  email: string;
  /** User Status */
  status: "pending" | "confirmed";
}

export interface OrganizerForm {
  /** @example "theUser" */
  name: string;
  /** @example "john@email.com" */
  email: string;
  /** @example "12345" */
  password: string;
}

export interface OrganizerPatch {
  /** @example "NewUserName" */
  name?: string;
  /** @example "myNewPassword" */
  password?: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "https://yourbackenhosting.edu.pl";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      return data;
    });
  };
}

/**
 * @title System rezerwacji miejsc na eventy
 * @version 1.0.0
 * @termsOfService http://swagger.io/terms/
 * @baseUrl https://yourbackenhosting.edu.pl
 * @contact <XXX@pw.edu.pl>
 *
 * Niniejsza dokumentacja stanowi opis REST API implemtowanego przez serwer centralny. Endpointy
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  events = {
    /**
     * No description
     *
     * @tags Event
     * @name GetEvents
     * @summary Return list of all events
     * @request GET:/events
     */
    getEvents: (params: RequestParams = {}) =>
      this.request<Event[], any>({
        path: `/events`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Event
     * @name AddEvent
     * @summary Add new event
     * @request POST:/events
     * @secure
     */
    addEvent: (data: EventForm, params: RequestParams = {}) =>
      this.request<Event, void>({
        path: `/events`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Event
     * @name GetMyEvents
     * @summary Return list of events made by organizer, according to session
     * @request GET:/events/my
     * @secure
     */
    getMyEvents: (params: RequestParams = {}) =>
      this.request<Event[], void>({
        path: `/events/my`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns a single event
     *
     * @tags Event
     * @name GetEventById
     * @summary Find event by ID
     * @request GET:/events/{id}
     */
    getEventById: (id: number, params: RequestParams = {}) =>
      this.request<EventWithPlaces, void>({
        path: `/events/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Event
     * @name CancelEvent
     * @summary Cancel event
     * @request DELETE:/events/{id}
     * @secure
     */
    cancelEvent: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/events/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Event
     * @name PatchEvent
     * @summary patch existing event
     * @request PATCH:/events/{id}
     * @secure
     */
    patchEvent: (id: string, data: EventPatch, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/events/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Returns a list of photo paths
     *
     * @tags Event
     * @name GetPhoto
     * @summary Get list of photo of event
     * @request GET:/events/{id}/photos
     */
    getPhoto: (id: number, params: RequestParams = {}) =>
      this.request<string[], void>({
        path: `/events/${id}/photos`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Event
     * @name DeletePhoto
     * @summary Cancel event
     * @request DELETE:/events/{id}/photos
     * @secure
     */
    deletePhoto: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/events/${id}/photos`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Event
     * @name PutPhoto
     * @summary patch existing event
     * @request POST:/events/{id}/photos
     * @secure
     */
    putPhoto: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/events/${id}/photos`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Event
     * @name GetByCategory
     * @summary Return list of all events in category
     * @request GET:/events/getByCategory
     */
    getByCategory: (params: RequestParams = {}) =>
      this.request<Event[], void>({
        path: `/events/getByCategory`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  categories = {
    /**
     * No description
     *
     * @tags Categories
     * @name GetCategories
     * @summary Return list of all categories
     * @request GET:/categories
     */
    getCategories: (params: RequestParams = {}) =>
      this.request<Category[], any>({
        path: `/categories`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Categories
     * @name AddCategories
     * @summary Create new category
     * @request POST:/categories
     * @secure
     */
    addCategories: (params: RequestParams = {}) =>
      this.request<Category, void>({
        path: `/categories`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  reservation = {
    /**
     * No description
     *
     * @tags Reservation
     * @name MakeReservation
     * @summary Create new reservation
     * @request POST:/reservation
     */
    makeReservation: (params: RequestParams = {}) =>
      this.request<ReservationDTO, void>({
        path: `/reservation`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Reservation
     * @name DeleteReservation
     * @summary Create new reservation
     * @request DELETE:/reservation
     */
    deleteReservation: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/reservation`,
        method: "DELETE",
        ...params,
      }),
  };
  organizer = {
    /**
     * No description
     *
     * @tags Event organizer
     * @name SignUp
     * @summary Create orginizer account
     * @request POST:/organizer
     */
    signUp: (data: OrganizerForm, params: RequestParams = {}) =>
      this.request<Organizer, void>({
        path: `/organizer`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Event organizer
     * @name GetOrganizer
     * @summary Get organizer account (my account)
     * @request GET:/organizer
     * @secure
     */
    getOrganizer: (params: RequestParams = {}) =>
      this.request<Organizer, void>({
        path: `/organizer`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Event organizer
     * @name Confirm
     * @summary Confirm orginizer account
     * @request POST:/organizer/{id}
     */
    confirm: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/organizer/${id}`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Event organizer
     * @name DeleteOrganizer
     * @summary Confirm orginizer account
     * @request DELETE:/organizer/{id}
     * @secure
     */
    deleteOrganizer: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/organizer/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Event organizer
     * @name PatchOrganizer
     * @summary Patch orginizer account
     * @request PATCH:/organizer/{id}
     * @secure
     */
    patchOrganizer: (id: string, data: OrganizerPatch, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/organizer/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Event organizer
     * @name LoginOrganizer
     * @summary Logs organizer into the system
     * @request GET:/organizer/login
     */
    loginOrganizer: (params: RequestParams = {}) =>
      this.request<
        {
          /** The session token. */
          sessionToken?: string;
        },
        void
      >({
        path: `/organizer/login`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
}
