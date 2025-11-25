import { Button } from "../ui/button";
import { Card } from "../ui/card";
import type { Page } from "../../src/types";

interface DonateProps {
  onNavigate: (page: Page) => void;
}

export function Donate({ onNavigate }: DonateProps) {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl mb-4 font-bold">Sua Doação Transforma Vidas</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Cada gesto de generosidade garante cuidado, alimento e esperança para animais resgatados.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-10">
        {/* Por que Doar */}
        <Card className="p-8 shadow-sm bg-white/90 backdrop-blur-sm">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent flex items-center gap-2">⭐ Por que Doar?</h2>
            <p className="text-gray-700 leading-relaxed">
              Cada contribuição faz diferença na vida de um animal resgatado. Com sua ajuda, garantimos alimentação,
              cuidados médicos e bem-estar até que encontrem um lar definitivo.
            </p>
          </div>
        </Card>

        {/* Como sua doação ajuda */}
        <Card className="p-8 bg-gradient-to-br from-orange-50 to-pink-50 border border-orange-100/50">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">❤️ Como Sua Doação Ajuda</h2>
          <ul className="grid sm:grid-cols-2 gap-3 text-sm md:text-base text-gray-700">
            <li className="flex items-start gap-2"><span className="text-pink-500">•</span> Alimenta animais resgatados diariamente</li>
            <li className="flex items-start gap-2"><span className="text-pink-500">•</span> Cobre tratamentos emergenciais e medicamentos contínuos</li>
            <li className="flex items-start gap-2"><span className="text-pink-500">•</span> Mantém o ambiente limpo e seguro para todos</li>
            <li className="flex items-start gap-2"><span className="text-pink-500">•</span> Promove o bem-estar emocional dos animais resgatados</li>
          </ul>
        </Card>

        {/* Onde entregar */}
        <Card className="p-8 bg-white/90 backdrop-blur-sm">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">📦 Onde Entregar as Doações</h2>
          <p className="text-gray-700 leading-relaxed">
            Você pode entregar os itens diretamente em nossa ONG ou combinar a entrega com nossos voluntários. Todo material
            é recebido, registrado e direcionado conforme a necessidade de cada animal.
          </p>
        </Card>

        {/* Doações em Dinheiro */}
        <Card className="p-8 bg-gradient-to-br from-pink-50 to-purple-50 border border-pink-100/50">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">🤝 Doações em Dinheiro</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Se preferir, você também pode ajudar por meio de doações financeiras. O valor é utilizado exclusivamente para:
          </p>
          <ul className="grid sm:grid-cols-2 gap-3 text-sm md:text-base text-gray-700 mb-6">
            <li className="flex items-start gap-2"><span className="text-purple-500">•</span> Compra de ração</li>
            <li className="flex items-start gap-2"><span className="text-purple-500">•</span> Vacinas e castrações</li>
            <li className="flex items-start gap-2"><span className="text-purple-500">•</span> Tratamentos veterinários</li>
            <li className="flex items-start gap-2"><span className="text-purple-500">•</span> Manutenção do abrigo</li>
          </ul>
          <Button
            className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
            onClick={() => onNavigate('how-to-help')}
          >
            Doar agora
          </Button>
        </Card>

        {/* Itens prioritários */}
        <Card className="p-8 bg-white/90 backdrop-blur-sm">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">🐾 Itens Prioritários no Momento</h2>
          <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm md:text-base text-gray-700">
            <li className="rounded-md bg-orange-50 p-3 border border-orange-100">Ração seca para gatos (adultos e filhotes)</li>
            <li className="rounded-md bg-orange-50 p-3 border border-orange-100">Vermífugos</li>
            <li className="rounded-md bg-orange-50 p-3 border border-orange-100">Antipulgas</li>
            <li className="rounded-md bg-orange-50 p-3 border border-orange-100">Areia higiênica</li>
            <li className="rounded-md bg-orange-50 p-3 border border-orange-100">Ataduras e curativos</li>
          </ul>
        </Card>

        {/* Transparência */}
        <Card className="p-8 bg-gradient-to-br from-orange-50 to-pink-50 border border-orange-100/50">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">💬 Transparência</h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              Publicamos relatórios periódicos mostrando como cada doação foi utilizada. A sua confiança nos permite continuar salvando vidas.
            </p>
        </Card>

        {/* Parceiro */}
        <Card className="p-8 bg-white/90 backdrop-blur-sm">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">🙌 Seja um Parceiro</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Empresas podem participar com doações mensais ou campanhas internas. Entre em contato e junte-se a nós!
          </p>
          <Button
            variant="outline"
            onClick={() => onNavigate('about')}
            className="w-full"
          >
            Fale conosco
          </Button>
        </Card>
      </div>
    </div>
  );
}
