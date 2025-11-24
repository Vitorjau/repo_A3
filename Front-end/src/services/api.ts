/**
 * API Client Configuration
 * Configuração centralizada para todas as requisições HTTP
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

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
  getAllAnimals: async () => {
    return fetchAPI<any[]>('/animals');
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
    return fetchAPI<any>('/adoption', {
      method: 'POST',
      body: data,
    });
  },

  /**
   * Lista todas as adoções
   */
  getAllAdoptions: async () => {
    return fetchAPI<any[]>('/adoption');
  },

  /**
   * Obtém detalhes de uma adoção
   */
  getAdoptionById: async (id: number) => {
    return fetchAPI<any>(`/adoption/${id}`);
  },

  /**
   * Atualiza status de uma adoção
   */
  updateAdoptionStatus: async (id: number, status: 'Pending' | 'Approved' | 'Rejected') => {
    return fetchAPI<any>(`/adoption/${id}`, {
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

export default {
  animalAPI,
  adoptionAPI,
  contactAPI,
  feedbackAPI,
  healthAPI,
};
