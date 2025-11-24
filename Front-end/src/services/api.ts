/**
 * API Client Configuration
 * Configuração centralizada para todas as requisições HTTP
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

let authToken: string | null = null;

export function setAuthToken(token: string | null) {
  authToken = token;
  if (token) {
    localStorage.setItem('auth_token', token);
  } else {
    localStorage.removeItem('auth_token');
  }
}

export function loadStoredToken() {
  const stored = localStorage.getItem('auth_token');
  if (stored) authToken = stored;
  return authToken;
}

interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: unknown;
  signal?: AbortSignal;
}

interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

/**
 * Realiza uma requisição HTTP para a API
 */
async function fetchAPI<T = unknown>(
  endpoint: string,
  config?: RequestConfig
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const fetchOptions: RequestInit = {
    method: config?.method || 'GET',
    headers: {
      ...defaultHeaders,
      ...config?.headers,
    },
    signal: config?.signal,
  };

  if (authToken) {
    (fetchOptions.headers as Record<string,string>)['Authorization'] = `Bearer ${authToken}`;
  }

  if (config?.body) {
    fetchOptions.body = JSON.stringify(config.body);
  }

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Erro HTTP ${response.status}: ${response.statusText}`
    );
  }

  return response.json();
}

/**
 * API de Animais
 */
export const animalAPI = {
  /**
   * Lista todos os animais
   */
  getAllAnimals: async (page: number = 1, perPage: number = 10) => {
    return fetchAPI<{ items: any[]; meta: any }>(`/animals?page=${page}&per_page=${perPage}`);
  },

  /**
   * Obtém detalhes de um animal específico
   */
  getAnimalById: async (id: number) => {
    return fetchAPI<any>(`/animals/${id}`);
  },

  /**
   * Cria um novo animal
   */
  createAnimal: async (data: {
    name: string;
    species: 'Cachorro' | 'Gato';
    age: string;
    size: 'Pequeno' | 'Médio' | 'Grande';
    temperament: string;
    city: string;
    description: string;
    history: string;
    image?: string;
    status?: 'Disponível' | 'Adotado';
  }) => {
    return fetchAPI<any>('/animals', {
      method: 'POST',
      body: data,
    });
  },

  /**
   * Atualiza um animal existente
   */
  updateAnimal: async (id: number, data: Partial<any>) => {
    return fetchAPI<any>(`/animals/${id}`, {
      method: 'PUT',
      body: data,
    });
  },

  /**
   * Deleta um animal
   */
  deleteAnimal: async (id: number) => {
    return fetchAPI<any>(`/animals/${id}`, {
      method: 'DELETE',
    });
  },
};

/**
 * API de Adoções
 */
export const adoptionAPI = {
  /**
   * Cria uma solicitação de adoção
   */
  createAdoption: async (data: {
    animal_id: number;
    adopter_name: string;
    adopter_email: string;
    adopter_phone?: string;
    address_cep: string;
    address_street: string;
    address_number: string;
    address_complement?: string;
    address_neighborhood?: string;
    address_city: string;
    address_state: string;
    adoption_message?: string;
  }) => {
    return fetchAPI<any>('/adoptions', {
      method: 'POST',
      body: data,
    });
  },

  /**
   * Lista todas as adoções
   */
  getAllAdoptions: async () => {
    return fetchAPI<any[]>('/adoptions');
  },

  /**
   * Obtém detalhes de uma adoção
   */
  getAdoptionById: async (id: number) => {
    return fetchAPI<any>(`/adoptions/${id}`);
  },

  /**
   * Atualiza status de uma adoção
   */
  updateAdoptionStatus: async (id: number, status: 'Pending' | 'Approved' | 'Rejected') => {
    return fetchAPI<any>(`/adoptions/${id}/status`, {
      method: 'PUT',
      body: { status },
    });
  },
};

/**
 * API de Contato
 */
export const contactAPI = {
  /**
   * Envia uma mensagem de contato
   */
  sendContact: async (data: {
    name: string;
    email: string;
    subject?: string;
    message: string;
  }) => {
    return fetchAPI<any>('/contact', {
      method: 'POST',
      body: data,
    });
  },
};

/**
 * API de Feedback
 */
export const feedbackAPI = {
  /**
   * Envia feedback do usuário
   */
  sendFeedback: async (message: string) => {
    return fetchAPI<any>('/feedback', {
      method: 'POST',
      body: { mensagem: message },
    });
  },
};

/**
 * Health check
 */
export const healthAPI = {
  check: async () => {
    return fetchAPI<any>('/health');
  },
};

/**
 * API de Autenticação
 */
export const authAPI = {
  register: async (data: { name: string; email: string; password: string; role: 'ong' | 'adotante'; }) => {
    return fetchAPI<any>('/auth/register', {
      method: 'POST',
      body: data,
    });
  },
  login: async (data: { email: string; password: string; role: 'ong' | 'adotante'; }) => {
    const res = await fetchAPI<any>('/auth/login', {
      method: 'POST',
      body: data,
    });
    if (res.success && res.data?.token) {
      setAuthToken(res.data.token);
    }
    return res;
  },
  me: async () => fetchAPI<any>('/auth/me'),
};

export default {
  animalAPI,
  adoptionAPI,
  contactAPI,
  feedbackAPI,
  healthAPI,
  authAPI,
};
