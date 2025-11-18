import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext, API } from '../App';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Shield, Mail, Lock, ArrowLeft } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const response = await axios.post(`${API}/auth/login`, {
          email: formData.email,
          password: formData.password
        });
        login(response.data.user, response.data.access_token);
        toast.success('¡Bienvenido de vuelta!');
        navigate('/dashboard');
      } else {
        if (formData.password !== formData.confirmPassword) {
          toast.error('Las contraseñas no coinciden');
          setLoading(false);
          return;
        }
        await axios.post(`${API}/auth/register`, {
          email: formData.email,
          password: formData.password
        });
        toast.success('¡Registro exitoso! Revisa tu email para verificar tu cuenta.');
        setIsLogin(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Error en la operación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-6 py-12"
      style={{
        backgroundImage: `linear-gradient(rgba(10, 10, 10, 0.92), rgba(10, 10, 10, 0.92)), url('https://images.unsplash.com/photo-1600892322433-91a232bc83af?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwzfHxtaWxpdGFyeSUyMHRyYWluaW5nfGVufDB8fHx8MTc2MzI4NzIwMnww&ixlib=rb-4.1.0&q=85')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
      data-testid="login-page"
    >
      <div className="w-full max-w-md">
        <Button
          onClick={() => navigate('/')}
          variant="ghost"
          className="mb-6 text-[#d4af37] hover:text-[#d4af37]/80"
          data-testid="back-home-btn"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al Inicio
        </Button>

        <div className="glass-effect rounded-xl p-8 tactical-border" data-testid="login-form-container">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Shield className="w-10 h-10 text-[#d4af37]" />
              <span className="text-3xl font-black text-[#d4af37]" style={{fontFamily: 'Exo 2'}}>
                ALPHATEST
              </span>
            </div>
            <h2 className="text-2xl font-bold text-[#d4af37]" style={{fontFamily: 'Exo 2'}}>
              {isLogin ? 'INICIAR SESIÓN' : 'REGISTRO'}
            </h2>
            <p className="text-gray-400 mt-2">
              {isLogin ? 'Accede a tu cuenta' : 'Crea tu cuenta para comenzar'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-gray-300 mb-2 block">
                <Mail className="w-4 h-4 inline mr-2" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="bg-black/50 border-[#2d5016] text-white focus:border-[#d4af37]"
                required
                data-testid="email-input"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-300 mb-2 block">
                <Lock className="w-4 h-4 inline mr-2" />
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="bg-black/50 border-[#2d5016] text-white focus:border-[#d4af37]"
                required
                data-testid="password-input"
              />
            </div>

            {!isLogin && (
              <div>
                <Label htmlFor="confirmPassword" className="text-gray-300 mb-2 block">
                  <Lock className="w-4 h-4 inline mr-2" />
                  Confirmar Contraseña
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="bg-black/50 border-[#2d5016] text-white focus:border-[#d4af37]"
                  required
                  data-testid="confirm-password-input"
                />
              </div>
            )}

            <Button
              type="submit"
              className="w-full btn-military py-6 text-lg"
              disabled={loading}
              data-testid="submit-btn"
            >
              {loading ? 'Procesando...' : (isLogin ? 'Iniciar Sesión' : 'Registrarse')}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#d4af37] hover:text-[#d4af37]/80 text-sm"
              data-testid="toggle-auth-mode-btn"
            >
              {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;