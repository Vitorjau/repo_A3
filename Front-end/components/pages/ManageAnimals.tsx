import { useEffect, useState } from "react";
import type { Page, Animal } from "../../src/types";
import { Button } from "../ui/button";


interface ManageAnimalsProps {
  animals: Animal[];
  onNavigate: (page: Page, animal?: Animal) => void;
  isOng: boolean;
}

export function ManageAnimals({ animals, onNavigate, isOng }: ManageAnimalsProps) {
  // Só mostrar animais disponíveis
  const [list, setList] = useState<Animal[]>(() => animals.filter(a => a.status === "Disponível"));
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Sincroniza quando props mudarem
  useEffect(() => {
    setList(animals.filter(a => a.status === "Disponível"));
  }, [animals]);

  // Função de exclusão conforme instruções
  async function handleDelete(id: number) {
    if (!isOng) return; // segurança extra
    if (!confirm("Tem certeza que deseja excluir este animal?")) return;
    try {
      setDeletingId(id);
      const response = await fetch(`http://localhost:5000/animals/${id}`, { method: "DELETE" });
      if (response.ok) {
        setList(prev => prev.filter(a => a.id !== id));
      } else {
        // Opcionalmente ler erro
        console.error("Erro ao deletar animal", await response.text());
      }
    } catch (err) {
      console.error("Erro ao executar exclusão", err);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gerenciar Animais</h1>
        {isOng && (
          <Button onClick={() => onNavigate("register-animal")} className="bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600">
            Registrar novo
          </Button>
        )}
      </div>

      {list.length === 0 && (
        <div className="p-6 border border-dashed rounded-md text-center text-gray-500">Nenhum animal disponível para gerenciamento.</div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {list.map(animal => (
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
              {isOng && (
                <Button
                  variant="destructive"
                  size="sm"
                  disabled={deletingId === animal.id}
                  onClick={() => handleDelete(animal.id)}
                >
                  {deletingId === animal.id ? 'Removendo...' : 'Excluir'}
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
