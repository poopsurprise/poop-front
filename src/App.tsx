// =============================================================================
// App.tsx — React Router + Route Structure
// =============================================================================
// Rotas da PWA com guards de auth. O layout segue:
//   - Guest: /login, /register (não autenticado)
//   - Onboarding: /complete-profile (autenticado mas sem perfil)
//   - Game: /inventory (autenticado + perfil completo)

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { trpc } from '@/lib/trpc';

// Pages
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { CompleteProfilePage } from '@/pages/CompleteProfilePage';
import { InventoryPage } from '@/pages/InventoryPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { DeliveryPage } from '@/pages/DeliveryPage';
import { ShopPage } from '@/pages/ShopPage';
import { NotificationsPage } from '@/pages/NotificationsPage';
import { DiamondsPage } from '@/pages/DiamondsPage';
import { FriendsPage } from '@/pages/FriendsPage';
import { MedicinePage } from '@/pages/MedicinePage';
import { AffiliatesPage } from '@/pages/AffiliatesPage';
import { CatalogPage } from '@/pages/CatalogPage';
import { ChestSelectionPage } from '@/pages/ChestSelectionPage';
import { ChestPage } from '@/pages/ChestPage';
import { ChangePasswordPage } from '@/pages/ChangePasswordPage';
import { ChangeEmailPage } from '@/pages/ChangeEmailPage';
import { ManageFriendPage } from '@/pages/ManageFriendPage';
import { GameParkingPage } from '@/pages/GameParkingPage';
import { CreateGamePage } from '@/pages/CreateGamePage';
import { BuryPoopPage } from '@/pages/BuryPoopPage';
import { MedicineQuizPage } from '@/pages/MedicineQuizPage';
import { CoinRewardPage } from '@/pages/CoinRewardPage';
import { GameArenaPage } from '@/pages/GameArenaPage';
import { GameResultPage } from '@/pages/GameResultPage';
import { GameBombaPage } from '@/pages/GameBombaPage';
import { GameBombaResultPage } from '@/pages/GameBombaResultPage';
import { GameMatchmakingPage } from '@/pages/GameMatchmakingPage';
import { CollectionBookPage } from '@/pages/CollectionBookPage';
import { NotificationSettingsPage } from '@/pages/NotificationSettingsPage';
import { PoopDeadPage, PoopResurrectedPage } from '@/pages/PoopStatusPages';

// ---------------------------------------------------------------------------
// Loading Screen (reutilizável)
// ---------------------------------------------------------------------------

function LoadingScreen() {
  return (
    <div className="screen-fixed app-container flex items-center justify-center">
      <div className="text-primary text-xl animate-pulse">💩 A carregar...</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Route Guards
// ---------------------------------------------------------------------------

/**
 * GuestGuard — Redireciona para /inventory se já autenticado.
 * Usado em /login e /register.
 */
function GuestGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <LoadingScreen />;
  if (isAuthenticated) return <Navigate to="/inventory" replace />;

  return <>{children}</>;
}

/**
 * AuthGuard — Redireciona para /login se não autenticado.
 * Usado em rotas protegidas.
 */
function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <LoadingScreen />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <>{children}</>;
}

/**
 * ProfileGuard — Verifica se o user tem perfil completo no backend.
 * Se auth.whoami retorna user === null → redireciona para /complete-profile.
 * Usado nas rotas de jogo (ex: /inventory).
 */
function ProfileGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const whoami = trpc.auth.whoami.useQuery(undefined, {
    enabled: isAuthenticated,
    staleTime: 30_000, // Cache 30s — evita re-fetch constante
    retry: 1,
  });

  if (authLoading) return <LoadingScreen />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // Enquanto o whoami carrega, mostra loading
  if (whoami.isLoading) return <LoadingScreen />;

  // Se falhou, deixa passar (fallback — não bloquear o user)
  if (whoami.isError) return <>{children}</>;

  // Se user é null no backend → perfil incompleto → onboarding
  if (whoami.data && whoami.data.user === null) {
    return <Navigate to="/complete-profile" replace />;
  }

  return <>{children}</>;
}

/**
 * OnboardingGuard — Para /complete-profile.
 * Exige auth mas permite user sem perfil.
 * Se já tem perfil → redireciona para /inventory.
 */
function OnboardingGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const whoami = trpc.auth.whoami.useQuery(undefined, {
    enabled: isAuthenticated,
    staleTime: 30_000,
    retry: 1,
  });

  if (authLoading) return <LoadingScreen />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (whoami.isLoading) return <LoadingScreen />;

  // Se já tem perfil completo → vai directo para inventory
  if (whoami.data?.user !== null && whoami.data?.user !== undefined) {
    return <Navigate to="/inventory" replace />;
  }

  return <>{children}</>;
}

// ---------------------------------------------------------------------------
// App Router
// ---------------------------------------------------------------------------

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth routes — redirect se já autenticado */}
        <Route
          path="/login"
          element={
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          }
        />
        <Route
          path="/register"
          element={
            <GuestGuard>
              <RegisterPage />
            </GuestGuard>
          }
        />

        {/* Complete Profile — requer auth, permite user sem perfil */}
        <Route
          path="/complete-profile"
          element={
            <OnboardingGuard>
              <CompleteProfilePage />
            </OnboardingGuard>
          }
        />

        {/* Game routes — requer auth + perfil completo */}
        <Route
          path="/inventory"
          element={
            <ProfileGuard>
              <InventoryPage />
            </ProfileGuard>
          }
        />
        <Route
          path="/profile"
          element={
            <ProfileGuard>
              <ProfilePage />
            </ProfileGuard>
          }
        />
        <Route
          path="/delivery"
          element={
            <ProfileGuard>
              <DeliveryPage />
            </ProfileGuard>
          }
        />
        <Route
          path="/shop"
          element={
            <ProfileGuard>
              <ShopPage />
            </ProfileGuard>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProfileGuard>
              <NotificationsPage />
            </ProfileGuard>
          }
        />
        <Route
          path="/diamonds"
          element={
            <ProfileGuard>
              <DiamondsPage />
            </ProfileGuard>
          }
        />
        <Route
          path="/friends"
          element={
            <ProfileGuard>
              <FriendsPage />
            </ProfileGuard>
          }
        />
        <Route
          path="/medicine"
          element={
            <ProfileGuard>
              <MedicinePage />
            </ProfileGuard>
          }
        />
        <Route
          path="/affiliates"
          element={
            <ProfileGuard>
              <AffiliatesPage />
            </ProfileGuard>
          }
        />
        <Route
          path="/catalog"
          element={
            <ProfileGuard>
              <CatalogPage />
            </ProfileGuard>
          }
        />
        <Route
          path="/chest"
          element={
            <ProfileGuard>
              <ChestSelectionPage />
            </ProfileGuard>
          }
        />
        <Route
          path="/chest/basket"
          element={
            <ProfileGuard>
              <ChestPage />
            </ProfileGuard>
          }
        />
        <Route path="/change-password" element={<ProfileGuard><ChangePasswordPage /></ProfileGuard>} />
        <Route path="/change-email" element={<ProfileGuard><ChangeEmailPage /></ProfileGuard>} />
        <Route path="/manage-friend" element={<ProfileGuard><ManageFriendPage /></ProfileGuard>} />
        <Route path="/game/parking" element={<ProfileGuard><GameParkingPage /></ProfileGuard>} />
        <Route path="/game/create" element={<ProfileGuard><CreateGamePage /></ProfileGuard>} />
        <Route path="/game/arena" element={<ProfileGuard><GameArenaPage /></ProfileGuard>} />
        <Route path="/game/bury" element={<ProfileGuard><BuryPoopPage /></ProfileGuard>} />
        <Route path="/medicine/quiz" element={<ProfileGuard><MedicineQuizPage /></ProfileGuard>} />
        <Route path="/rewards" element={<ProfileGuard><CoinRewardPage /></ProfileGuard>} />
        <Route path="/game/result" element={<ProfileGuard><GameResultPage /></ProfileGuard>} />
        <Route path="/game/bomba" element={<ProfileGuard><GameBombaPage /></ProfileGuard>} />
        <Route path="/game/bomba/result" element={<ProfileGuard><GameBombaResultPage /></ProfileGuard>} />
        <Route path="/game/matchmaking" element={<ProfileGuard><GameMatchmakingPage /></ProfileGuard>} />
        <Route path="/collection" element={<ProfileGuard><CollectionBookPage /></ProfileGuard>} />
        <Route path="/notification-settings" element={<ProfileGuard><NotificationSettingsPage /></ProfileGuard>} />
        <Route path="/poop/dead" element={<ProfileGuard><PoopDeadPage /></ProfileGuard>} />
        <Route path="/poop/resurrected" element={<ProfileGuard><PoopResurrectedPage /></ProfileGuard>} />
      </Routes>
    </BrowserRouter>
  );
}
