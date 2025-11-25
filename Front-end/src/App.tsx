import { useState, useEffect } from "react";
import { Home } from "../components/pages/Home";
import { AnimalList } from "../components/pages/AnimalList";
import { AnimalDetails } from "../components/pages/AnimalDetails";
import { Login } from "../components/pages/Login";
import { RegisterAnimal } from "../components/pages/RegisterAnimal";
import { HowToHelp } from "../components/pages/HowToHelp";
import { About } from "../components/pages/About";
import { AdoptionSuccess } from "../components/pages/AdoptionSuccess";
import { ManageAnimals } from "../components/pages/ManageAnimals";
import type { Page, Animal, Adoption } from "./types";
import { MainHeader } from "../components/MainHeader";
import { animalAPI, loadStoredToken } from "./services/api";
import { toast } from "sonner";
import "./App.css";

// Tipos movidos para ./types para evitar dependência circular com ManageAnimals

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<"adotante" | "ong" | null>(null);
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [adoptionData, setAdoptionData] = useState<Adoption | null>(null);
  const [page, setPage] = useState(1);
  const [perPage] = useState(6);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Busca animais da API ao carregar o componente
  useEffect(() => {
    loadStoredToken();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await animalAPI.getAllAnimals(page, perPage);
        if (response.success && response.data) {
          setAnimals(response.data.items);
          setTotalPages(response.data.meta.pages);
        } else {
          throw new Error(response.message || "Erro ao carregar animais");
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : "Erro ao carregar animais";
        console.error("Erro ao buscar animais:", err);
        toast.error(message);
      }
    })();
  }, [page, perPage]);

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
      const response = await animalAPI.getAllAnimals(page, perPage);
      if (response.success && response.data) {
        setAnimals(response.data.items);
        setTotalPages(response.data.meta.pages);
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

  const handleAdoptionSuccess = (data: Adoption) => {
    setAdoptionData(data);
    if (data.animal) {
      setSelectedAnimal(data.animal as Animal);
    }
    navigateTo("success");
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
          <AnimalList 
            animals={animals} 
            onNavigate={navigateTo} 
            page={page} 
            totalPages={totalPages} 
            onPageChange={setPage}
          />
        )}
        {currentPage === "animal-details" && selectedAnimal && (
          <AnimalDetails animal={selectedAnimal} onNavigate={navigateTo} onAdoptionSuccess={handleAdoptionSuccess} />
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
        {currentPage === "success" && adoptionData && (
          <AdoptionSuccess 
            onNavigate={navigateTo} 
            adoption={adoptionData}
            isOng={userType === 'ong'}
            onApproved={refreshAnimals}
          />
        )}
        {currentPage === "manage" && isLoggedIn && userType === 'ong' && (
          <ManageAnimals 
            animals={animals}
            onNavigate={navigateTo}
            onDeleteSuccess={refreshAnimals}
          />
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
