import { useState } from "react";
import { UserCircle, Building2 } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import type { Page } from "../../src/types";
import { toast } from "sonner";
import { authAPI, setAuthToken } from "../../src/services/api";

interface LoginProps {
  onNavigate: (page: Page) => void;
  onLogin: (type: "adotante" | "ong") => void;
}

export function Login({ onNavigate, onLogin }: LoginProps) {
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  const [loginError, setLoginError] = useState<string | null>(null);

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [userType, setUserType] = useState<"adotante" | "ong">("adotante");

  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast.error("Preencha todos os campos");
      return;
    }
    try {
      setLoadingLogin(true);
      setLoginError(null);
      const response = await authAPI.login({
        email: loginData.email,
        password: loginData.password,
        role: userType,
      });
      if (response.success) {
        toast.success("Login realizado com sucesso!");
        // token já salvo pelo api.ts, mas garantimos consistência
        setAuthToken(response.data?.token || null);
        onLogin(userType);
      } else {
        const msg = response.message || "E-mail ou senha incorretos";
        setLoginError(msg);
        toast.error(msg);
      }
    } catch (err) {
      const raw = err instanceof Error ? err.message : "Erro de login";
      const friendly = /Credenciais|401/.test(raw) ? "E-mail ou senha incorretos" : raw;
      setLoginError(friendly);
      toast.error(friendly);
    } finally {
      setLoadingLogin(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerData.name || !registerData.email || !registerData.password) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }
    if (registerData.password !== registerData.confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }
    try {
      setLoadingRegister(true);
      const response = await authAPI.register({
        name: registerData.name,
        email: registerData.email,
        password: registerData.password,
        role: userType,
      });
      if (response.success) {
        toast.success("Cadastro realizado com sucesso!");
        setAuthToken(response.data?.token || null);
        onLogin(userType);
      } else {
        toast.error(response.message || "Erro ao cadastrar");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro ao cadastrar";
      toast.error(msg);
    } finally {
      setLoadingRegister(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl text-gray-900 mb-2">
          Bem-vindo ao ProtegePet
        </h1>
        <p className="text-gray-600">
          Faça login ou crie sua conta para continuar
        </p>
      </div>

      {/* User Type Selection */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card
          className={`p-4 cursor-pointer transition-all ${
            userType === "adotante"
              ? "border-orange-500 bg-orange-50"
              : "hover:border-gray-300"
          }`}
          onClick={() => setUserType("adotante")}
        >
          <div className="text-center">
            <UserCircle className={`w-8 h-8 mx-auto mb-2 ${
              userType === "adotante" ? "text-orange-500" : "text-gray-400"
            }`} />
            <p className={`text-sm ${
              userType === "adotante" ? "text-orange-500" : "text-gray-600"
            }`}>
              Sou Adotante
            </p>
          </div>
        </Card>

        <Card
          className={`p-4 cursor-pointer transition-all ${
            userType === "ong"
              ? "border-pink-500 bg-pink-50"
              : "hover:border-gray-300"
          }`}
          onClick={() => setUserType("ong")}
        >
          <div className="text-center">
            <Building2 className={`w-8 h-8 mx-auto mb-2 ${
              userType === "ong" ? "text-pink-500" : "text-gray-400"
            }`} />
            <p className={`text-sm ${
              userType === "ong" ? "text-pink-500" : "text-gray-600"
            }`}>
              Sou ONG/Protetor
            </p>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Cadastro</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4 mt-4">
              <div>
                <Label htmlFor="login-email">E-mail</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="seu@email.com"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="login-password">Senha</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                />
              </div>

              {loginError && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
                  {loginError}
                </div>
              )}

              <button
                type="button"
                className="text-sm text-orange-500 hover:text-orange-600"
                onClick={() => toast.info("Em breve: recuperação de senha")}
              >
                Esqueci minha senha
              </button>

              <Button
                type="submit"
                disabled={loadingLogin}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white disabled:opacity-50"
              >
                {loadingLogin ? "Entrando..." : "Entrar"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4 mt-4">
              <div>
                <Label htmlFor="register-name">
                  {userType === "ong" ? "Nome da ONG/Protetor" : "Nome completo"}
                </Label>
                <Input
                  id="register-name"
                  placeholder={userType === "ong" ? "Nome da organização" : "Seu nome"}
                  value={registerData.name}
                  onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="register-email">E-mail</Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="seu@email.com"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="register-password">Senha</Label>
                <Input
                  id="register-password"
                  type="password"
                  placeholder="••••••••"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="register-confirm-password">Confirmar senha</Label>
                <Input
                  id="register-confirm-password"
                  type="password"
                  placeholder="••••••••"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loadingRegister}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white disabled:opacity-50"
              >
                {loadingRegister ? "Criando..." : "Criar conta"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </Card>

      <div className="text-center mt-6">
        <Button
          variant="link"
          onClick={() => onNavigate("home")}
          className="text-gray-600"
        >
          Voltar para a página inicial
        </Button>
      </div>
    </div>
  );
}
