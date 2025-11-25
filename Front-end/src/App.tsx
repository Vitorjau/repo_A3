import { useState, useEffect } from "react";
import { Home } from "../components/pages/Home";
import { AnimalList } from "../components/pages/AnimalList";
import { AnimalDetails } from "../components/pages/AnimalDetails";
import { Login } from "../components/pages/Login";
import { RegisterAnimal } from "../components/pages/RegisterAnimal";
import { HowToHelp } from "../components/pages/HowToHelp";
import { Donate } from "../components/pages/Donate";
import { Volunteer } from "../components/pages/Volunteer";
import { Sponsor } from "../components/pages/Sponsor";
import { About } from "../components/pages/About";
import { AdoptionSuccess } from "../components/pages/AdoptionSuccess";
import type { Page, Animal, Adoption } from "./types";
import { MainHeader } from "../components/MainHeader";
import { animalAPI, loadStoredToken, authAPI } from "./services/api";
import { toast } from "sonner";
import "./App.css";

// Tipos movidos para ./types para evitar dependência circular com ManageAnimals

export default function App() {
  // Fluxo inicial: sempre iniciar em login/cadastro, e só ir para 'home' se já existir token válido
  const [currentPage, setCurrentPage] = useState<Page>("login");
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<"adotante" | "ong" | null>(null);
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [adoptionData, setAdoptionData] = useState<Adoption | null>(null);
  const [page, setPage] = useState(1);
  const [perPage] = useState(6);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [initializing, setInitializing] = useState(true);

  // Carrega token armazenado e define página inicial adequada
  useEffect(() => {
    const stored = loadStoredToken();
    if (!stored) {
      setCurrentPage("login");
      setInitializing(false);
      return;
    }
    (async () => {
      try {
        const me = await authAPI.me();
        if (me.success && me.data?.role) {
          setIsLoggedIn(true);
          setUserType(me.data.role as "ong" | "adotante");
          setCurrentPage("home");
          setInitializing(false);
        } else {
          setCurrentPage("login");
          setInitializing(false);
        }
      } catch {
        setCurrentPage("login");
        setInitializing(false);
      }
    })();
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
    // Guarda de rotas: somente página de login acessível sem autenticação
    if (!isLoggedIn && page !== 'login') {
      toast.error('Você precisa estar logado para acessar esta página.');
      setCurrentPage('login');
      return;
    }
    setCurrentPage(page);
    if (animal) {
      setSelectedAnimal(animal);
    }
    window.scrollTo(0, 0);
  };

  const handleLogin = (type: "adotante" | "ong") => {
    // Define autenticação e força página inicial sem passar pelo guarda
    setIsLoggedIn(true);
    setUserType(type);
    setCurrentPage('home');
    window.scrollTo(0, 0);
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
    navigateTo("login");
  };

  const handleAdoptionSuccess = (data: Adoption) => {
    setAdoptionData(data);
    // Remover imediatamente o animal adotado da lista local para sumir da listagem
    setAnimals(prev => prev.filter(a => a.id !== data.animal_id));
    if (data.animal) {
      setSelectedAnimal(data.animal as Animal);
    }
    // Recarrega lista do backend para garantir consistência (status atualizado)
    refreshAnimals();
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
        {initializing && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="size-10 animate-spin rounded-full border-4 border-orange-200 border-t-orange-500" aria-label="Carregando" />
            <p className="text-sm text-muted-foreground">Validando sessão...</p>
          </div>
        )}
        {!initializing && (
          <>
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
            {currentPage === "donate" && (
              <Donate onNavigate={navigateTo} />
            )}
            {currentPage === "volunteer" && (
              <Volunteer onNavigate={navigateTo} />
            )}
            {currentPage === "sponsor" && (
              <Sponsor onNavigate={navigateTo} />
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
          </>
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
