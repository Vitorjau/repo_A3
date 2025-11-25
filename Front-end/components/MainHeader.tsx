import { Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import type { Page } from "../src/types";
import { toast } from "sonner";

interface MainHeaderProps {
  currentPage: Page;
  isLoggedIn: boolean;
  userType: "adotante" | "ong" | null;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

export function MainHeader({
  currentPage,
  isLoggedIn,
  userType,
  onNavigate,
  onLogout,
}: MainHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems: { label: string; page: Page }[] = [
    { label: "Início", page: "home" },
    { label: "Adotar", page: "animals" },
    { label: "Como ajudar", page: "how-to-help" },
    { label: "Sobre", page: "about" },
  ];

  // Removido acesso à tela de gerenciamento; ONG mantém apenas registro de animal

  const handleNavClick = (page: Page) => {
    if (!isLoggedIn && page !== 'login') {
      toast.error('Faça login para acessar esta página');
      onNavigate('login');
      setIsMenuOpen(false);
      return;
    }
    onNavigate(page);
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => handleNavClick(isLoggedIn ? "home" : "login")}
          >
            <div className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              ProtegePet
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigationItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`text-sm font-medium transition-colors ${
                  currentPage === item.page
                    ? "text-orange-500 border-b-2 border-orange-500"
                    : "text-gray-600 hover:text-orange-500"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <span className="text-sm text-gray-600">
                  {userType === "ong" ? "ONG/Protetor" : "Adotante"}
                </span>
                {userType === "ong" && (
                  <Button
                    size="sm"
                    onClick={() => handleNavClick("register-animal")}
                    className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
                  >
                    Registrar animal
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={onLogout}
                  className="gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sair
                </Button>
              </>
            ) : (
              <Button
                size="sm"
                onClick={() => handleNavClick("login")}
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
              >
                Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-3">
            {navigationItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === item.page
                    ? "bg-orange-100 text-orange-500"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 border-t border-gray-200">
              {isLoggedIn ? (
                <>
                  <p className="text-sm text-gray-600 px-3 py-2">
                    {userType === "ong" ? "ONG/Protetor" : "Adotante"}
                  </p>
                  {userType === "ong" && (
                    <Button
                      size="sm"
                      onClick={() => handleNavClick("register-animal")}
                      className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white mb-2"
                    >
                      Registrar animal
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={onLogout}
                    className="w-full gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sair
                  </Button>
                </>
              ) : (
                <Button
                  size="sm"
                  onClick={() => handleNavClick("login")}
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
                >
                  Login
                </Button>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
