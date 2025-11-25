import { Card } from "../ui/card";
import { Button } from "../ui/button";
import type { Page } from "../../src/types";

interface VolunteerProps { onNavigate: (page: Page) => void; }

export function Volunteer({ onNavigate }: VolunteerProps) {
  return (
    <div>
      <section className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl mb-4 font-bold">🌟 Quero Ser Voluntário</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">Dedique seu tempo, carinho e energia para transformar vidas.</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-10">
        <Card className="p-8 bg-white/90 backdrop-blur-sm shadow-sm">
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p className="text-lg font-medium">Seja Voluntário</p>
            <p>Dedique seu tempo, carinho e energia para transformar a vida de animais que aguardam uma segunda chance.</p>
            <p>Ser voluntário é mais do que ajudar — é oferecer presença, amor e acolhimento. Com algumas horas por semana, você faz uma diferença real no bem-estar dos animais e no funcionamento da ONG.</p>
          </div>
        </Card>

        <Card className="p-8 bg-gradient-to-br from-pink-50 to-purple-50 border border-pink-100/50">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Como você pode contribuir:</h2>
          <ul className="space-y-3 text-gray-700 text-sm md:text-base">
            <li className="flex gap-2"><span className="text-pink-500">•</span> <strong>Passeio com os animais:</strong> Ajude-os a gastar energia, socializar e serem mais felizes.</li>
            <li className="flex gap-2"><span className="text-pink-500">•</span> <strong>Cuidados e socialização:</strong> Ofereça carinho, interação e apoio emocional para torná-los mais confiantes.</li>
            <li className="flex gap-2"><span className="text-pink-500">•</span> <strong>Ajuda em eventos:</strong> Participe de feiras de adoção, campanhas e ações especiais.</li>
            <li className="flex gap-2"><span className="text-pink-500">•</span> <strong>Apoio administrativo:</strong> Auxilie em tarefas internas que mantêm a ONG funcionando.</li>
          </ul>
        </Card>

        <Card className="p-8 bg-white/90 backdrop-blur-sm">
          <p className="text-gray-700 leading-relaxed mb-4">Cada gesto importa. Cada minuto doado muda uma vida. Venha fazer parte dessa rede de amor e cuidado. ❤️🐾</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white" onClick={() => onNavigate('how-to-help')}>
              Voltar
            </Button>
            <Button variant="outline" className="w-full" onClick={() => onNavigate('about')}>Quero me cadastrar</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
