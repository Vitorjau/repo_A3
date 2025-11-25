import { ArrowLeft, Share2, MapPin, Calendar, Heart, Loader } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import type { Page, Animal, Adoption } from "../../src/types";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useState } from "react";
import { toast } from "sonner";
import { adoptionAPI } from "../../src/services/api";

interface AnimalDetailsProps {
  animal: Animal;
  onNavigate: (page: Page) => void;
  onAdoptionSuccess: (data: Adoption) => void;
}

export function AnimalDetails({ animal, onNavigate, onAdoptionSuccess }: AnimalDetailsProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cep: "",
    address: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});

  const handleSearchCep = async () => {
    const cep = formData.cep.replace(/\D/g, "");
    
    if (cep.length !== 8) {
      toast.error("CEP inválido. Digite um CEP com 8 dígitos.");
      return;
    }

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();
      if (data.erro) {
        toast.error("CEP não encontrado");
        return;
      }
      setFormData(prev => ({
        ...prev,
        address: data.logradouro || prev.address,
        neighborhood: data.bairro || prev.neighborhood,
        city: data.localidade || prev.city,
        state: (data.uf || prev.state).toUpperCase(),
        complement: prev.complement || data.complemento || ""
      }));
      toast.success("Endereço preenchido automaticamente");
    } catch (error) {
      toast.error("Erro ao buscar CEP. Tente novamente.");
    }
  };

  const handleShare = () => {
    toast.success("Link copiado para a área de transferência!");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const requiredSimple = [
      { key: 'name', label: 'Nome completo' },
      { key: 'email', label: 'E-mail' },
      { key: 'message', label: 'Mensagem' },
    ];
    const requiredAddress = [
      { key: 'cep', label: 'CEP' },
      { key: 'address', label: 'Rua/Avenida' },
      { key: 'number', label: 'Número' },
      { key: 'city', label: 'Cidade' },
      { key: 'state', label: 'Estado' },
    ];
    const missing: string[] = [];
    const errs: Record<string, boolean> = {};
    [...requiredSimple, ...requiredAddress].forEach(f => {
      if (!formData[f.key as keyof typeof formData]) { missing.push(f.label); errs[f.key] = true; }
    });
    setFieldErrors(errs);
    if (missing.length) {
      toast.error(`Preencha: ${missing.join(', ')}`);
      return;
    }

    try {
      setLoading(true);
      const response = await adoptionAPI.createAdoption({
        animal_id: animal.id,
        adopter_name: formData.name,
        adopter_email: formData.email,
        adopter_phone: formData.phone || undefined,
        address_cep: formData.cep,
        address_street: formData.address,
        address_number: formData.number,
        address_complement: formData.complement || undefined,
        address_neighborhood: formData.neighborhood || undefined,
        address_city: formData.city,
        address_state: formData.state.toUpperCase(),
        adoption_message: formData.message
      });

      if (response.success && response.data) {
        toast.success("Solicitação de adoção enviada com sucesso!");
        onAdoptionSuccess(response.data as Adoption);
      } else {
        toast.error(response.message || "Erro ao enviar solicitação de adoção");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao enviar solicitação de adoção";
      toast.error(message);
      console.error("Erro ao criar adoção:", err);
    } finally {
      setLoading(false);
    }
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
                    aria-invalid={fieldErrors.name || undefined}
                    className={fieldErrors.name ? 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/30' : undefined}
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
                    aria-invalid={fieldErrors.email || undefined}
                    className={fieldErrors.email ? 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/30' : undefined}
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

                <div className="border-t pt-4 mt-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Endereço de Entrega</h3>
                  
                  <div>
                    <Label htmlFor="cep">CEP *</Label>
                    <div className="flex gap-2">
                      <Input
                        id="cep"
                        name="cep"
                        value={formData.cep}
                        onChange={handleChange}
                        placeholder="00000-000"
                        maxLength={9}
                        aria-invalid={fieldErrors.cep || undefined}
                        data-error={fieldErrors.cep || undefined}
                        className={`flex-1 ${fieldErrors.cep ? 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/30' : ''}`}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleSearchCep}
                        className="px-4"
                      >
                        Buscar
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Rua/Avenida *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Digite seu endereço"
                      required
                      aria-invalid={fieldErrors.address || undefined}
                      className={fieldErrors.address ? 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/30' : undefined}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="number">Número *</Label>
                      <Input
                        id="number"
                        name="number"
                        value={formData.number}
                        onChange={handleChange}
                        placeholder="Ex: 123"
                        required
                        aria-invalid={fieldErrors.number || undefined}
                        className={fieldErrors.number ? 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/30' : undefined}
                      />
                    </div>

                    <div>
                      <Label htmlFor="complement">Complemento</Label>
                      <Input
                        id="complement"
                        name="complement"
                        value={formData.complement}
                        onChange={handleChange}
                        placeholder="Apto, sala, etc"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <Label htmlFor="city">Cidade *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Digite sua cidade"
                        required
                        aria-invalid={fieldErrors.city || undefined}
                        className={fieldErrors.city ? 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/30' : undefined}
                      />
                    </div>

                    <div>
                      <Label htmlFor="state">Estado *</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="MG, SP, etc"
                        maxLength={2}
                        required
                        aria-invalid={fieldErrors.state || undefined}
                        className={`uppercase ${fieldErrors.state ? 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/30' : ''}`}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="neighborhood">Bairro</Label>
                    <Input
                      id="neighborhood"
                      name="neighborhood"
                      value={formData.neighborhood}
                      onChange={handleChange}
                      placeholder="Preenchido pelo CEP"
                    />
                  </div>
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
                    aria-invalid={fieldErrors.message || undefined}
                    className={fieldErrors.message ? 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/30' : undefined}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader className="w-4 h-4 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Quero adotar"
                  )}
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
