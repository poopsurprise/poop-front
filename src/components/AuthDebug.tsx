// =============================================================================
// AuthDebug — Componente de teste mínimo para o hook useAuth()
// =============================================================================
// Mostra o estado do auth e permite testar sign in / sign up / sign out.
// Este componente é APENAS para debug — será removido na produção.
//
// Uso: <AuthDebug />

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export function AuthDebug() {
  const { user, loading, isAuthenticated, signUp, signIn, signOut, signInWithGoogle } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState<string>('');

  if (loading) {
    return <div style={styles.container}>⏳ A carregar auth...</div>;
  }

  const handleSignUp = async () => {
    setResult('A registar...');
    const res = await signUp(email, password);
    setResult(res.success ? '✅ Registo OK — verifica email' : `❌ ${res.error}`);
  };

  const handleSignIn = async () => {
    setResult('A entrar...');
    const res = await signIn(email, password);
    setResult(res.success ? '✅ Login OK' : `❌ ${res.error}`);
  };

  const handleSignOut = async () => {
    setResult('A sair...');
    const res = await signOut();
    setResult(res.success ? '✅ Logout OK' : `❌ ${res.error}`);
  };

  const handleGoogle = async () => {
    setResult('A redirecionar para Google...');
    const res = await signInWithGoogle();
    setResult(res.success ? '✅ Redirect iniciado' : `❌ ${res.error}`);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🔐 Auth Debug</h2>

      {/* Estado actual */}
      <div style={styles.statusBox}>
        <p>
          <strong>Estado:</strong>{' '}
          {isAuthenticated ? (
            <span style={styles.ok}>✅ Autenticado</span>
          ) : (
            <span style={styles.notOk}>❌ Não autenticado</span>
          )}
        </p>
        {user && (
          <>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>ID:</strong> <code>{user.id}</code></p>
            <p><strong>Provider:</strong> {user.app_metadata?.provider ?? 'email'}</p>
          </>
        )}
      </div>

      {/* Formulário */}
      {!isAuthenticated && (
        <div style={styles.form}>
          <input
            type="email"
            placeholder="email@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <div style={styles.buttons}>
            <button onClick={handleSignUp} style={styles.btn}>
              📝 Sign Up
            </button>
            <button onClick={handleSignIn} style={styles.btn}>
              🔑 Sign In
            </button>
            <button onClick={handleGoogle} style={styles.btnGoogle}>
              🟢 Google
            </button>
          </div>
        </div>
      )}

      {isAuthenticated && (
        <button onClick={handleSignOut} style={styles.btnLogout}>
          🚪 Sign Out
        </button>
      )}

      {/* Resultado */}
      {result && <p style={styles.result}>{result}</p>}
    </div>
  );
}

// Inline styles para evitar dependência de CSS
const styles: Record<string, React.CSSProperties> = {
  container: {
    fontFamily: 'monospace',
    maxWidth: 400,
    margin: '2rem auto',
    padding: '1.5rem',
    border: '2px solid #333',
    borderRadius: 12,
    background: '#1a1a2e',
    color: '#eee',
  },
  title: {
    margin: '0 0 1rem',
    textAlign: 'center',
  },
  statusBox: {
    background: '#16213e',
    padding: '0.75rem',
    borderRadius: 8,
    marginBottom: '1rem',
    fontSize: 14,
  },
  ok: { color: '#00e676' },
  notOk: { color: '#ff5252' },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  input: {
    padding: '0.5rem',
    borderRadius: 6,
    border: '1px solid #555',
    background: '#0f0f1a',
    color: '#eee',
    fontSize: 14,
  },
  buttons: {
    display: 'flex',
    gap: 8,
    marginTop: 4,
  },
  btn: {
    flex: 1,
    padding: '0.5rem',
    borderRadius: 6,
    border: 'none',
    cursor: 'pointer',
    background: '#7c4dff',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  btnGoogle: {
    flex: 1,
    padding: '0.5rem',
    borderRadius: 6,
    border: 'none',
    cursor: 'pointer',
    background: '#1b5e20',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  btnLogout: {
    width: '100%',
    padding: '0.5rem',
    borderRadius: 6,
    border: 'none',
    cursor: 'pointer',
    background: '#c62828',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  result: {
    marginTop: '1rem',
    padding: '0.5rem',
    background: '#0f0f1a',
    borderRadius: 6,
    fontSize: 13,
    textAlign: 'center',
  },
};
