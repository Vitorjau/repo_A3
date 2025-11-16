import { ArrowRight, Heart, Home as HomeIcon, Shield } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import type { Page, Animal } from "../../src/App";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface HomeProps {
  animals: Animal[];
  onNavigate: (page: Page, animal?: Animal) => void;
}

export function Home({ animals, onNavigate }: HomeProps) {
  const adoptedAnimals = animals.filter(a => a.status === "Adotado");

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl mb-6">
            Adote, proteja e transforme vidas
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            Encontre seu novo melhor amigo e faça a diferença na vida de um animal que precisa de amor
          </p>
          <Button
            size="lg"
            onClick={() => onNavigate("animals")}
            className="bg-white text-orange-500 hover:bg-gray-100"
          >
            Ver animais para adoção
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="text-gray-900 mb-2">Adoção Responsável</h3>
            <p className="text-gray-600">
              Conectamos animais resgatados com famílias que realmente se importam
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-pink-500" />
            </div>
            <h3 className="text-gray-900 mb-2">Proteção Animal</h3>
            <p className="text-gray-600">
              Todos os pets são vacinados, castrados e saudáveis
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <HomeIcon className="w-8 h-8 text-purple-500" />
            </div>
            <h3 className="text-gray-900 mb-2">Novo Lar</h3>
            <p className="text-gray-600">
              Ajudamos a encontrar o match perfeito entre pets e tutores
            </p>
          </Card>
        </div>
      </section>

      {/* Success Stories */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl text-gray-900 mb-4">
            Histórias de Adoção
          </h2>
          <p className="text-gray-600 text-lg">
            Veja quem já encontrou um lar cheio de amor
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adoptedAnimals.map((animal) => (
            <Card key={animal.id} className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-64">
                <ImageWithFallback
                  src={animal.image}
                  alt={animal.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="mb-1">{animal.name}</h3>
                  <p className="text-sm text-white/90">{animal.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-orange-500 to-pink-500 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl mb-4">
            Pronto para mudar uma vida?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Milhares de animais estão esperando por você
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => onNavigate("animals")}
              className="bg-white text-orange-500 hover:bg-gray-100"
            >
              Quero adotar
            </Button>
            <Button
              size="lg"
              onClick={() => onNavigate("how-to-help")}
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              Quero ajudar
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
