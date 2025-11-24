import { useState, useEffect } from "react";
import { Home } from "../components/pages/Home";
import { AnimalList } from "../components/pages/AnimalList";
import { AnimalDetails } from "../components/pages/AnimalDetails";
import { Login } from "../components/pages/Login";
import { RegisterAnimal } from "../components/pages/RegisterAnimal";
import { HowToHelp } from "../components/pages/HowToHelp";
import { About } from "../components/pages/About";
import { AdoptionSuccess } from "../components/pages/AdoptionSuccess";
import { MainHeader } from "../components/MainHeader";
import { animalAPI } from "./services/api";
import { toast } from "sonner";
import "./App.css";

export type Page = 
  | "home" 
  | "animals" 
  | "animal-details" 
  | "login" 
  | "register-animal" 
  | "how-to-help" 
  | "about"
  | "success";

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

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<"adotante" | "ong" | null>(null);
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Busca animais da API ao carregar o componente
  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await animalAPI.getAllAnimals();
        if (response.success && response.data) {
          setAnimals(response.data);
        } else {
          throw new Error(response.message || "Erro ao carregar animais");
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : "Erro ao carregar animais";
        setError(message);
        console.error("Erro ao buscar animais:", err);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  const navigateTo = (page: Page, animal?: Animal) => {
    setCurrentPage(page);
    if (animal) {
      setSelectedAnimal(animal);
    }
    window.scrollTo(0, 0);
  };

  const handleLogin = (type: "adotante" | "ong") => {
    setIsLoggedIn(true);
    setUserType(type);
    navigateTo("home");
  };

  const refreshAnimals = async () => {
    try {
      const response = await animalAPI.getAllAnimals();
      if (response.success && response.data) {
        setAnimals(response.data);
      }
    } catch (err) {
      console.error("Erro ao atualizar lista de animais", err);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType(null);
    navigateTo("home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      <MainHeader 
        currentPage={currentPage}
        isLoggedIn={isLoggedIn}
        userType={userType}
        onNavigate={navigateTo}
        onLogout={handleLogout}
      />
      
      <main>
        {currentPage === "home" && (
          <Home animals={animals} onNavigate={navigateTo} />
        )}
        {currentPage === "animals" && (
          <AnimalList animals={animals} onNavigate={navigateTo} />
        )}
        {currentPage === "animal-details" && selectedAnimal && (
          <AnimalDetails animal={selectedAnimal} onNavigate={navigateTo} />
        )}
        {currentPage === "login" && (
          <Login onNavigate={navigateTo} onLogin={handleLogin} />
        )}
        {currentPage === "register-animal" && (
          <RegisterAnimal onNavigate={navigateTo} isLoggedIn={isLoggedIn} userType={userType} onAnimalCreated={refreshAnimals} />
        )}
        {currentPage === "how-to-help" && (
          <HowToHelp onNavigate={navigateTo} />
        )}
        {currentPage === "about" && (
          <About onNavigate={navigateTo} />
        )}
        {currentPage === "success" && (
          <AdoptionSuccess onNavigate={navigateTo} animalName={selectedAnimal?.name} />
        )}
      </main>

      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 ProtegePet. Todos os direitos reservados.</p>
            <p className="text-sm mt-2">Adote, proteja e transforme vidas.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
