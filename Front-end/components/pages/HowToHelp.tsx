import { Heart, Users, Gift, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import type { Page } from "../../src/App";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { toast } from "sonner";

interface HowToHelpProps {
  onNavigate: (page: Page) => void;
}

export function HowToHelp({ onNavigate }: HowToHelpProps) {
  const handleDonate = () => {
    toast.success("Redirecionando para a página de doação...");
  };

  const handleVolunteer = () => {
    toast.success("Formulário de voluntariado em breve!");
  };

  const handleSponsor = () => {
    toast.success("Abrindo opções de apadrinhamento...");
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl mb-4">
            Como Você Pode Ajudar
          </h1>
          <p className="text-xl text-white/90">
            Existem várias formas de fazer a diferença na vida dos animais
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Donate */}
          <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="relative h-48 bg-gradient-to-br from-orange-400 to-pink-400">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1516453734593-8d198ae84bcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBzdG9yZXxlbnwxfHx8fDE3NjIwMTc5Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Doação"
                className="w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white p-4 rounded-full">
                  <Gift className="w-12 h-12 text-orange-500" />
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-gray-900 mb-3">Doe Ração ou Medicamentos</h3>
              <p className="text-gray-600 mb-4">
                Sua doação ajuda a manter os animais alimentados e saudáveis enquanto esperam por um lar.
              </p>
              <ul className="text-sm text-gray-600 mb-4 space-y-2">
                <li>• Ração para cães e gatos</li>
                <li>• Medicamentos e vacinas</li>
                <li>• Produtos de higiene</li>
                <li>• Brinquedos e acessórios</li>
              </ul>
              <Button
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
                onClick={handleDonate}
              >
                Quero doar
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>

          {/* Volunteer */}
          <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="relative h-48 bg-gradient-to-br from-pink-400 to-purple-400">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1708515902649-35826ccd88c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjB2b2x1bnRlZXJ8ZW58MXx8fHwxNzYyMTA0NzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Voluntário"
                className="w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white p-4 rounded-full">
                  <Users className="w-12 h-12 text-pink-500" />
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-gray-900 mb-3">Seja Voluntário</h3>
              <p className="text-gray-600 mb-4">
                Dedique seu tempo e carinho cuidando dos animais que mais precisam.
              </p>
              <ul className="text-sm text-gray-600 mb-4 space-y-2">
                <li>• Passeio com os animais</li>
                <li>• Cuidados e socialização</li>
                <li>• Ajuda em eventos</li>
                <li>• Apoio administrativo</li>
              </ul>
              <Button
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
                onClick={handleVolunteer}
              >
                Quero ser voluntário
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>

          {/* Sponsor */}
          <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="relative h-48 bg-gradient-to-br from-purple-400 to-blue-400">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1655761135788-a92466219d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjBsb3ZlJTIwZmFtaWx5fGVufDF8fHx8MTc2MjEwNDc0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Apadrinhamento"
                className="w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white p-4 rounded-full">
                  <Heart className="w-12 h-12 text-purple-500" />
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-gray-900 mb-3">Apadrinhe um Animal</h3>
              <p className="text-gray-600 mb-4">
                Ajude financeiramente um animal específico até que ele seja adotado.
              </p>
              <ul className="text-sm text-gray-600 mb-4 space-y-2">
                <li>• Contribuição mensal</li>
                <li>• Acompanhe seu afilhado</li>
                <li>• Visite quando quiser</li>
                <li>• Receba atualizações</li>
              </ul>
              <Button
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
                onClick={handleSponsor}
              >
                Quero apadrinhar
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Additional Info */}
        <Card className="p-8 bg-gradient-to-r from-orange-50 to-pink-50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl text-gray-900 mb-4">
              Outras Formas de Ajudar
            </h2>
            <p className="text-gray-600 mb-6">
              Compartilhe nossos posts nas redes sociais, divulgue animais para adoção, 
              indique amigos que querem adotar ou ajude na divulgação de eventos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                onClick={() => toast.info("Compartilhando...")}
              >
                Compartilhar nas redes
              </Button>
              <Button
                onClick={() => onNavigate("animals")}
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
              >
                Ver animais para adoção
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
