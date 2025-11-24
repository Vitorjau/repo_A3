import { useState } from "react";
import type { Animal, Page } from "../../src/types";
import { animalAPI } from "../../src/services/api";
import { Button } from "../ui/button";
import { toast } from "sonner";

interface ManageAnimalsProps {
  animals: Animal[];
  onNavigate: (page: Page, animal?: Animal) => void;
  onDeleteSuccess: () => void;
}

export function ManageAnimals({ animals, onNavigate, onDeleteSuccess }: ManageAnimalsProps) {
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  const handleDelete = async (animal: Animal) => {
    if (!confirm(`Remover animal "${animal.name}"? Esta ação é permanente.`)) return;
    try {
      setIsDeleting(animal.id);
      const res = await animalAPI.deleteAnimal(animal.id);
      if (res.success) {
        toast.success("Animal removido");
        onDeleteSuccess();
      } else {
        toast.error(res.message || "Falha ao remover");
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Erro inesperado";
      toast.error(msg);
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gerenciar Animais</h1>
        <Button onClick={() => onNavigate("register-animal")} className="bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600">
          Registrar novo
        </Button>
      </div>

      {animals.length === 0 && (
        <div className="p-6 border border-dashed rounded-md text-center text-gray-500">Nenhum animal cadastrado.</div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {animals.map(animal => (
          <div key={animal.id} className="bg-white border rounded-lg shadow-sm p-4 flex flex-col">
            <div className="flex-1">
              <h2 className="font-semibold text-lg text-gray-800 cursor-pointer" onClick={() => onNavigate("animal-details", animal)}>
                {animal.name}
              </h2>
              <p className="text-sm text-gray-600 mt-1">{animal.species} • {animal.age} • {animal.size}</p>
              <p className="text-sm text-gray-500 mt-1">{animal.city}</p>
              <span className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${animal.status === 'Adotado' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>{animal.status}</span>
            </div>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm" onClick={() => onNavigate("animal-details", animal)}>Ver</Button>
              <Button
                variant="destructive"
                size="sm"
                disabled={isDeleting === animal.id}
                onClick={() => handleDelete(animal)}
              >
                {isDeleting === animal.id ? 'Removendo...' : 'Excluir'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
