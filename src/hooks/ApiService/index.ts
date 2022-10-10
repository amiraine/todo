export class apiService {
  baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || "";
  }

  async get(endpoint: string): Promise<any> {
    const url = this.baseUrl + endpoint;

    const headers = new Headers({});

    const options: RequestInit = {
      method: "GET",
      mode: "cors",
      headers,
    };

    // Attempt fetch and check for status code indicating OK
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const contentType = response.headers.get("content-type");

    const imageTypes = ["image/webp", "image/png", "image/jpeg", "image/gif"];

    if (imageTypes.some((substring) => contentType?.includes(substring))) {
      // parse img stream to base64
      const buffer = await response.arrayBuffer();
      let binary = "";
      const bytes = [].slice.call(new Uint8Array(buffer));
      bytes.forEach((b: number) => (binary += String.fromCharCode(b)));

      const image = `data:image/png;base64,${window.btoa(binary)}`;
      return image;
    }

    // Stream out text of response
    const text = await response.text();

    // Attempt to parse text to JSON
    try {
      const data = JSON.parse(text);
      return Promise.resolve(data);
    } catch {
      // Possible that response is just text
      return Promise.resolve(text);
    }
  }

  async post(endpoint: string, payload: any): Promise<any> {
    const url = this.baseUrl + endpoint;

    const headers = new Headers({});

    // Enforce JSON type if payload is a generic object
    if (!(payload instanceof FormData) && !(typeof payload === "string")) {
      headers.append("Content-Type", "application/json");
    }

    const options: RequestInit = {
      method: "POST",
      mode: "cors",
      headers,
      body: payload instanceof FormData ? payload : JSON.stringify(payload),
    };

    // Attempt fetch and check for status code indicating OK
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const contentType = response.headers.get("content-type");
    const blobTypes = ["application/octet-stream"];

    if (blobTypes.some((substring) => contentType?.includes(substring))) {
      const data = await response.blob();
      return Promise.resolve(data);
    }

    // Stream out text of response
    const text = await response.text();

    // Attempt to parse text to JSON
    try {
      const data = JSON.parse(text);
      return Promise.resolve(data);
    } catch {
      // Possible that response is just text
      return Promise.resolve(text);
    }
  }

  async patch(endpoint: string, payload: any): Promise<any> {
    const url = this.baseUrl + endpoint;
    const options: RequestInit = {
      method: "PATCH",
      mode: "cors",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(payload),
    };

    // Attempt fetch and check for status code indicating OK
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // Stream out text of response
    const text = await response.text();

    // Attempt to parse text to JSON
    try {
      const data = JSON.parse(text);
      return Promise.resolve(data);
    } catch {
      // Possible that response is just text
      return Promise.resolve(text);
    }
  }

  async put(endpoint: string, payload: any): Promise<any> {
    const url = this.baseUrl + endpoint;
    const options: RequestInit = {
      method: "PUT",
      mode: "cors",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(payload),
    };

    // Attempt fetch and check for status code indicating OK
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // Stream out text of response
    const text = await response.text();

    // Attempt to parse text to JSON
    try {
      const data = JSON.parse(text);
      return Promise.resolve(data);
    } catch {
      // Possible that response is just text
      return Promise.resolve(text);
    }
  }

  async delete(endpoint: string): Promise<any> {
    const url = this.baseUrl + endpoint;
    const options: RequestInit = {
      method: "DELETE",
      mode: "cors",
      headers: new Headers({}),
    };
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // Stream out text of response
    const text = await response.text();

    // Attempt to parse text to JSON
    try {
      const data = JSON.parse(text);
      return Promise.resolve(data);
    } catch {
      // Possible that response is just text
      return Promise.resolve(text);
    }
  }
}

export default apiService;
