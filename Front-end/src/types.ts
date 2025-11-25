// Tipos compartilhados entre componentes
export type Page =
  | "home"
  | "animals"
  | "animal-details"
  | "login"
  | "register-animal"
  | "how-to-help"
  | "about"
  | "success"
  | "donate"
  | "volunteer"
  | "sponsor";

export interface Animal {
  id: number;
  name: string;
  species: "Cachorro" | "Gato";
  age: string;
  size: "Pequeno" | "Médio" | "Grande";
  temperament: string;
  city: string;
  status: "Disponível" | "Adotado";
  image: string;
  description: string;
  history: string;
}

export interface Adoption {
  id: number;
  animal_id: number;
  animal?: Animal;
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
  status: string;
  created_at: string;
  updated_at: string;
}