import { ArrowLeft, Share2, MapPin, Calendar, Heart } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import type { Page, Animal } from "../../src/App";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useState } from "react";
import { toast } from "sonner";

interface AnimalDetailsProps {
  animal: Animal;
  onNavigate: (page: Page) => void;
}

export function AnimalDetails({ animal, onNavigate }: AnimalDetailsProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleShare = () => {
    toast.success("Link copiado para a área de transferência!");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }
    onNavigate("success");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Button
        variant="ghost"
        onClick={() => onNavigate("animals")}
        className="mb-6 gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Image and Basic Info */}
        <div className="space-y-6">
          <Card className="overflow-hidden">
            <div className="relative h-96 lg:h-[500px]">
              <ImageWithFallback
                src={animal.image}
                alt={animal.name}
                className="w-full h-full object-cover"
              />
              <Badge
                className={`absolute top-4 right-4 ${
                  animal.status === "Disponível"
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-gray-500 hover:bg-gray-600"
                } text-white border-0`}
              >
                {animal.status}
              </Badge>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl text-gray-900 mb-4">Informações</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600">
                <Calendar className="w-5 h-5 text-orange-500" />
                <span><span className="font-medium">Idade:</span> {animal.age}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Heart className="w-5 h-5 text-pink-500" />
                <span><span className="font-medium">Temperamento:</span> {animal.temperament}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin className="w-5 h-5 text-purple-500" />
                <span><span className="font-medium">Localização:</span> {animal.city}</span>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Badge variant="outline" className="text-sm">
                Espécie: {animal.species}
              </Badge>
              <Badge variant="outline" className="text-sm">
                Porte: {animal.size}
              </Badge>
            </div>
          </Card>
        </div>

        {/* Right Column - Details and Contact Form */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-4xl text-gray-900">{animal.name}</h1>
              <Button
                variant="outline"
                size="icon"
                onClick={handleShare}
                className="rounded-full"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-gray-600 text-lg">{animal.description}</p>
          </div>

          <Card className="p-6">
            <h2 className="text-xl text-gray-900 mb-4">História</h2>
            <p className="text-gray-600 leading-relaxed">{animal.history}</p>
          </Card>

          {animal.status === "Disponível" && (
            <Card className="p-6">
              <h2 className="text-xl text-gray-900 mb-4">Interessado em adotar?</h2>
              <p className="text-gray-600 mb-6">
                Preencha o formulário abaixo e entraremos em contato com você em breve.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome completo *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Seu nome"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">E-mail *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(00) 00000-0000"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Mensagem *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Conte um pouco sobre você e por que deseja adotar..."
                    rows={4}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
                >
                  Quero adotar
                </Button>
              </form>
            </Card>
          )}

          {animal.status === "Adotado" && (
            <Card className="p-6 bg-green-50 border-green-200">
              <h2 className="text-xl text-green-900 mb-2">
                {animal.name} já tem um lar! 🎉
              </h2>
              <p className="text-green-700">
                Este pet já foi adotado e está feliz em sua nova família. 
                Veja outros animais disponíveis para adoção.
              </p>
              <Button
                className="mt-4 w-full"
                onClick={() => onNavigate("animals")}
              >
                Ver outros animais
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
