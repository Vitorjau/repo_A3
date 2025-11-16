import { CheckCircle, Home, Heart } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import type { Page } from "../../src/App";

interface AdoptionSuccessProps {
  onNavigate: (page: Page) => void;
  animalName?: string;
}

export function AdoptionSuccess({ onNavigate, animalName }: AdoptionSuccessProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <Card className="p-8 text-center">
        <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-500" />
        </div>

        <h1 className="text-3xl md:text-4xl text-gray-900 mb-4">
          Obrigado por transformar uma vida!
        </h1>

        <p className="text-xl text-gray-600 mb-8">
          {animalName 
            ? `Recebemos sua solicitação para adotar ${animalName}!`
            : "Recebemos sua solicitação de adoção!"
          }
        </p>

        <div className="bg-gradient-to-r from-orange-50 to-pink-50 p-6 rounded-lg mb-8">
          <h2 className="text-gray-900 mb-4">Próximos Passos</h2>
          <div className="space-y-3 text-left text-gray-600">
            <div className="flex items-start gap-3">
              <div className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                1
              </div>
              <p>Nossa equipe entrará em contato por e-mail em até 48 horas</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-pink-500 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                2
              </div>
              <p>Você receberá mais informações sobre o animal e o processo de adoção</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                3
              </div>
              <p>Agendaremos uma visita para você conhecer seu futuro pet pessoalmente</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                4
              </div>
              <p>Após aprovação, você poderá levar seu novo amigo para casa!</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Button
            onClick={() => onNavigate("home")}
            className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
          >
            <Home className="w-4 h-4 mr-2" />
            Voltar à página inicial
          </Button>

          <Button
            variant="outline"
            onClick={() => onNavigate("animals")}
            className="w-full"
          >
            <Heart className="w-4 h-4 mr-2" />
            Ver outros animais
          </Button>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          Enquanto isso, você pode continuar navegando e conhecer outros pets disponíveis
        </p>
      </Card>

      {/* Additional Info */}
      <div className="mt-8 text-center text-gray-600">
        <p className="mb-2">Dúvidas? Entre em contato conosco:</p>
        <p className="text-orange-500">contato@protegepet.com.br</p>
        <p className="text-orange-500">(11) 98765-4321</p>
      </div>
    </div>
  );
}
