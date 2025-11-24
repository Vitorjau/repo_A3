import { useState } from "react";
import { ArrowLeft, Upload, X, Loader } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import type { Page } from "../../src/App";
import { toast } from "sonner";
import { animalAPI } from "../../src/services/api";

interface RegisterAnimalProps {
  onNavigate: (page: Page) => void;
  isLoggedIn: boolean;
  userType: "adotante" | "ong" | null;
}

export function RegisterAnimal({ onNavigate, isLoggedIn, userType }: RegisterAnimalProps) {
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    age: "",
    size: "",
    temperament: "",
    city: "",
    description: "",
    history: "",
    status: "Disponível"
  });

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Redirect if not ONG
  if (!isLoggedIn || userType !== "ong") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <Card className="p-8">
          <h2 className="text-2xl text-gray-900 mb-4">Acesso Restrito</h2>
          <p className="text-gray-600 mb-6">
            Apenas ONGs e protetores cadastrados podem registrar animais.
          </p>
          <Button
            onClick={() => onNavigate("login")}
            className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
          >
            Fazer login como ONG
          </Button>
        </Card>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string): void => {
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.species || !formData.age || !formData.size || !formData.description) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    submitForm();
  };

  const submitForm = async () => {
    try {
      setLoading(true);
      const response = await animalAPI.createAnimal({
        name: formData.name,
        species: formData.species as "Cachorro" | "Gato",
        age: formData.age,
        size: formData.size as "Pequeno" | "Médio" | "Grande",
        temperament: formData.temperament,
        city: formData.city,
        description: formData.description,
        history: formData.history,
        image: uploadedImage || undefined,
        status: formData.status as "Disponível" | "Adotado",
      });

      if (response.success) {
        toast.success("Animal cadastrado com sucesso!");
        onNavigate("animals");
      } else {
        toast.error(response.message || "Erro ao cadastrar animal");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao cadastrar animal";
      toast.error(message);
      console.error("Erro ao cadastrar animal:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Button
        variant="ghost"
        onClick={() => onNavigate("home")}
        className="mb-6 gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl text-gray-900 mb-2">
          Cadastrar Animal
        </h1>
        <p className="text-gray-600">
          Preencha as informações do animal para disponibilizá-lo para adoção
        </p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div>
            <Label>Foto do animal *</Label>
            <div className="mt-2">
              {uploadedImage ? (
                <div className="relative w-full h-64 rounded-lg overflow-hidden">
                  <img
                    src={uploadedImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="destructive"
                    className="absolute top-2 right-2"
                    onClick={() => setUploadedImage(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mb-2" />
                  <p className="text-gray-600">Clique para fazer upload</p>
                  <p className="text-sm text-gray-400">PNG, JPG até 5MB</p>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name">Nome do animal *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex: Max"
                required
              />
            </div>

            <div>
              <Label htmlFor="species">Espécie *</Label>
              <Select
                value={formData.species}
                onValueChange={(value: string) => handleSelectChange("species", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cachorro">Cachorro</SelectItem>
                  <SelectItem value="Gato">Gato</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="age">Idade *</Label>
              <Input
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Ex: 2 anos"
                required
              />
            </div>

            <div>
              <Label htmlFor="size">Porte *</Label>
              <Select
                value={formData.size}
                onValueChange={(value: string) => handleSelectChange("size", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pequeno">Pequeno</SelectItem>
                  <SelectItem value="Médio">Médio</SelectItem>
                  <SelectItem value="Grande">Grande</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="temperament">Temperamento *</Label>
              <Input
                id="temperament"
                name="temperament"
                value={formData.temperament}
                onChange={handleChange}
                placeholder="Ex: Dócil e brincalhão"
                required
              />
            </div>

            <div>
              <Label htmlFor="city">Cidade *</Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Ex: São Paulo, SP"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Descrição curta *</Label>
            <Input
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Uma frase sobre o animal"
              required
            />
          </div>

          <div>
            <Label htmlFor="history">História completa *</Label>
            <Textarea
              id="history"
              name="history"
              value={formData.history}
              onChange={handleChange}
              placeholder="Conte a história do animal, como foi resgatado, características especiais..."
              rows={5}
              required
            />
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: string) => handleSelectChange("status", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Disponível">Disponível</SelectItem>
                <SelectItem value="Adotado">Adotado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onNavigate("animals")}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  Salvando...
                </>
              ) : (
                "Salvar animal"
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
