import { Card } from "../ui/card";
import { Button } from "../ui/button";
import type { Page } from "../../src/types";

interface SponsorProps { onNavigate: (page: Page) => void; }

export function Sponsor({ onNavigate }: SponsorProps) {
  return (
    <div>
      <section className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl mb-4 font-bold">💛 Quero Apadrinhar</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">Apoie diretamente um animal e acompanhe sua jornada até a adoção.</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-10">
        <Card className="p-8 bg-white/90 backdrop-blur-sm shadow-sm">
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p className="text-lg font-medium">Apadrinhe um Animal</p>
            <p>Contribua diretamente para o bem-estar de um animal específico e acompanhe sua jornada até a adoção.</p>
            <p>O apadrinhamento é uma forma especial de apoio: você escolhe um animal para ajudar mensalmente e garante que ele tenha tudo o que precisa enquanto espera por uma família definitiva.</p>
          </div>
        </Card>

        <Card className="p-8 bg-gradient-to-br from-orange-50 to-pink-50 border border-orange-100/50">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Ao apadrinhar, você pode:</h2>
          <ul className="space-y-3 text-gray-700 text-sm md:text-base">
            <li className="flex gap-2"><span className="text-orange-500">•</span> <strong>Oferecer uma contribuição mensal:</strong> Ajuda a cobrir alimentação, cuidados médicos e itens essenciais.</li>
            <li className="flex gap-2"><span className="text-orange-500">•</span> <strong>Acompanhar o seu afilhado:</strong> Saiba como ele está, como evolui e quais cuidados recebe.</li>
            <li className="flex gap-2"><span className="text-orange-500">•</span> <strong>Visitar quando desejar:</strong> Passe tempo com ele, leve carinho e presença.</li>
            <li className="flex gap-2"><span className="text-orange-500">•</span> <strong>Receber atualizações:</strong> Fotos, mensagens e novidades sobre o bem-estar do seu escolhido.</li>
          </ul>
        </Card>

        <Card className="p-8 bg-white/90 backdrop-blur-sm">
          <p className="text-gray-700 leading-relaxed mb-4">Apadrinhar é criar um vínculo. É amar de perto — mesmo quando a adoção ainda não acontece. Transforme a vida de um animal e faça parte da história dele. 🐶💕</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white" onClick={() => onNavigate('how-to-help')}>
              Voltar
            </Button>
            <Button variant="outline" className="w-full" onClick={() => onNavigate('about')}>Quero apadrinhar</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
