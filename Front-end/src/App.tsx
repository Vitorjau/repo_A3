import { useState } from "react";
import { Home } from "../components/pages/Home";
import { AnimalList } from "../components/pages/AnimalList";
import { AnimalDetails } from "../components/pages/AnimalDetails";
import { Login } from "../components/pages/Login";
import { RegisterAnimal } from "../components/pages/RegisterAnimal";
import { HowToHelp } from "../components/pages/HowToHelp";
import { About } from "../components/pages/About";
import { AdoptionSuccess } from "../components/pages/AdoptionSuccess";
import { MainHeader } from "../components/MainHeader";

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

  const animals: Animal[] = [
    {
      id: 1,
      name: "Max",
      species: "Cachorro",
      age: "2 anos",
      size: "Médio",
      temperament: "Dócil e brincalhão",
      city: "São Paulo, SP",
      status: "Disponível",
      image: "https://images.unsplash.com/photo-1576177129483-466c459d2798?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwZG9nJTIwYWRvcHRpb258ZW58MXx8fHwxNzYyMDI2NTE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Max é um cachorro super carinhoso e cheio de energia!",
      history: "Max foi resgatado das ruas quando tinha apenas 6 meses. Desde então, está em um lar temporário esperando por uma família definitiva. Ele é vacinado, castrado e adora brincar com crianças."
    },
    {
      id: 2,
      name: "Luna",
      species: "Gato",
      age: "1 ano",
      size: "Pequeno",
      temperament: "Calma e carinhosa",
      city: "Rio de Janeiro, RJ",
      status: "Disponível",
      image: "https://images.unsplash.com/photo-1415369629372-26f2fe60c467?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXQlMjBhZG9wdGlvbnxlbnwxfHx8fDE3NjIxMDQ3NDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Luna é uma gatinha tranquila, perfeita para apartamentos.",
      history: "Luna foi encontrada abandonada em uma caixa. É uma gata extremamente dócil e silenciosa, ideal para quem procura companhia calma."
    },
    {
      id: 3,
      name: "Thor",
      species: "Cachorro",
      age: "3 anos",
      size: "Grande",
      temperament: "Protetor e leal",
      city: "Belo Horizonte, MG",
      status: "Disponível",
      image: "https://images.unsplash.com/photo-1591628162592-bef22a484f3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNjdWUlMjBkb2d8ZW58MXx8fHwxNzYyMTA0NzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Thor é um guardião perfeito para sua família!",
      history: "Thor foi resgatado de um abrigo superlotado. Apesar do porte grande, é muito gentil com crianças e outros animais."
    },
    {
      id: 4,
      name: "Mel",
      species: "Gato",
      age: "6 meses",
      size: "Pequeno",
      temperament: "Energética e curiosa",
      city: "Curitiba, PR",
      status: "Disponível",
      image: "https://images.unsplash.com/photo-1609854893786-d94a8a934644?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXR0ZW4lMjBjdXRlfGVufDF8fHx8MTc2MjA4MjgyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Mel é uma filhote cheia de energia e travessuras!",
      history: "Mel nasceu em um projeto de resgate. É brincalhona, saudável e está pronta para alegrar uma nova casa."
    },
    {
      id: 5,
      name: "Buddy",
      species: "Cachorro",
      age: "4 meses",
      size: "Pequeno",
      temperament: "Alegre e sociável",
      city: "Porto Alegre, RS",
      status: "Disponível",
      image: "https://images.unsplash.com/photo-1676484606502-3f1837111e64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdXBweSUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MjA0Njg2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Buddy é um filhote adorável que ama todo mundo!",
      history: "Buddy foi encontrado abandonado com seus irmãos. É um filhote saudável, vacinado e procurando por um lar cheio de amor."
    },
    {
      id: 6,
      name: "Mia",
      species: "Cachorro",
      age: "5 anos",
      size: "Médio",
      temperament: "Tranquila e amorosa",
      city: "Brasília, DF",
      status: "Adotado",
      image: "https://images.unsplash.com/photo-1720705313994-12cd7930da3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGFkb3B0ZWQlMjBkb2d8ZW58MXx8fHwxNzYyMDIyMDIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Mia encontrou seu lar para sempre!",
      history: "Mia foi adotada recentemente por uma família amorosa depois de 2 anos esperando. História de sucesso do ProtegePet!"
    }
  ];

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
          <RegisterAnimal onNavigate={navigateTo} isLoggedIn={isLoggedIn} userType={userType} />
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
