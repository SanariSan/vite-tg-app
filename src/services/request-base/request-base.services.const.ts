const DEFAULT_FETCH_HEADERS: HeadersInit = {
  // Connection: 'keep-alive',
  'Content-Type': 'application/json',
};

const DEFAULT_FETCH_OPTIONS: RequestInit = {
  method: 'GET',
  // redirect: 'manual',
  redirect: 'follow',
  credentials: 'include',
};

export { DEFAULT_FETCH_HEADERS, DEFAULT_FETCH_OPTIONS };
