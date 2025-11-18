import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext, API } from '../App';
import { Button } from '@/components/ui/button';
import { Shield, BookOpen, Target, TrendingUp, Award, LogOut, Settings } from 'lucide-react';
import { toast } from 'sonner';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAttempts: 0,
    averageScore: 0,
    bestScore: 0,
    recentAttempts: []
  });

  useEffect(() => {
    fetchAttempts();
  }, []);

  const fetchAttempts = async () => {
    try {
      const response = await axios.get(`${API}/user/attempts`);
      setAttempts(response.data);
      calculateStats(response.data);
    } catch (error) {
      toast.error('Error al cargar intentos');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (attemptsData) => {
    const totalAttempts = attemptsData.length;
    const averageScore = totalAttempts > 0 
      ? attemptsData.reduce((sum, a) => sum + a.percentage, 0) / totalAttempts 
      : 0;
    const bestScore = totalAttempts > 0 
      ? Math.max(...attemptsData.map(a => a.percentage)) 
      : 0;
    const recentAttempts = attemptsData.slice(0, 5);

    setStats({ totalAttempts, averageScore, bestScore, recentAttempts });
  };

  return (
    <div className="min-h-screen military-bg" data-testid="dashboard-page">
      {/* Navigation */}
      <nav className="glass-effect border-b border-[#2d5016] sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-[#d4af37]" />
              <span className="text-2xl font-black text-[#d4af37]" style={{fontFamily: 'Exo 2'}}>
                ALPHATEST
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => navigate('/tests')}
                className="bg-transparent hover:bg-[#2d5016]/30 text-[#d4af37] border border-[#2d5016]"
                data-testid="view-tests-nav-btn"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Tests
              </Button>
              {user?.is_admin && (
                <Button
                  onClick={() => navigate('/admin')}
                  className="bg-[#d4af37] hover:bg-[#d4af37]/80 text-black"
                  data-testid="admin-panel-btn"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Admin
                </Button>
              )}
              <Button
                onClick={logout}
                className="bg-[#2d5016] hover:bg-[#3d6020] text-[#d4af37]"
                data-testid="logout-dashboard-btn"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Salir
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-12" data-testid="welcome-section">
          <h1 className="text-4xl sm:text-5xl font-black mb-4 gold-text" style={{fontFamily: 'Exo 2'}}>
            BIENVENIDO, SOLDADO
          </h1>
          <p className="text-gray-400 text-lg">Email: {user?.email}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12" data-testid="stats-grid">
          <div className="card-military">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-[#2d5016]/20 flex items-center justify-center">
                <Target className="w-6 h-6 text-[#d4af37]" />
              </div>
              <span className="text-3xl font-black text-[#d4af37]" style={{fontFamily: 'Exo 2'}}>
                {stats.totalAttempts}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mb-1">Tests Realizados</h3>
            <p className="text-gray-400 text-sm">Total de intentos completados</p>
          </div>

          <div className="card-military">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-[#2d5016]/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-[#d4af37]" />
              </div>
              <span className="text-3xl font-black text-[#d4af37]" style={{fontFamily: 'Exo 2'}}>
                {stats.averageScore.toFixed(1)}%
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mb-1">Promedio</h3>
            <p className="text-gray-400 text-sm">Puntuación media global</p>
          </div>

          <div className="card-military">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-[#2d5016]/20 flex items-center justify-center">
                <Award className="w-6 h-6 text-[#d4af37]" />
              </div>
              <span className="text-3xl font-black text-[#d4af37]" style={{fontFamily: 'Exo 2'}}>
                {stats.bestScore.toFixed(1)}%
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mb-1">Mejor Puntuación</h3>
            <p className="text-gray-400 text-sm">Tu récord personal</p>
          </div>
        </div>

        {/* Recent Attempts */}
        <div className="glass-effect rounded-xl p-8 tactical-border" data-testid="recent-attempts">
          <h2 className="text-3xl font-black mb-6 gold-text" style={{fontFamily: 'Exo 2'}}>
            Últimos Intentos
          </h2>
          {loading ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-[#2d5016] border-t-[#d4af37] rounded-full animate-spin mx-auto"></div>
            </div>
          ) : stats.recentAttempts.length > 0 ? (
            <div className="space-y-4">
              {stats.recentAttempts.map((attempt) => (
                <div 
                  key={attempt.id} 
                  className="bg-black/30 border border-[#2d5016] rounded-lg p-4 hover:border-[#d4af37] transition-colors"
                  data-testid={`attempt-${attempt.id}`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-white font-semibold mb-1">Test ID: {attempt.test_id.substring(0, 8)}...</p>
                      <p className="text-gray-400 text-sm">
                        {new Date(attempt.completed_at).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-[#d4af37]" style={{fontFamily: 'Exo 2'}}>
                        {attempt.percentage.toFixed(1)}%
                      </p>
                      <p className="text-gray-400 text-sm">
                        {attempt.score}/{attempt.total_questions}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12" data-testid="no-attempts">
              <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">Aún no has realizado ningún test</p>
              <Button
                onClick={() => navigate('/tests')}
                className="btn-military"
                data-testid="start-first-test-btn"
              >
                Comenzar Primer Test
              </Button>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 grid md:grid-cols-2 gap-6" data-testid="quick-actions">
          <div 
            className="card-military cursor-pointer"
            onClick={() => navigate('/tests')}
            data-testid="browse-tests-card"
          >
            <BookOpen className="w-12 h-12 text-[#d4af37] mb-4" />
            <h3 className="text-2xl font-bold text-[#d4af37] mb-2" style={{fontFamily: 'Exo 2'}}>
              Explorar Tests
            </h3>
            <p className="text-gray-400">
              Navega por todos los tests disponibles organizados por categorías
            </p>
          </div>

          <div 
            className="card-military cursor-pointer"
            onClick={() => navigate('/tests')}
            data-testid="continue-training-card"
          >
            <Target className="w-12 h-12 text-[#d4af37] mb-4" />
            <h3 className="text-2xl font-bold text-[#d4af37] mb-2" style={{fontFamily: 'Exo 2'}}>
              Continuar Entrenamiento
            </h3>
            <p className="text-gray-400">
              Sigue mejorando tus habilidades con nuevos desafíos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;