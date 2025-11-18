import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import { Button } from '@/components/ui/button';
import { Shield, Target, Award, Users, BookOpen, TrendingUp } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-[#2d5016]">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-[#d4af37]" />
              <span className="text-2xl font-black text-[#d4af37]" style={{fontFamily: 'Exo 2'}}>
                ALPHATEST
              </span>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <Button 
                    onClick={() => navigate('/dashboard')} 
                    className="bg-transparent hover:bg-[#2d5016]/30 text-[#d4af37] border border-[#2d5016]"
                    data-testid="dashboard-btn"
                  >
                    Dashboard
                  </Button>
                  <Button 
                    onClick={logout} 
                    className="bg-[#2d5016] hover:bg-[#3d6020] text-[#d4af37]"
                    data-testid="logout-btn"
                  >
                    Cerrar Sesión
                  </Button>
                </>
              ) : (
                <Button 
                  onClick={() => navigate('/login')} 
                  className="bg-[#2d5016] hover:bg-[#3d6020] text-[#d4af37] font-bold"
                  data-testid="login-btn"
                >
                  Iniciar Sesión
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        className="relative pt-32 pb-20 px-6 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 10, 10, 0.85), rgba(10, 10, 10, 0.85)), url('https://images.unsplash.com/photo-1638988660756-eb301eabb7e7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHx0YWN0aWNhbCUyMHNvbGRpZXJ8ZW58MHx8fHwxNzYzMjg3MjA3fDA&ixlib=rb-4.1.0&q=85')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
        data-testid="hero-section"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6 px-6 py-2 bg-[#2d5016]/30 border border-[#2d5016] rounded-full">
              <span className="text-[#d4af37] text-sm font-semibold uppercase tracking-wider">Plataforma Oficial de Preparación</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 gold-text" style={{fontFamily: 'Exo 2'}}>
              ALPHATEST
            </h1>
            <p className="text-xl sm:text-2xl mb-4 text-[#d4af37]/90 font-semibold">
              Preparación para el Ingreso en Guardia Civil
            </p>
            <p className="text-base sm:text-lg mb-12 text-gray-300 max-w-2xl mx-auto">
              La plataforma de entrenamiento más completa para superar las pruebas de acceso a la Guardia Civil. 
              Tests realistas, seguimiento de progreso y correcciones instantáneas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate(user ? '/dashboard' : '/login')} 
                className="btn-military text-lg px-8 py-6"
                data-testid="get-started-btn"
              >
                <Target className="w-5 h-5 mr-2" />
                {user ? 'Ir al Dashboard' : 'Comenzar Ahora'}
              </Button>
              <Button 
                onClick={() => navigate('/tests')} 
                className="bg-transparent hover:bg-[#2d5016]/30 text-[#d4af37] border-2 border-[#2d5016] text-lg px-8 py-6"
                data-testid="view-tests-btn"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Ver Tests
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-black to-[#0a0a0a]" data-testid="features-section">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black mb-4 gold-text" style={{fontFamily: 'Exo 2'}}>
              CARACTERÍSTICAS
            </h2>
            <p className="text-gray-400 text-lg">Herramientas profesionales para tu preparación</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card-military" data-testid="feature-tests">
              <div className="w-14 h-14 rounded-lg bg-[#2d5016]/20 flex items-center justify-center mb-4">
                <BookOpen className="w-7 h-7 text-[#d4af37]" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-[#d4af37]" style={{fontFamily: 'Exo 2'}}>Tests por Temas</h3>
              <p className="text-gray-400">
                Practica por temas específicos con tests de 50 y 100 preguntas. Domina cada área del temario.
              </p>
            </div>
            <div className="card-military" data-testid="feature-simulacros">
              <div className="w-14 h-14 rounded-lg bg-[#2d5016]/20 flex items-center justify-center mb-4">
                <Target className="w-7 h-7 text-[#d4af37]" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-[#d4af37]" style={{fontFamily: 'Exo 2'}}>Simulacros de Examen</h3>
              <p className="text-gray-400">
                Entrénate en condiciones reales con simulacros que mezclan preguntas de diferentes temas.
              </p>
            </div>
            <div className="card-military" data-testid="feature-english">
              <div className="w-14 h-14 rounded-lg bg-[#2d5016]/20 flex items-center justify-center mb-4">
                <Users className="w-7 h-7 text-[#d4af37]" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-[#d4af37]" style={{fontFamily: 'Exo 2'}}>Tests de Inglés</h3>
              <p className="text-gray-400">
                Prepara la parte de inglés con tests especializados y mejora tu nivel.
              </p>
            </div>
            <div className="card-military" data-testid="feature-correction">
              <div className="w-14 h-14 rounded-lg bg-[#2d5016]/20 flex items-center justify-center mb-4">
                <Award className="w-7 h-7 text-[#d4af37]" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-[#d4af37]" style={{fontFamily: 'Exo 2'}}>Corrección Automática</h3>
              <p className="text-gray-400">
                Recibe tus resultados al instante con explicaciones detalladas de cada pregunta.
              </p>
            </div>
            <div className="card-military" data-testid="feature-progress">
              <div className="w-14 h-14 rounded-lg bg-[#2d5016]/20 flex items-center justify-center mb-4">
                <TrendingUp className="w-7 h-7 text-[#d4af37]" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-[#d4af37]" style={{fontFamily: 'Exo 2'}}>Seguimiento de Progreso</h3>
              <p className="text-gray-400">
                Visualiza tu evolución con estadísticas detalladas y gráficas de rendimiento.
              </p>
            </div>
            <div className="card-military" data-testid="feature-access">
              <div className="w-14 h-14 rounded-lg bg-[#2d5016]/20 flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-[#d4af37]" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-[#d4af37]" style={{fontFamily: 'Exo 2'}}>Acceso Multiplataforma</h3>
              <p className="text-gray-400">
                Accede desde cualquier dispositivo. Tu progreso se sincroniza automáticamente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="relative py-20 px-6 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 10, 10, 0.9), rgba(10, 10, 10, 0.9)), url('https://images.unsplash.com/photo-1704278483831-c3939b1b041b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHw0fHx0YWN0aWNhbCUyMHNvbGRpZXJ8ZW58MHx8fHwxNzYzMjg3MjA3fDA&ixlib=rb-4.1.0&q=85')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
        data-testid="cta-section"
      >
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl font-black mb-6 gold-text" style={{fontFamily: 'Exo 2'}}>
            ¿LISTO PARA COMENZAR?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Únete a AlphaTest y comienza tu preparación para la Guardia Civil hoy mismo.
          </p>
          <Button 
            onClick={() => navigate('/login')} 
            className="btn-military text-xl px-12 py-7"
            data-testid="cta-register-btn"
          >
            Registrarse Ahora
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-[#2d5016] py-8 px-6">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Shield className="w-6 h-6 text-[#d4af37]" />
            <span className="text-xl font-black text-[#d4af37]" style={{fontFamily: 'Exo 2'}}>ALPHATEST</span>
          </div>
          <p className="text-gray-500 text-sm">
            &copy; 2025 AlphaTest. Plataforma de preparación para Guardia Civil.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;