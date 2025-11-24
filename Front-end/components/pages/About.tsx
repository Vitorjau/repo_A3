import { Mail, MapPin, Phone, Heart, Loader } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import type { Page } from "../../src/types";
import { useState } from "react";
import { toast } from "sonner";
import { contactAPI, feedbackAPI } from "../../src/services/api";

interface AboutProps {
  onNavigate: (page: Page) => void;
}

export function About({ onNavigate }: AboutProps) {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [loadingContact, setLoadingContact] = useState(false);
  const [loadingFeedback, setLoadingFeedback] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    try {
      setLoadingContact(true);
      const response = await contactAPI.sendContact({
        name: contactForm.name,
        email: contactForm.email,
        subject: contactForm.subject || undefined,
        message: contactForm.message
      });

      if (response.success) {
        toast.success("Mensagem enviada com sucesso! Em breve entraremos em contato.");
        setContactForm({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error(response.message || "Erro ao enviar mensagem");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao enviar mensagem";
      toast.error(message);
      console.error("Erro ao enviar contato:", err);
    } finally {
      setLoadingContact(false);
    }
  };

  const handleFeedbackSubmit = async () => {
    if (!feedbackMessage.trim()) {
      toast.error("Escreva uma mensagem de feedback");
      return;
    }

    try {
      setLoadingFeedback(true);
      const response = await feedbackAPI.sendFeedback(feedbackMessage);

      if (response.success) {
        toast.success("Feedback enviado com sucesso! Obrigado pela sua contribuição.");
        setFeedbackMessage("");
      } else {
        toast.error(response.message || "Erro ao enviar feedback");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao enviar feedback";
      toast.error(message);
      console.error("Erro ao enviar feedback:", err);
    } finally {
      setLoadingFeedback(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl mb-4">Sobre o ProtegePet</h1>
          <p className="text-xl text-white/90">
            Nossa missão é conectar animais resgatados com famílias amorosas
          </p>
        </div>
      </section>

      {/* About Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl text-gray-900 mb-6">Nossa História</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                O <strong>ProtegePet</strong> nasceu da união de pessoas apaixonadas por animais 
                e comprometidas com o bem-estar animal. Fundado em 2020, nosso projeto 
                conecta animais resgatados com famílias que desejam adotar com responsabilidade.
              </p>
              <p>
                Trabalhamos em parceria com ONGs, protetores independentes e veterinários 
                para garantir que cada animal receba os cuidados necessários antes de encontrar 
                seu novo lar.
              </p>
              <p>
                Todos os pets disponíveis para adoção no ProtegePet são vacinados, castrados 
                e recebem acompanhamento médico veterinário completo.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <Heart className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-gray-900">500+</h3>
                  <p className="text-gray-600">Animais adotados</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-pink-100 p-3 rounded-full">
                  <Heart className="w-6 h-6 text-pink-500" />
                </div>
                <div>
                  <h3 className="text-gray-900">50+</h3>
                  <p className="text-gray-600">ONGs parceiras</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Heart className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="text-gray-900">200+</h3>
                  <p className="text-gray-600">Voluntários ativos</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Card className="p-8">
              <h2 className="text-2xl text-gray-900 mb-6">Entre em Contato</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={contactForm.name}
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
                    value={contactForm.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="subject">Assunto</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleChange}
                    placeholder="Sobre o que você quer falar?"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Mensagem *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={contactForm.message}
                    onChange={handleChange}
                    placeholder="Escreva sua mensagem..."
                    rows={5}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loadingContact}
                >
                  {loadingContact ? (
                    <>
                      <Loader className="w-4 h-4 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Enviar mensagem"
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center">
            <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="text-gray-900 mb-2">E-mail</h3>
            <p className="text-gray-600">contato@protegepet.com.br</p>
          </Card>

          <Card className="p-6 text-center">
            <div className="bg-pink-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-pink-500" />
            </div>
            <h3 className="text-gray-900 mb-2">Telefone</h3>
            <p className="text-gray-600">(31) 9999-9999</p>
          </Card>

          <Card className="p-6 text-center">
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-gray-900 mb-2">Localização</h3>
            <p className="text-gray-600">Contagem, MG - Brasil</p>
          </Card>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Card className="p-8 bg-gradient-to-r from-orange-50 to-pink-50">
            <h2 className="text-2xl text-gray-900 mb-4">
              Pronto para fazer a diferença?
            </h2>
            <p className="text-gray-600 mb-6">
              Navegue pelos nossos animais disponíveis e encontre seu novo melhor amigo
            </p>
            <Button
              onClick={() => onNavigate("animals")}
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
            >
              Ver animais para adoção
            </Button>
          </Card>
        </div>

        {/* Feedback Section */}
        <div className="mt-12 text-center">
          <Card className="p-8 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200">
            <h2 className="text-2xl text-gray-900 mb-4">
              Feedback e Sugestões
            </h2>
            <p className="text-gray-600 mb-6">
              Sua opinião é importante para melhorar o ProtegePet. Compartilhe suas sugestões e feedback
            </p>
            <div className="max-w-2xl mx-auto">
              <Textarea
                placeholder="Sua mensagem de feedback..."
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
                rows={4}
                className="mb-4"
              />
              <Button
                onClick={handleFeedbackSubmit}
                disabled={loadingFeedback}
                className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingFeedback ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Enviar Feedback"
                )}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
