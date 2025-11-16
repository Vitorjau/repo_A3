import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import type { Page, Animal } from "../../src/App";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface AnimalListProps {
  animals: Animal[];
  onNavigate: (page: Page, animal?: Animal) => void;
}

export function AnimalList({ animals, onNavigate }: AnimalListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState<string>("all");
  const [sizeFilter, setSizeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredAnimals = animals.filter((animal) => {
    const matchesSearch = animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         animal.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecies = speciesFilter === "all" || animal.species === speciesFilter;
    const matchesSize = sizeFilter === "all" || animal.size === sizeFilter;
    const matchesStatus = statusFilter === "all" || animal.status === statusFilter;

    return matchesSearch && matchesSpecies && matchesSize && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl text-gray-900 mb-2">
          Adote um Amigo
        </h1>
        <p className="text-gray-600 text-lg">
          Encontre o pet perfeito para sua família
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              placeholder="Buscar por nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filtros
          </Button>
        </div>

        {showFilters && (
          <Card className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Espécie</label>
                <Select value={speciesFilter} onValueChange={setSpeciesFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="Cachorro">Cachorro</SelectItem>
                    <SelectItem value="Gato">Gato</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-2 block">Porte</label>
                <Select value={sizeFilter} onValueChange={setSizeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="Pequeno">Pequeno</SelectItem>
                    <SelectItem value="Médio">Médio</SelectItem>
                    <SelectItem value="Grande">Grande</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-2 block">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="Disponível">Disponível</SelectItem>
                    <SelectItem value="Adotado">Adotado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-6 text-gray-600">
        {filteredAnimals.length} {filteredAnimals.length === 1 ? "animal encontrado" : "animais encontrados"}
      </div>

      {/* Animals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAnimals.map((animal) => (
          <Card key={animal.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="relative h-64">
              <ImageWithFallback
                src={animal.image}
                alt={animal.name}
                className="w-full h-full object-cover"
              />
              <Badge
                className={`absolute top-3 right-3 ${
                  animal.status === "Disponível"
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-gray-500 hover:bg-gray-600"
                } text-white border-0`}
              >
                {animal.status}
              </Badge>
            </div>

            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-gray-900">{animal.name}</h3>
                <Badge variant="outline">{animal.species}</Badge>
              </div>

              <div className="space-y-2 mb-4 text-sm text-gray-600">
                <p><span className="font-medium">Idade:</span> {animal.age}</p>
                <p><span className="font-medium">Porte:</span> {animal.size}</p>
                <p><span className="font-medium">Temperamento:</span> {animal.temperament}</p>
                <p><span className="font-medium">Cidade:</span> {animal.city}</p>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {animal.description}
              </p>

              <Button
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
                onClick={() => onNavigate("animal-details", animal)}
              >
                Ver mais
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredAnimals.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">
            Nenhum animal encontrado com os filtros selecionados.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSearchTerm("");
              setSpeciesFilter("all");
              setSizeFilter("all");
              setStatusFilter("all");
            }}
          >
            Limpar filtros
          </Button>
        </div>
      )}
    </div>
  );
}
